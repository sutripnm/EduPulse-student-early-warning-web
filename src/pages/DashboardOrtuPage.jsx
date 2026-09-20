import {
  BsBarChartFill,
  BsSignpostSplit,
  BsCalendar2Week,
} from "react-icons/bs";
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
import Sidebar from "../components/Sidebar";
import "../styles/dashboard-ortu-page.css";
import useParentDashboard from "../hooks/useParentDashboard";
import { getRiskLabel } from "../utils/risk";
import ComparisonCard from "../components/dashboard-ortu/ComparisonCard";

/** Menampilkan halaman DashboardOrtu EduPulse. */
function DashboardOrtuPage() {
  // Semua data dashboard (profil, grafik mingguan, komparasi bulanan,
  // rekomendasi) + status loading/dummy ada di sini.
  const {
    studentNisn,
    selectedMapel,
    setSelectedMapel,
    dashboard,
    riskMapelOptions,
    loading,
    isDummy,
  } = useParentDashboard();

  const statusRisk = dashboard?.status_risk;
  const rekomendasi = dashboard?.rekomendasi || [];
  const komparasi = dashboard?.komparasi || {};

  return (
    <main className="dashboard-ortu-page d-flex">
      <Sidebar />

      <section className="dashboard-ortu-main flex-grow-1 p-4">
        <header className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1 className="h4 fw-bold mb-1">Dashboard Orang Tua</h1>

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

        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
          <label className="mb-0 small fw-semibold">
            Mata Pelajaran
          </label>

          <div className="d-flex flex-wrap gap-2">
            {riskMapelOptions.map((mapel) => {
              const status =
                String(
                  mapel.status_risiko || ""
                ).toUpperCase();

              const isSelected =
                selectedMapel ===
                String(mapel.id);

              let riskClass =
                "mapel-risk-low";

              if (
                status === "HIGH" ||
                status === "TINGGI"
              ) {
                riskClass =
                  "mapel-risk-high";
              } else if (
                status === "MEDIUM" ||
                status === "SEDANG"
              ) {
                riskClass =
                  "mapel-risk-medium";
              }

              return (
                <button
                  key={mapel.id}
                  type="button"
                  className={`btn mapel-risk-button ${
                    riskClass
                  } ${isSelected ? "active" : ""}`}
                  onClick={() =>
                    setSelectedMapel(
                      String(mapel.id)
                    )
                  }
                >
                  {mapel.nama_mapel}
                </button>
              );
            })}
          </div>
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

          <div
            className={`ortu-profile-chip ${
              String(statusRisk || "").toLowerCase() === "high" ||
              String(statusRisk || "").toLowerCase() === "tinggi"
                ? "risk-high"
                : String(statusRisk || "").toLowerCase() === "medium" ||
                  String(statusRisk || "").toLowerCase() === "sedang"
                ? "risk-medium"
                : String(statusRisk || "").toLowerCase() === "low" ||
                  String(statusRisk || "").toLowerCase() === "rendah"
                ? "risk-low"
                : ""
            }`}
          >
            <small>Label Risiko</small>

            <strong>
              {getRiskLabel(statusRisk)}
            </strong>
          </div>
        </section>

        {loading && <p>Memuat grafik...</p>}

        {!loading && (
          <>
            <h6 className="fw-semibold mb-3">
              <BsBarChartFill className="me-2" />
              Grafik Mingguan
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
                      <Bar dataKey="persen" name="Kehadiran (%)" fill="var(--edupulse-primary)" radius={[6, 6, 0, 0]} />
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
                      <Bar dataKey="jam" name="Jam" fill="var(--edupulse-success)" radius={[6, 6, 0, 0]} />
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
                      <Line dataKey="nilai" name="Tugas 1" stroke="var(--edupulse-primary)" />
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
                      <Line dataKey="nilai" name="Assessment" stroke="var(--edupulse-warning)" />
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
                      <Line dataKey="nilai" name="Tugas 2" stroke="var(--edupulse-danger)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <h6 className="fw-semibold mb-2">
              <BsSignpostSplit className="me-2" />
              Label Risiko & Rekomendasi untuk Orang Tua
            </h6>

            <section className="dashboard-ortu-box risk-recommendation-box mb-4">
              <span
                className={`badge risk-badge risk-${(statusRisk || "").toLowerCase()}`}
              >
                Risiko {getRiskLabel(statusRisk)}
              </span>

              {rekomendasi.length > 0 ? (
                <ul className="mt-3 mb-0">
                  {rekomendasi.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 mb-0">Belum ada rekomendasi untuk minggu ini.</p>
              )}
            </section>

            <h6 className="fw-semibold mb-3">
              <BsCalendar2Week className="me-2" />
              Perbandingan dengan Bulan Lalu
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
