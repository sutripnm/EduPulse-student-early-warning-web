import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getStudentDashboard } from "../services/api";
import "../styles/student-dashboard-view.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ==============================================================
// Data dummy — dipakai selama endpoint backend belum siap.
// Struktur ini yang jadi acuan sampai tim backend kasih data asli.
// ==============================================================
const dummyDashboard = {
  profil: {
    nisn: "0051234567",
    nama: "Nadya Putri Ramadhani",
    kelas: "XI IPA 1",
  },
  absensi: [
    { label: "Jan", persen: 95 },
    { label: "Feb", persen: 92 },
    { label: "Mar", persen: 88 },
    { label: "Apr", persen: 90 },
    { label: "Mei", persen: 85 },
  ],
  study_time: [
    { label: "Minggu 1", jam: 6 },
    { label: "Minggu 2", jam: 5 },
    { label: "Minggu 3", jam: 7 },
    { label: "Minggu 4", jam: 4 },
  ],
  tugas_pretest: [
    { label: "Matematika", nilai: 65 },
    { label: "B. Indonesia", nilai: 72 },
    { label: "IPA", nilai: 68 },
  ],
  assessment: [
    { label: "UTS", nilai: 75 },
    { label: "UAS", nilai: 80 },
  ],
  tugas_posttest: [
    { label: "Matematika", nilai: 78 },
    { label: "B. Indonesia", nilai: 83 },
    { label: "IPA", nilai: 80 },
  ],
  status_risk: "MEDIUM",
  rekomendasi: [
    "Tingkatkan jam belajar mandiri, terutama untuk Matematika.",
    "Perhatikan kehadiran — tren presensi menurun 3 bulan terakhir.",
    "Jadwalkan sesi konsultasi dengan wali kelas.",
  ],
};

const riskLabel = {
  HIGH: "Tinggi",
  MEDIUM: "Sedang",
  LOW: "Rendah",
};

const riskBadgeClass = {
  HIGH: "badge text-bg-danger",
  MEDIUM: "badge text-bg-warning",
  LOW: "badge text-bg-success",
};

// role: "siswa" | "ortu" — cuma dipakai untuk copy teks di header,
// data & chart-nya sama persis.
function StudentDashboardView({ role }) {
  const { nisn } = useParams();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingDummy, setUsingDummy] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getStudentDashboard(nisn);

        console.log("Student Dashboard API:", result);

        setDashboard(result.data || result);
      } catch (error) {
        // Endpoint belum ada / belum sesuai -> fallback ke dummy
        // supaya tampilan tetap bisa dikerjakan & didemokan.
        console.error("Gagal mengambil dashboard siswa:", error);
        console.error("STATUS:", error.response?.status);

        setDashboard(dummyDashboard);
        setUsingDummy(true);
      } finally {
        setLoading(false);
      }
    };

    if (nisn) {
      fetchDashboard();
    } else {
      setDashboard(dummyDashboard);
      setUsingDummy(true);
      setLoading(false);
    }
  }, [nisn]);

  if (loading) {
    return (
      <main className="student-dashboard-page d-flex">
        <Sidebar />

        <section className="student-dashboard-main flex-grow-1 p-4">
          <p>Loading...</p>
        </section>
      </main>
    );
  }

  const profil = dashboard.profil || {};

  return (
    <main className="student-dashboard-page d-flex">
      <Sidebar />

      <section className="student-dashboard-main flex-grow-1 p-4">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-secondary mb-1">
              {role === "ortu" ? "Dashboard Orang Tua" : "Dashboard Siswa"}
            </p>

            <h1 className="h4 fw-bold mb-0">
              {role === "ortu"
                ? "Perkembangan Anak Anda"
                : "Perkembangan Belajar Saya"}
            </h1>
          </div>

          {usingDummy && (
            <span className="badge text-bg-secondary">
              Data contoh — API belum tersambung
            </span>
          )}
        </header>

        {/* Profil Siswa */}
        <section className="dashboard-box student-profile-box mb-4">
          <div className="profile-item">
            <small>NISN</small>
            <strong>{profil.nisn || "-"}</strong>
          </div>

          <div className="profile-item">
            <small>Nama Siswa</small>
            <strong>{profil.nama || "-"}</strong>
          </div>

          <div className="profile-item">
            <small>Kelas</small>
            <strong>{profil.kelas || "-"}</strong>
          </div>

          <div className="profile-item">
            <small>Status Risiko</small>
            <strong>
              <span className={riskBadgeClass[dashboard.status_risk] || "badge text-bg-secondary"}>
                {riskLabel[dashboard.status_risk] || "-"}
              </span>
            </strong>
          </div>
        </section>

        {/* Charts */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <div className="dashboard-box dashboard-chart-box">
              <h6 className="mb-1">📅 Grafik Absensi</h6>
              <p className="small text-secondary mb-3">Persentase kehadiran per bulan</p>

              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dashboard.absensi || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="persen" name="Kehadiran (%)" stroke="#6840d9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-6">
            <div className="dashboard-box dashboard-chart-box">
              <h6 className="mb-1">⏱️ Grafik Study Time</h6>
              <p className="small text-secondary mb-3">Jam belajar mandiri per minggu</p>

              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dashboard.study_time || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="jam" name="Jam Belajar" stroke="#22a06b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <div className="dashboard-box dashboard-chart-box">
              <h6 className="mb-1">📝 Tugas 1 (Pretest)</h6>
              <p className="small text-secondary mb-3">Nilai per mata pelajaran</p>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dashboard.tugas_pretest || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nilai" name="Nilai" fill="#f5b82e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-box dashboard-chart-box">
              <h6 className="mb-1">📊 Assessment</h6>
              <p className="small text-secondary mb-3">Nilai UTS / UAS</p>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dashboard.assessment || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nilai" name="Nilai" fill="#6840d9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-box dashboard-chart-box">
              <h6 className="mb-1">📝 Tugas 2 (Posttest)</h6>
              <p className="small text-secondary mb-3">Nilai per mata pelajaran</p>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dashboard.tugas_posttest || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nilai" name="Nilai" fill="#22a06b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Label Risiko & Rekomendasi */}
        <section className="dashboard-box risk-recommendation-box">
          <h6 className="fw-semibold mb-2">
            🚨 Label Risiko & Rekomendasi Tindakan
          </h6>

          <p className="mb-3">
            Status risiko saat ini:{" "}
            <span className={riskBadgeClass[dashboard.status_risk] || "badge text-bg-secondary"}>
              {riskLabel[dashboard.status_risk] || "-"}
            </span>
          </p>

          <ul className="mb-0">
            {(dashboard.rekomendasi || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default StudentDashboardView;
