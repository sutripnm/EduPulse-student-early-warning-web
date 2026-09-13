import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getStudentDashboard } from "../services/api";
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
  status_risk: "MEDIUM",
  rekomendasi: [
    "Tingkatkan waktu belajar mandiri anak, terutama sebelum assessment.",
    "Dampingi anak agar kehadiran tetap konsisten di akhir minggu.",
  ],
};


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
        const result = await getStudentDashboard(
          studentNisn,
          selectedMapel
        );

        console.log("Dashboard Ortu API:", result);

        setDashboard(result.data || result);
        setIsDummy(false);
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
  }, [studentNisn, selectedMapel]);


  const statusRisk = dashboard?.status_risk;
  const rekomendasi = dashboard?.rekomendasi || [];


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


        <section className="dashboard-ortu-box d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

          <div className="d-flex gap-2 flex-wrap">

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

          </div>

          <div className="d-flex align-items-center gap-2">
            <label htmlFor="filterMapelOrtu" className="mb-0 small fw-semibold">
              Filter Mapel
            </label>

            <select
              id="filterMapelOrtu"
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

            <section className="dashboard-ortu-box risk-recommendation-box">
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

export default DashboardOrtuPage;