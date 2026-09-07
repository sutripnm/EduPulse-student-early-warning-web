import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getStudentByNisn } from "../services/api";
import "../styles/student-detail-page.css";

function StudentDetailPage() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const result = await getStudentByNisn(id);

        console.log("Student Detail API:", result);

        setStudent(result.data || result);
      } catch (error) {
        console.error("Gagal mengambil detail siswa:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <main className="student-detail-page d-flex">
        <Sidebar />

        <section className="student-detail-main flex-grow-1 p-4">
          <p>Loading...</p>
        </section>
      </main>
    );
  }

  if (error || !student) {
    return (
      <main className="student-detail-page d-flex">
        <Sidebar />

        <section className="student-detail-main flex-grow-1 p-4">
          <p>Gagal mengambil data siswa.</p>

          <Link
            to="/student-list"
            className="btn btn-outline-dark"
          >
            ← Kembali
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="student-detail-page d-flex">

      <Sidebar />

      <section className="student-detail-main flex-grow-1 p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1 className="h4 fw-bold mb-1">
              Detail Profil Siswa
            </h1>

            <p className="text-secondary mb-0">
              Informasi siswa dan status risiko
            </p>

          </div>

          <Link
            to="/student-list"
            className="btn btn-outline-dark"
          >
            ← Kembali
          </Link>

        </div>


        {/* =========================
            PROFIL SISWA
        ========================== */}
        <section className="student-profile-info mb-4">

          <div className="student-info-item">
            <small>Nama Siswa</small>
            <strong>{student.nama}</strong>
          </div>

          <div className="student-info-item">
            <small>NISN</small>
            <strong>{student.nisn}</strong>
          </div>

          <div className="student-info-item">
            <small>Kelas</small>
            <strong>
              {student.kelas?.nama_kelas || "-"}
            </strong>
          </div>

          <div className="student-info-item">
            <small>Gender</small>
            <strong>
              {student.gender || "-"}
            </strong>
          </div>

          <div className="student-info-item">
            <small>Angkatan</small>
            <strong>
              {student.angkatan || "-"}
            </strong>
          </div>

        </section>


        {/* =========================
            METRIK SISWA
        ========================== */}
        <section className="student-metrics mb-4">

          <div className="metric-card">

            <span>
              Kehadiran
            </span>

            <strong>
              {student.presensi ?? 0}%
            </strong>

          </div>


          <div className="metric-card">

            <span>
              Nilai
            </span>

            <strong>
              {student.nilai ?? "-"}
            </strong>

          </div>


          <div className="metric-card metric-risk">

            <span>
              Status Risiko
            </span>

            <strong>
              {student.status_risk === "HIGH"
                ? "Tinggi"
                : student.status_risk === "MEDIUM"
                ? "Sedang"
                : student.status_risk === "LOW"
                ? "Rendah"
                : "-"}
            </strong>

          </div>

        </section>


        {/* =========================
            STATUS RISIKO
        ========================== */}
        <p className="fw-semibold mb-2">
          📊 Analisis Risiko Siswa
        </p>

        <section className="risk-analysis-card">

          <div className="risk-analysis-section">

            <h6 className="fw-semibold">
              🚨 Status Risiko
            </h6>

            <p className="mb-0">

              Siswa saat ini memiliki status risiko{" "}

              <strong>

                {student.status_risk === "HIGH"
                  ? "Tinggi"
                  : student.status_risk === "MEDIUM"
                  ? "Sedang"
                  : student.status_risk === "LOW"
                  ? "Rendah"
                  : "-"}

              </strong>.

            </p>

          </div>

        </section>

      </section>

    </main>
  );
}

export default StudentDetailPage;