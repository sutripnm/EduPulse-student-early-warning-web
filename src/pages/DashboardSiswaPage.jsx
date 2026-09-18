import { BsCalendarWeek, BsClipboardCheck } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard-siswa-page.css";
import useStudentDashboard from "../hooks/useStudentDashboard";
import { getRiskLabel } from "../utils/risk";
import { lastValue } from "../utils/dashboardNormalize";

const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

function DashboardSiswaPage() {
  // Semua data dashboard (profil, absensi, nilai, rekomendasi) + status
  // loading/dummy ada di sini, halaman ini tinggal menampilkan.
  const {
    studentNisn,
    selectedMapel,
    setSelectedMapel,
    dashboard,
    loading,
    isDummy,
    mapelOptions,
  } = useStudentDashboard();

  const statusRisk = dashboard?.status_risk;
  const rekomendasi = dashboard?.rekomendasi || [];
  const absensiHarian = dashboard?.absensi_harian || [];

  return (
    <main className="dashboard-siswa-page d-flex">
      <Sidebar />

      <section className="dashboard-siswa-main flex-grow-1 p-4">
        {/* Header: judul + badge data contoh, lalu filter mapel di bawahnya (tidak digabung dengan profil siswa) */}
        <header className="mb-3">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h1 className="h4 fw-bold mb-1">Dashboard Siswa</h1>

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
                <strong>{getRiskLabel(statusRisk)}</strong>
              </div>
            )}
          </div>
        </section>

        {loading && <p>Memuat ringkasan...</p>}

        {!loading && (
          <>
            {/* Pembacaan grafik/statistik ditampilkan dulu */}
            <h6 className="fw-semibold mb-3">
              <BsCalendarWeek className="me-2" />
              Ringkasan Minggu Lalu
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
              <BsClipboardCheck className="me-2" />
              Rekomendasi
            </h6>

            <section className="dashboard-siswa-box risk-recommendation-box mb-4">
              {rekomendasi.length > 0 ? (
                <ul className="mb-0">
                  {rekomendasi.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mb-0">Belum ada rekomendasi untuk minggu ini.</p>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  );
}

export default DashboardSiswaPage;
