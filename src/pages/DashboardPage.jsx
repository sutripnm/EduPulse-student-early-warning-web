import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/api";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard-page.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  FiUsers,
  FiAlertTriangle,
  FiMinusCircle,
  FiCheckCircle,
} from "react-icons/fi";

const riskColors = {
  Rendah: "#22a06b",
  Sedang: "#f5b82e",
  Tinggi: "#dc3545",
};


// ==============================================================
// Data School Analytics Section
// ==============================================================
const riskByClassData = [
  {
    className: "X",
    low: 70,
    medium: 15,
    high: 5,
  },
  {
    className: "XI",
    low: 65,
    medium: 20,
    high: 10,
  },
  {
    className: "XII",
    low: 75,
    medium: 12,
    high: 8,
  },
];

// ==============================================================
// Data dummy risk factors for ML model
// ==============================================================
const riskFactorData = [
  {
    name: "Presensi Rendah",
    value: 45,
  },
  {
    name: "Nilai Ujian < KKM",
    value: 35,
  },
  {
    name: "Nilai Tugas",
    value: 20,
  },
];

// ==============================================================
// Color mapping for risk factors
// ==============================================================
const riskFactorColors = [
  "#6840d9",
  "#f5b82e",
  "#22a06b",
];




function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);

  const riskData = [
  {
    name: "Rendah",
    value: dashboardData?.proporsi_risiko?.rendah?.percentage || 0,
  },
  {
    name: "Sedang",
    value: dashboardData?.proporsi_risiko?.sedang?.percentage || 0,
  },
  {
    name: "Tinggi",
    value: dashboardData?.proporsi_risiko?.tinggi?.percentage || 0,
  },
];

  const topRiskStudents = dashboardData?.top_intervensi || [];

  const performanceData = (dashboardData?.trend_performa || []).map((item) => ({
    month: item.label,
    performance: item.rata_rata_nilai,
    attendance: item.rata_rata_presensi,
  }));


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboardSummary(2023);

        console.log("Dashboard API:", result);

        if (result.success) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);


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
          <section className="row g-3 mb-4">

            {/* Total Siswa */}
            <div className="col-6 col-xl-3">
              <div className="dashboard-kpi h-100 p-3">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-secondary mb-1">
                      Total Siswa
                    </p>

                  <h3 className="fw-bold mb-1">
                    {dashboardData ? dashboardData.summary.total_siswa : "..."}
                  </h3>

                    <small className="text-success">
                      ↑ 8.2% dari tahun lalu
                    </small>
                  </div>

                  <div className="kpi-icon">
                    <FiUsers />
                  </div>
                </div>

              </div>
            </div>

            {/* Risiko Tinggi */}
            <div className="col-6 col-xl-3">
              <div className="dashboard-kpi h-100 p-3">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-secondary mb-1">
                      Risiko Tinggi
                    </p>

                    <h3 className="fw-bold mb-1 text-danger">
                      15
                    </h3>

                    <small className="text-danger">
                      ↑ 3 siswa dari bulan lalu
                    </small>
                  </div>

                  <div className="kpi-icon">
                    <FiAlertTriangle />
                  </div>
                </div>

              </div>
            </div>

            {/* Risiko Sedang */}
            <div className="col-6 col-xl-3">
              <div className="dashboard-kpi h-100 p-3">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-secondary mb-1">
                      Risiko Sedang
                    </p>

                    <h3 className="fw-bold mb-1 text-warning">
                      25
                    </h3>

                    <small className="text-secondary">
                      8.3% dari total siswa
                    </small>
                  </div>

                  <div className="kpi-icon">
                    <FiMinusCircle />
                  </div>
                </div>

              </div>
            </div>

            {/* Risiko Rendah */}
            <div className="col-6 col-xl-3">
              <div className="dashboard-kpi h-100 p-3">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-secondary mb-1">
                      Risiko Rendah
                    </p>

                    <h3 className="fw-bold mb-1 text-success">
                      260
                    </h3>

                    <small className="text-success">
                      86.7% dari total siswa
                    </small>
                  </div>

                  <div className="kpi-icon">
                    <FiCheckCircle />
                  </div>
                </div>

              </div>
            </div>

          </section>

{/* 
// ==============================================================
// Main Analytics Section
// ==============================================================
*/}
<section className="row g-3">

  {/* Left Content */}
  <div className="col-lg-9">

    {/* Charts */}
    <div className="row g-3">

      <div className="col-md-8">
        <div className="dashboard-box dashboard-chart-box">

          <h6 className="mb-1">
            📊 Tren Performa & Presensi
          </h6>

          <p className="small mb-3">
            Grafik rata-rata per bulan
          </p>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={dashboardData?.trend_performa || []}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  dataKey="rata_rata_nilai"
                />

                <Line
                  dataKey="rata_rata_presensi"
                />

              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="d-flex gap-3 small mt-2">
            <span>
              <strong>●</strong> Performa
            </span>

            <span>
              <strong>●</strong> Presensi
            </span>
          </div>

        </div>
      </div>

      <div className="col-md-4">
        <div className="dashboard-box dashboard-chart-box">

          <h6 className="mb-1">
            🍩 Donut Chart: Proporsi Risiko
          </h6>

          <p className="small mb-2">
            Distribusi tingkat risiko siswa
          </p>

          <div className="risk-chart-container">
            <ResponsiveContainer width="100%" height={258}>
              <PieChart>

                <Pie
                  data={riskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {riskData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={riskColors[entry.name]}
                    />
                  ))}
                </Pie>

              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>

    </div>


{/* 
// ==============================================================
// Top 5 Students Needing Intervention Section
// ==============================================================
*/}
    <section className="mt-3">

      <h6>
        📋 Top 5 Siswa Membutuhkan Intervensi
      </h6>

        <div className="dashboard-table table-responsive">

          <table className="table align-middle mb-0">

            <thead>
              <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Nilai</th>
                <th>Kehadiran</th>
                <th>Status Risk</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {topRiskStudents.map((student) => (
                <tr key={student.nisn}>

                  <td>
                    <span className="fw-semibold">
                      {student.nama}
                    </span>
                  </td>

                  <td>
                    {student.kelas}
                  </td>

                  <td>
                    {student.nilai}
                  </td>

                  <td>
                    {student.kehadiran}%
                  </td>

                  <td>
                    <span
                      className={
                        student.status_risk === "Tinggi"
                          ? "badge text-bg-danger"
                          : "badge text-bg-warning"
                      }
                    >
                      {student.status_risk}
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline-dark">
                      Detail
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

    </section>

  </div>


{/*
// ==============================================================
// Today's Summary Section / Ringkasan Hari Ini
// ==============================================================
*/}
  <div className="col-lg-3">

    <div className="dashboard-box today-summary h-100">

      <h6 className="mb-4">
        Ringkasan hari ini
      </h6>

      <div className="mb-4">
        <small className="text-secondary">
          Siswa perlu perhatian
        </small>

        <h3 className="fw-bold mt-1">
          8 siswa
        </h3>
      </div>

      <div className="mb-4">
        <small className="text-secondary">
          Kehadiran terendah
        </small>

        <h3 className="fw-bold mt-1">
          68%
        </h3>
      </div>

      <div className="mb-4">
        <small className="text-secondary">
          Siswa risiko tinggi
        </small>

        <h3 className="fw-bold mt-1 text-danger">
          15
        </h3>
      </div>

      <hr />

      <div>
        <p className="mb-2 fw-semibold">
          Prioritas hari ini
        </p>

        <ul className="small ps-3 mb-0">
          <li className="mb-2">
            Review siswa dengan absensi di bawah 70%.
          </li>

          <li className="mb-2">
            Periksa siswa dengan nilai di bawah KKM.
          </li>

          <li>
            Follow up siswa dengan risiko tinggi.
          </li>
        </ul>
      </div>

    </div>

  </div>

</section>

{/*
// ==============================================================
//  *****************SCHOOL ANALYTICS SECTION********************
// ==============================================================
*/}
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

          <h6 className="mb-1">
            📊 Perbandingan Risiko per Kelas
          </h6>

          <p className="small mb-3">
            Jumlah siswa berdasarkan tingkat risiko
          </p>

          <div className="analytics-chart-container">

            <ResponsiveContainer width="100%" height={260}>

              <BarChart data={riskByClassData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="className" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="low"
                  name="Rendah"
                  fill="#22a06b"
                />

                <Bar
                  dataKey="medium"
                  name="Sedang"
                  fill="#f5b82e"
                />

                <Bar
                  dataKey="high"
                  name="Tinggi"
                  fill="#dc3545"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>
      </div>

      <div className="col-lg-6">
<div className="dashboard-box analytics-box">

  <h6 className="mb-1">
    🎯 Faktor Utama Risiko ML
  </h6>

  <p className="small mb-2">
    Faktor yang paling berkontribusi terhadap risiko siswa
  </p>

  <div className="analytics-chart-container">

    <ResponsiveContainer width="100%" height={260}>

      <PieChart>

        <Pie
          data={riskFactorData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={85}
          label={({ percent }) =>
            `${(percent * 100).toFixed(0)}%`
          }
        >
          {riskFactorData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={riskFactorColors[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>
      </div>

    </div>

  </section>

</section>

    </main>
  );
}

export default DashboardPage;