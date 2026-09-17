import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getStudentDashboard } from "../services/api";
import "../styles/dashboard-siswa-page.css";

const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

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
  absensi_harian: [
    { hari: "Senin", status: "Hadir" },
    { hari: "Selasa", status: "Hadir" },
    { hari: "Rabu", status: "Izin" },
    { hari: "Kamis", status: "Hadir" },
    { hari: "Jumat", status: "Alpha" },
  ],
  study_time: [{ label: "Minggu Ini", jam: 7 }],
  tugas_pretest: [{ label: "Minggu Ini", nilai: 78 }],
  assessment: [{ label: "Minggu Ini", nilai: 82 }],
  tugas_posttest: [{ label: "Minggu Ini", nilai: 85 }],
  status_risk: "MEDIUM",
  rekomendasi: [
    "Tingkatkan waktu belajar mandiri terutama sebelum assessment.",
    "Perhatikan kehadiran, terutama di akhir minggu.",
  ],
  filter_opsi_mapel: [],
};

function lastValue(list, key) {
  if (!list || list.length === 0) return "-";
  return list[list.length - 1][key] ?? "-";
}

/**
 * API asli mengembalikan struktur:
 * {
 *   success, message,
 *   data: {
 *     profil: { nisn, nama_siswa, kelas },
 *     mapel_aktif: { id, nama_mapel },
 *     filter_opsi_mapel: [{ id, nama_mapel }],
 *     ringkasan_mingguan: {
 *       minggu_ke, study_time_jam,
 *       presensi_harian: [{ hari, status }],
 *       nilai: { tugas_1_pretest, tugas_2_posttest, assessment }
 *     },
 *     analisis_ews: { status_risiko, label_risiko_display, rekomendasi }
 *   }
 * }
 *
 * Fungsi ini "menerjemahkan" bentuk di atas ke struktur yang dipakai
 * komponen (profil.nama, absensi_harian, study_time, tugas_pretest,
 * assessment, tugas_posttest, status_risk, rekomendasi), supaya JSX di
 * bawah tidak perlu diubah walau nama field API berbeda.
 */
function normalizeDashboard(rawResult) {
  const d = rawResult?.data || rawResult;
  const mingguan = d?.ringkasan_mingguan || {};
  const nilai = mingguan?.nilai || {};
  const ews = d?.analisis_ews || {};
  const mingguLabel = `Minggu ${mingguan?.minggu_ke ?? "Ini"}`;

  return {
    profil: {
      nisn: d?.profil?.nisn,
      nama: d?.profil?.nama_siswa,
      kelas: d?.profil?.kelas,
    },
    mapel_aktif: d?.mapel_aktif || null,
    filter_opsi_mapel: d?.filter_opsi_mapel || [],
    absensi_harian: mingguan?.presensi_harian || [],
    study_time: [{ label: mingguLabel, jam: mingguan?.study_time_jam ?? "-" }],
    tugas_pretest: [{ label: mingguLabel, nilai: nilai?.tugas_1_pretest ?? "-" }],
    assessment: [{ label: mingguLabel, nilai: nilai?.assessment ?? "-" }],
    tugas_posttest: [{ label: mingguLabel, nilai: nilai?.tugas_2_posttest ?? "-" }],
    status_risk: ews?.status_risiko,
    rekomendasi: ews?.rekomendasi || [],
  };
}


function DashboardSiswaPage() {
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
        const result = await getStudentDashboard(
          studentNisn,
          selectedMapel
        );

        console.log("Dashboard Siswa API (raw):", result);

        const normalized = normalizeDashboard(result);
        setDashboard(normalized);
        setIsDummy(false);

        // Set filter mapel default ke mapel_aktif dari API,
        // hanya kalau user belum pilih apa-apa sendiri
        if (!selectedMapel && normalized.mapel_aktif?.id) {
          setSelectedMapel(String(normalized.mapel_aktif.id));
        }
      } catch (error) {
        console.error("Gagal mengambil dashboard siswa, pakai data contoh:", error);

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
  const absensiHarian = dashboard?.absensi_harian || [];

  const mapelOptions =
    dashboard?.filter_opsi_mapel?.length > 0
      ? dashboard.filter_opsi_mapel.map((mapel) => ({
          id: mapel.id,
          nama: mapel.nama_mapel,
        }))
      : DEFAULT_MAPEL_OPTIONS;


  return (
    <main className="dashboard-siswa-page d-flex">

      <Sidebar />

      <section className="dashboard-siswa-main flex-grow-1 p-4">

        {/* Header: judul + badge data contoh, lalu filter mapel di bawahnya (tidak digabung dengan profil siswa) */}
        <header className="mb-3">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h1 className="h4 fw-bold mb-1">
                Dashboard Siswa
              </h1>

              <p className="text-secondary mb-0">
                Ringkasan performa belajar minggu lalu
              </p>
            </div>

            {isDummy && (
              <span className="badge bg-secondary">
                Data contoh — API belum tersambung
              </span>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 mt-3">
            <label htmlFor="filterMapel" className="mb-0 small fw-semibold">
              Filter Mapel
            </label>

            <select
              id="filterMapel"
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
        </header>


        {/* Baris profil siswa: NISN / Nama / Kelas / Label Risiko, satu gaya chip yang sama */}
        <section className="dashboard-siswa-box d-flex align-items-center flex-wrap gap-3 mb-4">

          <div className="d-flex gap-2 flex-wrap">

            <div className="siswa-profile-chip">
              <small>NISN</small>
              <strong>{dashboard?.profil?.nisn || studentNisn || "-"}</strong>
            </div>

            <div className="siswa-profile-chip">
              <small>Nama</small>
              <strong>{dashboard?.profil?.nama || "-"}</strong>
            </div>

            <div className="siswa-profile-chip">
              <small>Kelas</small>
              <strong>{dashboard?.profil?.kelas || "-"}</strong>
            </div>

            {!loading && (
              <div className="siswa-profile-chip">
                <small>Label Risiko</small>
                <strong>{riskLabel[statusRisk] || "-"}</strong>
              </div>
            )}

          </div>

        </section>


        {loading && <p>Memuat ringkasan...</p>}

        {!loading && (
          <>
            {/* Pembacaan grafik/statistik ditampilkan dulu */}
            <h6 className="fw-semibold mb-3">
              📅 Ringkasan Minggu Lalu
            </h6>

            <section className="row g-3 mb-4">

              <div className="col-md-4">
                <div className="dashboard-siswa-box h-100">
                  <p className="small text-secondary mb-2">
                    Absen (Senin - Jumat)
                  </p>

                  <div className="d-flex gap-2 flex-wrap">
                    {HARI_LIST.map((hari) => {
                      const data = absensiHarian.find(
                        (item) => item.hari === hari
                      );
                      const status = data?.status || "-";

                      return (
                        <div
                          key={hari}
                          className={`absensi-chip absensi-${status.toLowerCase()}`}
                        >
                          <small>{hari.slice(0, 3)}</small>
                          <strong>{status}</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="dashboard-siswa-box h-100 text-center">
                  <p className="small text-secondary mb-1">Study Time</p>
                  <h3 className="fw-bold mb-0">
                    {lastValue(dashboard?.study_time, "jam")}
                    <span className="fs-6 fw-normal"> jam</span>
                  </h3>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="dashboard-siswa-box h-100 text-center">
                  <p className="small text-secondary mb-1">
                    Nilai Tugas 1 (Pretest)
                  </p>
                  <h3 className="fw-bold mb-0">
                    {lastValue(dashboard?.tugas_pretest, "nilai")}
                  </h3>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="dashboard-siswa-box h-100 text-center">
                  <p className="small text-secondary mb-1">Nilai Assessment</p>
                  <h3 className="fw-bold mb-0">
                    {lastValue(dashboard?.assessment, "nilai")}
                  </h3>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="dashboard-siswa-box h-100 text-center">
                  <p className="small text-secondary mb-1">
                    Nilai Tugas 2 (Posttest)
                  </p>
                  <h3 className="fw-bold mb-0">
                    {lastValue(dashboard?.tugas_posttest, "nilai")}
                  </h3>
                </div>
              </div>

            </section>


            {/* Rekomendasi ditampilkan setelah pembacaan grafik, label risiko sudah ada di baris profil */}
            <h6 className="fw-semibold mb-2">
              📋 Rekomendasi
            </h6>

            <section className="dashboard-siswa-box risk-recommendation-box mb-4">
              {rekomendasi.length > 0 ? (
                <ul className="mb-0">
                  {rekomendasi.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mb-0">
                  Belum ada rekomendasi untuk minggu ini.
                </p>
              )}
            </section>

          </>
        )}

      </section>

    </main>
  );
}

export default DashboardSiswaPage;