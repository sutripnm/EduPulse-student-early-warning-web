import { useParams, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import "../styles/student-detail-page.css";
import useStudentDetail from "../hooks/useStudentDetail";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import StudentProfileInfo from "../components/student-detail/StudentProfileInfo";
import StudentMetrics from "../components/student-detail/StudentMetrics";
import RiskAnalysisCard from "../components/student-detail/RiskAnalysisCard";

function StudentDetailPage() {
  // Ambil NISN siswa dari parameter URL (/detail-siswa/:id)
  const { id } = useParams();

  // Data siswa + opsi filter mata pelajaran, plus status loading/error.
  const {
    student,
    mapelOptions,
    selectedMapel,
    setSelectedMapel,
    loading,
    error,
  } = useStudentDetail(id);

  // Tampilkan loading dulu selagi data siswa belum selesai di-fetch
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

  // Kalau fetch gagal atau siswanya gak ketemu, tampilkan pesan error
  // dengan tombol kembali ke daftar siswa, dan hentikan render di sini.
  if (error || !student) {
    return (
      <main className="student-detail-page d-flex">
        <Sidebar />

        <section className="student-detail-main flex-grow-1 p-4">
          <ErrorState
            message="Gagal mengambil data siswa."
            backTo="/student-list"
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

          <Link
            to="/student-list"
            className="btn btn-outline-primary"
          >
            <BsArrowLeft className="me-1" />
            Kembali
          </Link>
        </div>

        {/* Filter Mata Pelajaran */}
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

        {/* Informasi siswa */}
        <StudentProfileInfo student={student} />

        {/* Metrics */}
        <StudentMetrics student={student} />

        {/* Analisis risiko */}
        <RiskAnalysisCard student={student} />
      </section>
    </main>
  );
}

export default StudentDetailPage;