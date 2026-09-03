import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/student-list-page.css";
import { getStudents } from "../services/api";


function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("Semua");
  const [riskFilter, setRiskFilter] = useState("Semua");


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getStudents();

        console.log("Students API:", result);
        console.log("HASIL RESULTS:", result.results);

        setStudents(result.results);
      } catch (error) {
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
        console.error("HEADERS:", error.response?.headers);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

  fetchStudents();
}, []);


const filteredStudents = students.filter((student) => {
  const matchesSearch =
    student.nama.toLowerCase().includes(search.toLowerCase()) ||
    student.nisn.includes(search);

  const matchesClass =
    classFilter === "Semua" ||
    student.kelas?.nama_kelas === classFilter;

  const matchesRisk =
    riskFilter === "Semua" ||
    student.status_risk === riskFilter;

  return matchesSearch && matchesClass && matchesRisk;
});

const riskStudents = students.filter(
  (student) => student.status_risk === "HIGH"
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

                <option value="HIGH">
                  Tinggi
                </option>

                <option value="MEDIUM">
                  Sedang
                </option>

                <option value="LOW">
                  Rendah
                </option>

                </select>

              </div>


              {/* Tambah Siswa */}
              <div className="col-lg-3">

                <Link
                  to="/tambah-siswa"
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
                    <th>NISN</th>
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
                        {student.nisn}
                      </td>

                      <td>
                        <span className="fw-semibold">
                          {student.nama}
                        </span>
                      </td>

                      <td>
                        {student.kelas?.nama_kelas}
                      </td>

                      <td>
                        {student.gender}
                      </td>

                      <td>
                        {student.attendance}%
                      </td>

                      <td>
                        {student.nilai}
                      </td>

                      <td>

                      <span
                        className={`badge risk-badge risk-${student.status_risk.toLowerCase()}`}
                      >
                        {student.status_risk === "HIGH"
                          ? "Tinggi"
                          : student.status_risk === "MEDIUM"
                          ? "Sedang"
                          : "Rendah"}
                      </span>

                      </td>

                      <td>

                        <Link
                          to={`/detail-siswa/${student.nisn}`}
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
                    <th>NISN</th>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Presensi</th>
                    <th>Nilai</th>
                  </tr>

                </thead>


                <tbody>

                  {riskStudents.map((student) => (

                    <tr key={student.nisn}>

                      <td>
                        {student.nisn}
                      </td>

                      <td>
                        <span className="fw-semibold">
                          {student.nama}
                        </span>
                      </td>

                      <td>
                        {student.kelas?.nama_kelas}
                      </td>

                      <td>
                        {student.presensi}%
                      </td>

                      <td>
                        {student.nilai}
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