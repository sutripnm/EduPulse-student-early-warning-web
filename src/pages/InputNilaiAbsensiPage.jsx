import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/input-nilai-dan-absensi.css";

function InputNilaiAbsensiPage() {
  const [subject, setSubject] = useState("");

  const [nilai, setNilai] = useState({
    attendance: "",
    taskScore: "",
    studyTime: "",
    quizScore: "",
  });

  const [attendance, setAttendance] = useState({
    student: "",
    date: "",
    status: "Hadir",
  });

  const handleNilaiChange = (event) => {
    const { name, value } = event.target;

    setNilai({
      ...nilai,
      [name]: value,
    });
  };

  const handleAttendanceChange = (event) => {
    const { name, value } = event.target;

    setAttendance({
      ...attendance,
      [name]: value,
    });
  };

  const handleNilaiSubmit = (event) => {
    event.preventDefault();

    console.log("Data nilai:", {
      subject,
      ...nilai,
    });
  };

  const handleAttendanceSubmit = (event) => {
    event.preventDefault();

    console.log("Data absensi:", attendance);
  };

  return (
    <main className="input-nilai-page d-flex">

      <Sidebar />

      <section className="input-nilai-main flex-grow-1">

        <div className="input-nilai-container">

          {/* Header */}
          <h1 className="h4 fw-semibold text-center mb-4">
            Input Nilai dan Absensi Siswa
          </h1>

          {/* Filter Mapel */}
          <div className="input-subject-filter mb-4">

            <select
              id="subject"
              className="form-select"
              value={subject}
              onChange={(event) =>
                setSubject(event.target.value)
              }
            >
              <option value="">
                Pilih mata pelajaran
              </option>

              <option value="Matematika">
                Matematika
              </option>

              <option value="Fisika">
                Fisika
              </option>

              <option value="Bahasa Indonesia">
                Bahasa Indonesia
              </option>

              <option value="Bahasa Inggris">
                Bahasa Inggris
              </option>
            </select>

          </div>


          {/* Dua Form */}
          <div className="row g-4">

            {/* ========================= */}
            {/* FORM NILAI */}
            {/* ========================= */}

            <div className="col-lg-6">

              <section className="input-form-card">

                <h5 className="fw-semibold mb-4">
                  Input Nilai
                </h5>

                <form onSubmit={handleNilaiSubmit}>

                  {/* Absensi */}
                  <div className="mb-3">

                    <label
                      htmlFor="attendance"
                      className="form-label"
                    >
                      Absensi
                    </label>

                    <input
                      type="number"
                      id="attendance"
                      name="attendance"
                      className="form-control"
                      min="0"
                      max="100"
                      value={nilai.attendance}
                      onChange={handleNilaiChange}
                      placeholder="Contoh: 85"
                    />

                  </div>


                  {/* Nilai Tugas */}
                  <div className="mb-3">

                    <label
                      htmlFor="taskScore"
                      className="form-label"
                    >
                      Nilai Tugas
                    </label>

                    <input
                      type="number"
                      id="taskScore"
                      name="taskScore"
                      className="form-control"
                      min="0"
                      max="100"
                      value={nilai.taskScore}
                      onChange={handleNilaiChange}
                      placeholder="Contoh: 80"
                    />

                  </div>


                  {/* Study Time */}
                  <div className="mb-3">

                    <label
                      htmlFor="studyTime"
                      className="form-label"
                    >
                      Study Time
                    </label>

                    <input
                      type="number"
                      id="studyTime"
                      name="studyTime"
                      className="form-control"
                      min="0"
                      step="0.5"
                      value={nilai.studyTime}
                      onChange={handleNilaiChange}
                      placeholder="Contoh: 5 jam"
                    />

                  </div>


                  {/* Nilai Quiz */}
                  <div className="mb-4">

                    <label
                      htmlFor="quizScore"
                      className="form-label"
                    >
                      Nilai Quiz
                    </label>

                    <input
                      type="number"
                      id="quizScore"
                      name="quizScore"
                      className="form-control"
                      min="0"
                      max="100"
                      value={nilai.quizScore}
                      onChange={handleNilaiChange}
                      placeholder="Contoh: 75"
                    />

                  </div>


                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Submit
                  </button>

                </form>

              </section>

            </div>


            {/* ========================= */}
            {/* FORM ABSENSI */}
            {/* ========================= */}

            <div className="col-lg-6">

              <section className="attendance-form-card">

                <h5 className="fw-semibold mb-4">
                  Form Absensi Siswa
                </h5>

                <form onSubmit={handleAttendanceSubmit}>

                  {/* Siswa */}
                  <div className="mb-3">

                    <label
                      htmlFor="student"
                      className="form-label"
                    >
                      Checklist Daftar Siswa
                    </label>

                    <select
                      id="student"
                      name="student"
                      className="form-select"
                      value={attendance.student}
                      onChange={handleAttendanceChange}
                    >
                      <option value="">
                        Pilih siswa
                      </option>

                      <option value="1">
                        Ahmad Rizky
                      </option>

                      <option value="2">
                        Siti Aisyah
                      </option>

                      <option value="3">
                        Budi Santoso
                      </option>

                      <option value="4">
                        Citra Putri
                      </option>
                    </select>

                  </div>


                  {/* Tanggal */}
                  <div className="mb-3">

                    <label
                      htmlFor="date"
                      className="form-label"
                    >
                      Tanggal Sekarang
                    </label>

                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={attendance.date}
                      onChange={handleAttendanceChange}
                    />

                  </div>


                  {/* Status */}
                  <div className="mb-4">

                    <label
                      htmlFor="status"
                      className="form-label"
                    >
                      Status
                    </label>

                    <select
                      id="status"
                      name="status"
                      className="form-select"
                      value={attendance.status}
                      onChange={handleAttendanceChange}
                    >
                      <option value="Hadir">
                        Hadir
                      </option>

                      <option value="Izin">
                        Izin
                      </option>

                      <option value="Sakit">
                        Sakit
                      </option>

                      <option value="Alpha">
                        Alpha
                      </option>
                    </select>

                  </div>


                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Submit
                  </button>

                </form>

              </section>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default InputNilaiAbsensiPage;