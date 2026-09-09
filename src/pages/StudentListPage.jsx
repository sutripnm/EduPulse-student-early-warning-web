import Sidebar from "../components/Sidebar";
import "../styles/student-list-page.css";
import useStudentList from "../hooks/useStudentList";
import StudentFilterBar from "../components/student-list/StudentFilterBar";
import StudentTable from "../components/student-list/StudentTable";
import HighRiskSidebar from "../components/student-list/HighRiskSidebar";

function StudentListPage() {
  const {
    search,
    setSearch,
    classFilter,
    setClassFilter,
    riskFilter,
    setRiskFilter,
    filteredStudents,
    highRiskStudents,
  } = useStudentList();

  return (
    <main className="student-list-page d-flex">
      <Sidebar />

      <section className="student-list-main flex-grow-1 p-4">
        <header className="student-list-header mb-4">
          <div>
            <p className="text-secondary mb-1">Student Management</p>
            <h1 className="h3 fw-bold mb-0">Daftar Siswa</h1>
          </div>
        </header>

        <div className="row g-4">
          <div className="col-lg-8">
            <StudentFilterBar
              search={search}
              setSearch={setSearch}
              classFilter={classFilter}
              setClassFilter={setClassFilter}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
            />

            <StudentTable students={filteredStudents} />
          </div>

          <div className="col-lg-4">
            <HighRiskSidebar students={highRiskStudents} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default StudentListPage;
