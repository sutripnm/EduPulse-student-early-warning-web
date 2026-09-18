import { Link, useParams } from "react-router-dom";
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

  const {
    student,
    mapelOptions,
    selectedMapel,
    setSelectedMapel,
    recommendation,
    handleGenerateRecommendation,
    recommendationLoading,
    handleDeleteStudent,
    deleteLoading,
    loading,
    error,
  } = useStudentDetail(id);

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
          <ErrorState
            message="Gagal mengambil data siswa."
            backTo="/daftar-siswa"
          />
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

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDeleteStudent}
              disabled={deleteLoading}
            >
              {deleteLoading
                ? "Menghapus..."
                : "Hapus Siswa"}
            </button>

            <Link
              to="/daftar-siswa"
              className="btn btn-outline-dark"
            >
              ← Kembali
            </Link>
          </div>
        </div>

        {/* Filter Mapel */}
        <div className="student-filter mb-4">
          <label
            htmlFor="mapel"
            className="form-label fw-semibold"
          >
            Mata Pelajaran
          </label>

          <select
            id="mapel"
            className="form-select"
            value={selectedMapel}
            onChange={(event) =>
              setSelectedMapel(event.target.value)
            }
          >
            <option value="">
              Semua Mata Pelajaran
            </option>

            {mapelOptions.map((mapel) => (
              <option
                key={mapel.id}
                value={mapel.id}
              >
                {mapel.nama_mapel}
              </option>
            ))}
          </select>
        </div>

        <StudentProfileInfo student={student} />

        <StudentMetrics
          student={student}
        />

        <RiskAnalysisCard
          student={student}
          selectedMapel={selectedMapel}
          recommendation={recommendation}
          onGenerateRecommendation={
            handleGenerateRecommendation
          }
          recommendationLoading={
            recommendationLoading
          }
        />

      </section>
    </main>
  );
}

export default StudentDetailPage;