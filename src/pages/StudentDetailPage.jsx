import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/student-detail-page.css";
import useStudentDetail from "../hooks/useStudentDetail";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import StudentProfileInfo from "../components/student-detail/StudentProfileInfo";
import StudentMetrics from "../components/student-detail/StudentMetrics";
import RiskAnalysisCard from "../components/student-detail/RiskAnalysisCard";

function StudentDetailPage() {
  const { id } = useParams();
  const { student, loading, error } = useStudentDetail(id);

  if (loading) {
    return (
      <main className="student-detail-page d-flex">
        <Sidebar />
        <section className="student-detail-main flex-grow-1 p-4">
          <LoadingState />
        </section>
      </main>
    );
  }

  if (error || !student) {
    return (
      <main className="student-detail-page d-flex">
        <Sidebar />
        <section className="student-detail-main flex-grow-1 p-4">
          <ErrorState message="Gagal mengambil data siswa." backTo="/student-list" />
        </section>
      </main>
    );
  }

  return (
    <main className="student-detail-page d-flex">
      <Sidebar />

      <section className="student-detail-main flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h4 fw-bold mb-1">Detail Profil Siswa</h1>
            <p className="text-secondary mb-0">
              Informasi siswa dan status risiko
            </p>
          </div>

          <Link to="/student-list" className="btn btn-outline-dark">
            ← Kembali
          </Link>
        </div>

        <StudentProfileInfo student={student} />
        <StudentMetrics student={student} />
        <RiskAnalysisCard student={student} />
      </section>
    </main>
  );
}

export default StudentDetailPage;
