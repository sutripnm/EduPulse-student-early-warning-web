import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getParentDashboard } from "../services/api";
import "../styles/dashboard-ortu-page.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_MAPEL_OPTIONS = [
  { id: "", nama: "Semua Mapel" },
  { id: "matematika", nama: "Matematika" },
  { id: "b-indonesia", nama: "Bahasa Indonesia" },
  { id: "b-inggris", nama: "Bahasa Inggris" },
];

const riskLabel = {
  HIGH: "Tinggi",
  MEDIUM: "Sedang",
  LOW: "Rendah",
};

// Data contoh, dipakai sementara kalau API belum bisa diakses,
// biar tampilan tetap kelihatan lengkap
const DUMMY_DASHBOARD = {
  profil: { nisn: "0051234567", nama: "Nadya Putri Ramadhani", kelas: "XI IPA 1" },
  absensi: [
    { label: "Minggu 1", persen: 100 },
    { label: "Minggu 2", persen: 90 },
    { label: "Minggu 3", persen: 80 },
    { label: "Minggu 4", persen: 88 },
  ],
  study_time: [
    { label: "Minggu 1", jam: 8 },
    { label: "Minggu 2", jam: 6.5 },
    { label: "Minggu 3", jam: 9 },
    { label: "Minggu 4", jam: 7 },
  ],
  tugas_pretest: [
    { label: "Minggu 1", nilai: 70 },
    { label: "Minggu 2", nilai: 74 },
    { label: "Minggu 3", nilai: 76 },
    { label: "Minggu 4", nilai: 78 },
  ],
  assessment: [
    { label: "Minggu 1", nilai: 75 },
    { label: "Minggu 2", nilai: 78 },
    { label: "Minggu 3", nilai: 80 },
    { label: "Minggu 4", nilai: 82 },
  ],
  tugas_posttest: [
    { label: "Minggu 1", nilai: 80 },
    { label: "Minggu 2", nilai: 82 },
    { label: "Minggu 3", nilai: 84 },
    { label: "Minggu 4", nilai: 85 },
  ],
  komparasi: {
    kehadiran: { sekarang: 88, bulan_lalu: 82 },
    study_time: { sekarang: 7.6, bulan_lalu: 6 },
    pretest: { sekarang: 74.5, bulan_lalu: 72 },
    assessment: { sekarang: 78.8, bulan_lalu: 76 },
    posttest: { sekarang: 82.8, bulan_lalu: 79 },
  },
  status_risk: "MEDIUM",
  rekomendasi: [
    "Tingkatkan waktu belajar mandiri anak, terutama sebelum assessment.",
    "Dampingi anak agar kehadiran tetap konsisten di akhir minggu.",
  ],
  filter_opsi_mapel: [],
};

/**
 * Backend saat ini (bug sementara) mengirim rekomendasi_orangtua
 * sebagai STRING yang bentuknya mirip dict Python, contoh:
 * "{'guru': '...', 'siswa': '...', 'orangtua': 'Apresiasi pencapaian belajar anak.'}"
 * bukan object JSON asli. Fungsi ini coba "menarik" nilai key 'orangtua'
 * dari string itu pakai regex. Kalau formatnya berubah / sudah diperbaiki
 * backend jadi object asli, fungsi ini otomatis fallback aman.
 */
function extractOrangtuaText(item) {
  if (item && typeof item === "object" && item.orangtua) {
    return item.orangtua;
  }

  if (typeof item !== "string") return String(item ?? "");

  const match = item.match(/'orangtua':\s*'([^']*)'/);
  if (match) return match[1];

  return item; // fallback: tampilkan string aslinya kalau gagal di-parse
}

/**
 * API asli mengembalikan struktur:
 * {
 *   data: {
 *     profil: { nisn, nama_siswa, kelas },
 *     mapel_aktif, filter_opsi_mapel,
 *     grafik_mingguan: [
 *       { minggu_ke, label, presensi_persen, study_time_jam,
 *         nilai: { pretest, assessment, posttest } }
 *     ],
 *     komparasi_bulanan: {
 *       kehadiran: { sekarang, bulan_lalu, selisih, tren },
 *       study_time: {...}, pretest: {...}, assessment: {...}, posttest: {...}
 *     },
 *     analisis_ews: { status_risiko, label_risiko_display, rekomendasi_orangtua }
 *   }
 * }
 *
 * Fungsi ini menerjemahkan ke struktur yang dipakai komponen di bawah.
 */
function normalizeParentDashboard(rawResult) {
  const d = rawResult?.data || rawResult;
  const grafik = d?.grafik_mingguan || [];
  const komparasi = d?.komparasi_bulanan || {};
  const ews = d?.analisis_ews || {};

  return {
    profil: {
      nisn: d?.profil?.nisn,
      nama: d?.profil?.nama_siswa,
      kelas: d?.profil?.kelas,
    },
    mapel_aktif: d?.mapel_aktif || null,
    filter_opsi_mapel: d?.filter_opsi_mapel || [],
    absensi: grafik.map((m) => ({ label: m.label, persen: m.presensi_persen })),
    study_time: grafik.map((m) => ({ label: m.label, jam: m.study_time_jam })),
    tugas_pretest: grafik.map((m) => ({ label: m.label, nilai: m.nilai?.pretest })),
    assessment: grafik.map((m) => ({ label: m.label, nilai: m.nilai?.assessment })),
    tugas_posttest: grafik.map((m) => ({ label: m.label, nilai: m.nilai?.posttest })),
    komparasi: {
      kehadiran: komparasi?.kehadiran || {},
      study_time: komparasi?.study_time || {},
      pretest: komparasi?.pretest || {},
      assessment: komparasi?.assessment || {},
      posttest: komparasi?.posttest || {},
    },
    status_risk: ews?.status_risiko,
    rekomendasi: (ews?.rekomendasi_orangtua || []).map(extractOrangtuaText),
  };
}

function ComparisonCard({ title, unit, sekarang, bulanLalu, selisih }) {
  const hasData = sekarang !== null && sekarang !== undefined &&
    bulanLalu !== null && bulanLalu !== undefined;

  const diff = hasData
    ? (selisih ?? Math.round((sekarang - bulanLalu) * 10) / 10)
    : null;

  let trendClass = "text-secondary";
  let trendSign = "";

  if (diff > 0) {
    trendClass = "text-success";
    trendSign = "▲ +";
  } else if (diff < 0) {
    trendClass = "text-danger";
    trendSign = "▼ ";
  } else if (diff === 0) {
    trendSign = "▬ ";
  }

  return (
    <div className="col-md-4 col-6">
      <div className="dashboard-ortu-box h-100 text-center">
        <p className="small text-secondary mb-1">{title}</p>

        <h4 className="fw-bold mb-1">
          {sekarang ?? "-"}
          {unit && <span className="fs-6 fw-normal"> {unit}</span>}
        </h4>

        <p className="small text-secondary mb-0">
          Bulan lalu: {hasData ? `${bulanLalu}${unit ? ` ${unit}` : ""}` : "-"}
        </p>

        {hasData && (
          <p className={`small fw-semibold mb-0 ${trendClass}`}>
            {trendSign}
            {Math.abs(diff)}
            {unit ? ` ${unit}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}


function DashboardOrtuPage() {
  const { nisn } = useParams();
  const studentNisn = nisn || localStorage.getItem("nisn");

  const [selectedMapel, setSelectedMapel] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDummy, setIsDummy] = useState(false);


  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      try {
        const result = await getParentDashboard(
          studentNisn,
          selectedMapel
        );

        console.log("Dashboard Ortu API (raw):", result);

        const normalized = normalizeParentDashboard(result);
        setDashboard(normalized);
        setIsDummy(false);

        if (!selectedMapel && normalized.mapel_aktif?.id) {
          setSelectedMapel(String(normalized.mapel_aktif.id));
        }
      } catch (error) {
        console.error("Gagal mengambil dashboard ortu, pakai data contoh:", error);

        setDashboard(DUMMY_DASHBOARD);
        setIsDummy(true);
      } finally {
        setLoading(false);
      }
    };

    if (studentNisn) {
      fetchDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentNisn, selectedMapel]);


  const statusRisk = dashboard?.status_risk;
  const rekomendasi = dashboard?.rekomendasi || [];
  const komparasi = dashboard?.komparasi || {};

  const mapelOptions =
    dashboard?.filter_opsi_mapel?.length > 0
      ? dashboard.filter_opsi_mapel.map((mapel) => ({
          id: mapel.id,
          nama: mapel.nama_mapel,
        }))
      : DEFAULT_MAPEL_OPTIONS;


  return (
    <main className="dashboard-ortu-page d-flex">

      <Sidebar />

      <section className="dashboard-ortu-main flex-grow-1 p-4">

        <header className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1 className="h4 fw-bold mb-1">
              Dashboard Orang Tua
            </h1>

            <p className="text-secondary mb-0">
              Pantau perkembangan belajar anak Anda setiap minggu
            </p>
          </div>

          {isDummy && (
            <span className="badge bg-secondary">
              Data contoh — API belum tersambung
            </span>
          )}
        </header>


        <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
          <label htmlFor="filterMapelOrtu" className="mb-0 small fw-semibold">
            Filter Mapel
          </label>

          <select
            id="filterMapelOrtu"
            className="form-select"
            value={selectedMapel}
            onChange={(event) => setSelectedMapel(event.target.value)}
          >
            {mapelOptions.map((mapel) => (
              <option key={mapel.id} value={mapel.id}>
                {mapel.nama}
              </option>
            ))}
          </select>
        </div>


        <section className="dashboard-ortu-box d-flex gap-2 flex-wrap mb-4">

          <div className="ortu-profile-chip">
            <small>NISN</small>
            <strong>{dashboard?.profil?.nisn || studentNisn || "-"}</strong>
          </div>

          <div className="ortu-profile-chip">
            <small>Nama</small>
            <strong>{dashboard?.profil?.nama || "-"}</strong>
          </div>

          <div className="ortu-profile-chip">
            <small>Kelas</small>
            <strong>{dashboard?.profil?.kelas || "-"}</strong>
          </div>

          <div className="ortu-profile-chip">
            <small>Label Risiko</small>
            <strong
              className={`risk-badge-inline risk-${(statusRisk || "").toLowerCase()}`}
            >
              {riskLabel[statusRisk] || "-"}
            </strong>
          </div>

        </section>


        {loading && <p>Memuat grafik...</p>}

        {!loading && (
          <>
            <h6 className="fw-semibold mb-3">
              📊 Grafik Mingguan
            </h6>

            <section className="row g-3 mb-4">

              <div className="col-md-6">
                <div className="dashboard-ortu-box chart-box">
                  <h6 className="mb-1">Grafik Absensi</h6>
                  <p className="small text-secondary mb-2">
                    Persentase kehadiran per minggu
                  </p>

                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dashboard?.absensi || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="persen" name="Kehadiran (%)" fill="#6840d9" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-6">
                <div className="dashboard-ortu-box chart-box">
                  <h6 className="mb-1">Grafik Study Time</h6>
                  <p className="small text-secondary mb-2">Jam belajar per minggu</p>

                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dashboard?.study_time || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jam" name="Jam" fill="#22a06b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-4">
                <div className="dashboard-ortu-box chart-box">
                  <h6 className="mb-1">Grafik Tugas 1 (Pretest)</h6>

                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={dashboard?.tugas_pretest || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="nilai" name="Tugas 1" stroke="#6840d9" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-4">
                <div className="dashboard-ortu-box chart-box">
                  <h6 className="mb-1">Grafik Assessment</h6>

                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={dashboard?.assessment || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="nilai" name="Assessment" stroke="#f5b82e" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-4">
                <div className="dashboard-ortu-box chart-box">
                  <h6 className="mb-1">Grafik Tugas 2 (Posttest)</h6>

                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={dashboard?.tugas_posttest || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="nilai" name="Tugas 2" stroke="#dc3545" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </section>


            <h6 className="fw-semibold mb-2">
              🚦 Label Risiko & Rekomendasi untuk Orang Tua
            </h6>

            <section className="dashboard-ortu-box risk-recommendation-box mb-4">
              <span
                className={`badge risk-badge risk-${(statusRisk || "").toLowerCase()}`}
              >
                Risiko {riskLabel[statusRisk] || "-"}
              </span>

              {rekomendasi.length > 0 ? (
                <ul className="mt-3 mb-0">
                  {rekomendasi.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 mb-0">
                  Belum ada rekomendasi untuk minggu ini.
                </p>
              )}
            </section>


            <h6 className="fw-semibold mb-3">
              📆 Perbandingan dengan Bulan Lalu
            </h6>

            <section className="row g-3 mb-4">
              <ComparisonCard
                title="Rata-rata Kehadiran"
                unit="%"
                sekarang={komparasi.kehadiran?.sekarang}
                bulanLalu={komparasi.kehadiran?.bulan_lalu}
                selisih={komparasi.kehadiran?.selisih}
              />
              <ComparisonCard
                title="Rata-rata Study Time"
                unit="jam"
                sekarang={komparasi.study_time?.sekarang}
                bulanLalu={komparasi.study_time?.bulan_lalu}
                selisih={komparasi.study_time?.selisih}
              />
              <ComparisonCard
                title="Rata-rata Tugas 1 (Pretest)"
                unit=""
                sekarang={komparasi.pretest?.sekarang}
                bulanLalu={komparasi.pretest?.bulan_lalu}
                selisih={komparasi.pretest?.selisih}
              />
              <ComparisonCard
                title="Rata-rata Assessment"
                unit=""
                sekarang={komparasi.assessment?.sekarang}
                bulanLalu={komparasi.assessment?.bulan_lalu}
                selisih={komparasi.assessment?.selisih}
              />
              <ComparisonCard
                title="Rata-rata Tugas 2 (Posttest)"
                unit=""
                sekarang={komparasi.posttest?.sekarang}
                bulanLalu={komparasi.posttest?.bulan_lalu}
                selisih={komparasi.posttest?.selisih}
              />
            </section>

          </>
        )}

      </section>

    </main>
  );
}

export default DashboardOrtuPage;