import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/student-list-page.css";

const studentsData = [
  {
    id: 1,
    nis: "2023001",
    name: "Ahmad Rizky",
    className: "X IPA 1",
    gender: "Laki-laki",
    attendance: 62,
    score: 58,
    risk: "Tinggi",
  },
  {
    id: 2,
    nis: "2023002",
    name: "Siti Aisyah",
    className: "X IPA 2",
    gender: "Perempuan",
    attendance: 68,
    score: 61,
    risk: "Tinggi",
  },
  {
    id: 3,
    nis: "2023003",
    name: "Budi Santoso",
    className: "XI IPA 1",
    gender: "Laki-laki",
    attendance: 71,
    score: 64,
    risk: "Sedang",
  },
  {
    id: 4,
    nis: "2023004",
    name: "Citra Putri",
    className: "XI IPA 2",
    gender: "Perempuan",
    attendance: 74,
    score: 67,
    risk: "Sedang",
  },
  {
    id: 5,
    nis: "2023005",
    name: "Dina Lestari",
    className: "XII IPA 1",
    gender: "Perempuan",
    attendance: 88,
    score: 82,
    risk: "Rendah",
  },
  {
    id: 6,
    nis: "2023006",
    name: "Fajar Maulana",
    className: "XII IPS 1",
    gender: "Laki-laki",
    attendance: 91,
    score: 86,
    risk: "Rendah",
  },
];

function StudentListPage() {
const [search, setSearch] = useState("");
const [classFilter, setClassFilter] = useState("Semua");
const [riskFilter, setRiskFilter] = useState("Semua");

const filteredStudents = studentsData.filter((student) => {
  const matchesSearch =
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.nis.includes(search);

  const matchesClass =
    classFilter === "Semua" ||
    student.className === classFilter;

  const matchesRisk =
    riskFilter === "Semua" ||
    student.risk === riskFilter;

  return matchesSearch && matchesClass && matchesRisk;
});

const riskStudents = studentsData.filter(
  (student) => student.risk === "Tinggi"
);

return (
  <main className="student-list-page d-flex">

    <Sidebar />

    <section className="student-list-main flex-grow-1 p-4">

      {/* Header */}
      <header className="student-list-header mb-4">

        <div>
          <p className="text-secondary mb-1">
            Student Management
          </p>

          <h1 className="h3 fw-bold mb-0">
            Daftar Siswa
          </h1>
        </div>

      </header>


      {/* CONTENT */}
      <div className="row g-4">


        {/* ========================= */}
        {/* KOLOM KIRI */}
        {/* ========================= */}

        <div className="col-lg-8">


          {/* Filter */}
          <section className="student-filter mb-4">

            <div className="row g-3 align-items-end">

              {/* Search */}
              <div className="col-lg-5">

                <label
                  htmlFor="search"
                  className="form-label fw-semibold"
                >
                  Cari Siswa
                </label>

                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Cari berdasarkan nama atau NIS..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

              </div>


              {/* Filter Kelas */}
              <div className="col-lg-2">

                <label
                  htmlFor="class"
                  className="form-label fw-semibold"
                >
                  Kelas
                </label>

                <select
                  id="class"
                  className="form-select"
                  value={classFilter}
                  onChange={(event) =>
                    setClassFilter(event.target.value)
                  }
                >

                  <option value="Semua">
                    Semua Kelas
                  </option>

                  <option value="X IPA 1">
                    X IPA 1
                  </option>

                  <option value="X IPA 2">
                    X IPA 2
                  </option>

                  <option value="XI IPA 1">
                    XI IPA 1
                  </option>

                  <option value="XI IPA 2">
                    XI IPA 2
                  </option>

                  <option value="XII IPA 1">
                    XII IPA 1
                  </option>

                  <option value="XII IPS 1">
                    XII IPS 1
                  </option>

                </select>

              </div>


              {/* Filter Risiko */}
              <div className="col-lg-2">

                <label
                  htmlFor="risk"
                  className="form-label fw-semibold"
                >
                  Status Risiko
                </label>

                <select
                  id="risk"
                  className="form-select"
                  value={riskFilter}
                  onChange={(event) =>
                    setRiskFilter(event.target.value)
                  }
                >

                  <option value="Semua">
                    Semua Risiko
                  </option>

                  <option value="Tinggi">
                    Tinggi
                  </option>

                  <option value="Sedang">
                    Sedang
                  </option>

                  <option value="Rendah">
                    Rendah
                  </option>

                </select>

              </div>


              {/* Tambah Siswa */}
              <div className="col-lg-3">

                <Link
                  to="/students/new"
                  className="btn btn-dark w-100"
                >
                  + Tambah Siswa
                </Link>

              </div>

            </div>

          </section>


          {/* ========================= */}
          {/* DATA SISWA */}
          {/* ========================= */}

          <section className="student-table-card">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <div>

                <h5 className="fw-bold mb-1">
                  Data Siswa
                </h5>

                <small className="text-secondary">
                  Menampilkan {filteredStudents.length} siswa
                </small>

              </div>

            </div>


            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead>

                  <tr>
                    <th>NIS</th>
                    <th>Nama Siswa</th>
                    <th>Kelas</th>
                    <th>Gender</th>
                    <th>Presensi</th>
                    <th>Nilai</th>
                    <th>Status Risiko</th>
                    <th>Aksi</th>
                  </tr>

                </thead>


                <tbody>

                  {filteredStudents.map((student) => (

                    <tr key={student.id}>

                      <td>
                        {student.nis}
                      </td>

                      <td>
                        <span className="fw-semibold">
                          {student.name}
                        </span>
                      </td>

                      <td>
                        {student.className}
                      </td>

                      <td>
                        {student.gender}
                      </td>

                      <td>
                        {student.attendance}%
                      </td>

                      <td>
                        {student.score}
                      </td>

                      <td>

                        <span
                          className={`badge risk-badge risk-${student.risk.toLowerCase()}`}
                        >
                          {student.risk}
                        </span>

                      </td>

                      <td>

                        <Link
                          to={`/students/${student.id}`}
                          className="btn btn-sm btn-outline-dark"
                        >
                          Detail
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </div>


        {/* ========================= */}
        {/* KOLOM KANAN */}
        {/* ========================= */}

        <div className="col-lg-4">

          <section className="risk-student-card">

            <div className="mb-3">

              <h5 className="fw-bold mb-1">
                Daftar Siswa Berisiko
              </h5>

              <small className="text-secondary">
                Siswa dengan status risiko tinggi
              </small>

            </div>


            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead>

                  <tr>
                    <th>NIS</th>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Presensi</th>
                    <th>Nilai</th>
                  </tr>

                </thead>


                <tbody>

                  {riskStudents.map((student) => (

                    <tr key={student.id}>

                      <td>
                        {student.nis}
                      </td>

                      <td>
                        <span className="fw-semibold">
                          {student.name}
                        </span>
                      </td>

                      <td>
                        {student.className}
                      </td>

                      <td>
                        {student.attendance}%
                      </td>

                      <td>
                        {student.score}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </div>

      </div>

    </section>

  </main>
);
}

export default StudentListPage;