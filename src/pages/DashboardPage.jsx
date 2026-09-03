import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDashboardSummary,
  getSchoolAnalytics,
} from "../services/api";
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
// Color mapping for risk factors
// ==============================================================
const riskFactorColors = [
  "#6840d9",
  "#f5b82e",
  "#22a06b",
];

const topHighRiskClasses = [
  {
    className: "XI IPA 1",
    count: 8,
  },
  {
    className: "XII IPS 1",
    count: 6,
  },
  {
    className: "X IPA 2",
    count: 5,
  },
  {
    className: "XI IPA 2",
    count: 4,
  },
  {
    className: "XII IPA 1",
    count: 3,
  },
];

const topLowRiskClasses = [
  {
    className: "XII IPA 1",
    count: 30,
  },
  {
    className: "XII IPS 1",
    count: 28,
  },
  {
    className: "XI IPA 1",
    count: 25,
  },
  {
    className: "X IPA 1",
    count: 24,
  },
  {
    className: "XI IPS 1",
    count: 22,
  },
];




function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [schoolAnalyticsData, setSchoolAnalyticsData] = useState(null);

  const riskByClassData =
  schoolAnalyticsData?.perbandingan_risiko_kelas || [];

  const riskFactorData =
  schoolAnalyticsData?.faktor_utama_risiko?.map((item) => ({
    name: item.faktor,
    value: item.percentage,
  })) || [];


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


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboardSummary();

        console.log("Dashboard API:", result);

        if (result.success) {
          setDashboardData(result.data);
        }

        const analyticsResult = await getSchoolAnalytics({
          angkatan: dashboardData?.summary?.angkatan || "",
        });

        console.log("School Analytics API:", analyticsResult);

        if (analyticsResult.success) {
          setSchoolAnalyticsData(analyticsResult.data);
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
                      {dashboardData ? dashboardData.summary.risiko_tinggi : "..."}
                    </h3>

                    <small className="text-danger">
                      {dashboardData
                        ? `${dashboardData.proporsi_risiko.tinggi.percentage}% dari total siswa`
                        : "..."}
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
                      {dashboardData ? dashboardData.summary.risiko_sedang : "..."}
                    </h3>

                    <small className="text-secondary">
                      {dashboardData
                        ? `${dashboardData.proporsi_risiko.sedang.percentage}% dari total siswa`
                        : "..."}
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
                      {dashboardData
                        ? dashboardData.proporsi_risiko.rendah.count
                        : "..."}
                    </h3>

                    <small className="text-success">
                      {dashboardData
                        ? `${dashboardData.proporsi_risiko.rendah.percentage}% dari total siswa`
                        : "..."}
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

                <XAxis dataKey="label" />

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
      Insight Kelas
    </h6>

    {/* High Risk */}
    <div className="mb-4">

      <p className="fw-semibold mb-3">
        🏫 High Risk Terbanyak
      </p>

      {topHighRiskClasses.map((item, index) => (
        <div
          key={item.className}
          className="d-flex justify-content-between align-items-center mb-2"
        >
          <span className="small">
            {index + 1}. {item.className}
          </span>

          <span className="small fw-semibold text-danger">
            {item.count} siswa
          </span>
        </div>
      ))}

    </div>

    <hr />

    {/* Low Risk */}
    <div className="mt-4">

      <p className="fw-semibold mb-3">
        ✅ Low Risk Terbanyak
      </p>

      {topLowRiskClasses.map((item, index) => (
        <div
          key={item.className}
          className="d-flex justify-content-between align-items-center mb-2"
        >
          <span className="small">
            {index + 1}. {item.className}
          </span>

          <span className="small fw-semibold text-success">
            {item.count} siswa
          </span>
        </div>
      ))}

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

              <XAxis dataKey="nama_kelas" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="jumlah_high_risk"
                name="Risiko Tinggi"
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