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
    riskMapelOptions,
    selectedMapel,
    setSelectedMapel,
    recommendation,
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

        {/* =========================
            HEADER
            ========================= */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h4 fw-bold mb-1">
              Detail Profil Siswa
            </h1>

            <p className="text-secondary mb-0">
              Informasi siswa dan status risiko
            </p>
          </div>

        <div className="d-flex gap-2 flex-wrap">
          <Link
            to={`/dashboard-siswa/${id}`}
            className="btn btn-outline-dark"
          >
            Dashboard Siswa
          </Link>

          <Link
            to={`/dashboard-ortu/${id}`}
            className="btn btn-outline-dark"
          >
            Dashboard Orang Tua
          </Link>

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

        {/* =========================
            MAPEL BERISIKO
            ========================= */}
        <div className="student-filter mb-4">
          <label className="form-label fw-semibold d-block mb-2">
            Mata Pelajaran
          </label>

          <div className="d-flex flex-wrap gap-2">
            {riskMapelOptions.length > 0 ? (
              riskMapelOptions.map((mapel) => {
                const riskStatus = String(
                  mapel.status_risiko || ""
                ).toUpperCase();

                const isSelected =
                  selectedMapel ===
                  String(mapel.id);

                let riskClass = "";

                if (
                  riskStatus === "HIGH" ||
                  riskStatus === "TINGGI"
                ) {
                  riskClass = isSelected
                    ? "mapel-risk-high active"
                    : "mapel-risk-high";
                } else if (
                  riskStatus === "MEDIUM" ||
                  riskStatus === "SEDANG"
                ) {
                  riskClass = isSelected
                    ? "mapel-risk-medium active"
                    : "mapel-risk-medium";
                } else {
                  riskClass = isSelected
                    ? "mapel-risk-low active"
                    : "mapel-risk-low";
                }

                return (
                  <button
                    key={mapel.id}
                    type="button"
                    className={`btn mapel-risk-button ${riskClass}`}
                    onClick={() =>
                      setSelectedMapel(
                        String(mapel.id)
                      )
                    }
                  >
                    {mapel.nama_mapel}
                  </button>
                );
              })
            ) : (
              <span className="text-secondary small">
                Data mata pelajaran belum tersedia.
              </span>
            )}
          </div>
        </div>

        {/* =========================
            PROFILE
            ========================= */}
        <StudentProfileInfo
          student={student}
        />

        {/* =========================
            METRICS
            ========================= */}
        <StudentMetrics
          student={student}
        />

        {/* =========================
            EWS + REKOMENDASI
            ========================= */}
        <RiskAnalysisCard
          student={student}
          selectedMapel={selectedMapel}
          recommendation={recommendation}
          recommendationLoading={
            recommendationLoading
          }
        />

      </section>
    </main>
  );
}

export default StudentDetailPage;