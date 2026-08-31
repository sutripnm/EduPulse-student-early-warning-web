import Sidebar from "../components/Sidebar";
import "../styles/dashboard-page.css";

function DashboardPage() {
  return (
    <main className="dashboard-page d-flex">

      <Sidebar />

      <section className="dashboard-main flex-grow-1 p-4">

        {/* Header */}
        <header className="d-flex justify-content-between align-items-center mb-3">

          <div>
            <h1 className="mb-2">Dashboard</h1>

            <div className="d-flex gap-2">
              <button className="btn btn-primary rounded-pill">
                Tahun Masuk
              </button>

              <button className="btn btn-primary rounded-pill">
                2023
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="text-end">
              <p className="mb-0 fw-semibold">
                Agus
              </p>

              <small className="text-secondary">
                Guru
              </small>
            </div>

            <span className="fs-2">
              ●
            </span>
          </div>

        </header>

        {/* KPI */}
        <section className="row g-2 mb-3">

          <div className="col-6 col-xl-3">
            <div className="dashboard-kpi">
              <div className="kpi-icon">
                👥
              </div>

              <p>Total</p>
              <h5>300 Siswa</h5>
            </div>
          </div>

          <div className="col-6 col-xl-3">
            <div className="dashboard-kpi">
              <div className="kpi-icon">
                🚨
              </div>

              <p>Resiko Tinggi</p>
              <h5>15 Siswa</h5>
            </div>
          </div>

          <div className="col-6 col-xl-3">
            <div className="dashboard-kpi">
              <div className="kpi-icon">
                ⚠️
              </div>

              <p>Resiko Sedang</p>
              <h5>15 Siswa</h5>
            </div>
          </div>

          <div className="col-6 col-xl-3">
            <div className="dashboard-kpi">
              <div className="kpi-icon">
                ⓘ
              </div>

              <p>Resiko Rendah</p>
              <h5>15 Siswa</h5>
            </div>
          </div>

        </section>

{/* Main Analytics */}
<section className="row g-2">

  {/* Left Content */}
  <div className="col-lg-8">

    {/* Charts */}
    <div className="row g-2">

      <div className="col-md-6">
        <div className="dashboard-box dashboard-chart-box">
          <h6>
            📊 Chart: Tren Performa & Presensi
          </h6>

          <p className="mb-0">
            Grafik garis nilai rata-rata per bulan
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-box dashboard-chart-box">
          <h6>
            🍩 Donut Chart: Proporsi Risiko
          </h6>

          <p className="mb-0">
            • Hijau: 80% (97 Siswa)
            <br />
            • Kuning: 13% (15 Siswa)
            <br />
            • Merah: 7% (8 Siswa)
          </p>
        </div>
      </div>

    </div>

    {/* Top 5 */}
    <section className="mt-3">

      <h6>
        📋 Top 5 Siswa Membutuhkan Intervensi
      </h6>

      <div className="dashboard-table">

        <div className="row fw-semibold">
          <div className="col">Nama</div>
          <div className="col">Siswa</div>
          <div className="col">Kelas</div>
          <div className="col">Nilai</div>
          <div className="col">Kehadiran</div>
          <div className="col">Status Risk</div>
          <div className="col">Action</div>
        </div>

      </div>

    </section>

  </div>

  {/* Ringkasan Hari Ini */}
  <div className="col-lg-4">

    <div className="dashboard-box today-summary h-100">

      <h6>
        Ringkasan hari ini
      </h6>

    </div>

  </div>

</section>

        {/* School Analytics */}
        <section className="mt-5">

          <h5 className="mb-3">
            LAPORAN ANALITIS & STATISTIK SEKOLAH
          </h5>

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-primary rounded-pill">
              Tahun Masuk
            </button>

            <button className="btn btn-primary rounded-pill">
              Filter Kelas
            </button>

            <button className="btn btn-primary rounded-pill">
              Filter Mapel
            </button>
          </div>

          <div className="row g-3">

            <div className="col-lg-6">
              <div className="dashboard-box analytics-box">
                <h6>
                  📊 Perbandingan Risiko per Kelas
                </h6>

                <p>
                  Bar chart komparasi jumlah siswa berisiko
                  antar tingkat kelas (X, XI, XII).
                </p>

                <p className="mb-0">
                  [ Bar Chart: Kelas vs Jumlah High Risk ]
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="dashboard-box analytics-box">
                <h6>
                  🎯 Faktor Utama Risiko ML
                </h6>

                <p>
                  Pie chart agregat pemicu risiko:
                </p>

                <p className="mb-0">
                  • Presensi Rendah : 45%
                  <br />
                  • Nilai Ujian &lt; KKM : 35%
                  <br />
                  • Nilai Tugas : 35%
                </p>
              </div>
            </div>

          </div>

        </section>

      </section>

    </main>
  );
}

export default DashboardPage;