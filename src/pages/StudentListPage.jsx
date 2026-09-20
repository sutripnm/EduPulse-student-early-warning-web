import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/student-list-page.css";
import useStudentList from "../hooks/useStudentList";
import StudentFilterBar from "../components/student-list/StudentFilterBar";
import StudentTable from "../components/student-list/StudentTable";
import HighRiskSidebar from "../components/student-list/HighRiskSidebar";
import Pagination from "../components/student-list/Pagination";

/** Menampilkan halaman StudentList EduPulse. */
function StudentListPage() {
  // Data siswa (sudah terfilter+dipaginasi), state filter (search/kelas/
  // risiko), dan state pagination — semuanya dikelola di useStudentList
  // supaya halaman ini tinggal merakit komponen tabel & filter.
  const {
    students,
    totalStudents,
    loading,
    error,
    search,
    setSearch,
    classFilter,
    setClassFilter,
    riskFilter,
    setRiskFilter,
    kelasOptions,
    page,
    totalPages,
    goToPage,
    highRiskStudents,
  } = useStudentList();


  return (
    <main className="student-list-page d-flex">
      <Sidebar />

      <section className="student-list-main flex-grow-1 p-4">
        {/* HEADER */}
        <header className="student-list-header mb-4">
          <div>
            <p className="text-secondary mb-1">
              Student Management
            </p>

            <h1 className="h3 fw-bold mb-0">
              Daftar Siswa
            </h1>
          </div>

          <Link
            to="/tambah-siswa"
            className="btn btn-dark student-add-button"
          >
            + Tambah Siswa
          </Link>
        </header>

        <div className="row g-4">
          {/* KIRI */}
          <div className="col-lg-8">
            <StudentFilterBar
              search={search}
              setSearch={setSearch}
              classFilter={classFilter}
              setClassFilter={setClassFilter}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
              kelasOptions={kelasOptions}
            />

            <StudentTable
              students={students}
              page={page}
              totalStudents={totalStudents}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>

          {/* KANAN */}
          <div className="col-lg-4">
            <HighRiskSidebar
              students={highRiskStudents}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default StudentListPage;
