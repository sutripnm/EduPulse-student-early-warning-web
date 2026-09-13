import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getStudentDashboard } from "../services/api";
import "../styles/dashboard-siswa-page.css";

const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const MAPEL_OPTIONS = [
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
};

function lastValue(list, key) {
  if (!list || list.length === 0) return "-";
  return list[list.length - 1][key] ?? "-";
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

        console.log("Dashboard Siswa API:", result);

        setDashboard(result.data || result);
        setIsDummy(false);
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
  }, [studentNisn, selectedMapel]);


  const statusRisk = dashboard?.status_risk;
  const rekomendasi = dashboard?.rekomendasi || [];
  const absensiHarian = dashboard?.absensi_harian || [];


  return (
    <main className="dashboard-siswa-page d-flex">

      <Sidebar />

      <section className="dashboard-siswa-main flex-grow-1 p-4">

        <header className="d-flex justify-content-between align-items-center mb-3">
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
        </header>


        <section className="dashboard-siswa-box d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

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

          </div>

          <div className="d-flex align-items-center gap-2">
            <label htmlFor="filterMapel" className="mb-0 small fw-semibold">
              Filter Mapel
            </label>

            <select
              id="filterMapel"
              className="form-select"
              value={selectedMapel}
              onChange={(event) => setSelectedMapel(event.target.value)}
            >
              {MAPEL_OPTIONS.map((mapel) => (
                <option key={mapel.id} value={mapel.id}>
                  {mapel.nama}
                </option>
              ))}
            </select>
          </div>

        </section>


        {loading && <p>Memuat ringkasan...</p>}

        {!loading && (
          <>
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


            <h6 className="fw-semibold mb-2">
              🚦 Label Risiko & Rekomendasi
            </h6>

            <section className="dashboard-siswa-box risk-recommendation-box">
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

          </>
        )}

      </section>

    </main>
  );
}

export default DashboardSiswaPage;