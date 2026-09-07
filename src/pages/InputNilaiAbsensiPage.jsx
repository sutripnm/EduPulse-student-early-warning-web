import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/input-nilai-dan-absensi.css";

const studentsDummy = [
  {
    nisn: "1000000001",
    nama: "Ahmad Rizky",
  },
  {
    nisn: "1000000002",
    nama: "Siti Aisyah",
  },
  {
    nisn: "1000000003",
    nama: "Budi Santoso",
  },
  {
    nisn: "1000000004",
    nama: "Citra Putri",
  },
  {
    nisn: "1000000005",
    nama: "Dina Lestari",
  },
];


const createInitialScores = () => {
  const data = {};

  studentsDummy.forEach((student) => {
    data[student.nisn] = {
      studyTime: "",
      quiz1: "",
      assessment: "",
      quiz2: "",
    };
  });

  return data;
};

function InputNilaiAbsensiPage() {
  const [attendanceClass, setAttendanceClass] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [attendance, setAttendance] = useState({});

  const [scoreClass, setScoreClass] = useState("");
  const [subject, setSubject] = useState("");
  const [week, setWeek] = useState("1");
  const [scoreDate, setScoreDate] = useState("");
  const [scores, setScores] = useState(
    createInitialScores()
  );

  const handleAttendanceChange = (
    nisn,
    date,
    status
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [nisn]: {
        ...prev[nisn],
        [date]: status,
      },
    }));
  };

  const handleAttendanceSubmit = (event) => {
    event.preventDefault();

    const attendanceData = [];

    studentsDummy.forEach((student) => {
      attendanceDates.forEach((date) => {
        attendanceData.push({
          nisn: student.nisn,
          nama: student.nama,
          tanggal: date,
          status:
            attendance[student.nisn]?.[date] ||
            "HADIR",
        });
      });
    });

    console.log("=== DATA ABSENSI ===");

    console.log({
      kelas: attendanceClass,
      tanggal_mulai: startDate,
      tanggal_akhir: endDate,
      data: attendanceData,
    });
  };

  const handleScoreChange = (
    nisn,
    field,
    value
  ) => {
    setScores((prev) => ({
      ...prev,
      [nisn]: {
        ...prev[nisn],
        [field]: value,
      },
    }));
  };

  const handleScoreSubmit = (event) => {
    event.preventDefault();

    const scoreData = studentsDummy.map((student) => ({
      nisn: student.nisn,
      nama: student.nama,
      study_time: scores[student.nisn].studyTime,
      quiz_1: scores[student.nisn].quiz1,
      assessment: scores[student.nisn].assessment,
      quiz_2: scores[student.nisn].quiz2,
    }));

    console.log("=== DATA NILAI MINGGUAN ===");

    console.log({
      kelas: scoreClass,
      mapel: subject,
      minggu: week,
      tanggal: scoreDate,
      data: scoreData,
    });
  };

  // =========================
// FUNGSI TANGGAL
// =========================
const getDayName = (date) => {
  if (!date) return "";

  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  return days[
    new Date(`${date}T00:00:00`).getDay()
  ];
};

const getDateRange = (start, end) => {
  if (!start || !end) return [];

  const dates = [];

  const current = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);

  while (current <= last) {
    dates.push(
      current.toISOString().split("T")[0]
    );

    current.setDate(
      current.getDate() + 1
    );
  }

  return dates;
};

const attendanceDates = getDateRange(
  startDate,
  endDate
);


// =========================
// RINGKASAN ABSENSI
// =========================
const attendanceSummary = useMemo(() => {
  const summary = {
    HADIR: 0,
    IZIN: 0,
    SAKIT: 0,
    ALPHA: 0,
  };

  if (attendanceDates.length === 0) {
    return summary;
  }

  studentsDummy.forEach((student) => {
    attendanceDates.forEach((date) => {
      const status =
        attendance[student.nisn]?.[date];

      if (status) {
        summary[status] += 1;
      }
    });
  });

  return summary;
}, [attendance, startDate, endDate]);

  return (
    <main className="input-nilai-page d-flex">

      <Sidebar />

      <section className="input-nilai-main flex-grow-1">

        <div className="input-nilai-container">

          {/* =========================
              HEADER
          ========================== */}
          <header className="input-page-header mb-4">

            <p className="text-secondary mb-1">
              Academic Management
            </p>

            <h1 className="h3 fw-bold mb-1">
              Input Nilai dan Absensi Siswa
            </h1>

            <p className="text-secondary mb-0">
              Input data absensi mingguan dan nilai
              pembelajaran siswa.
            </p>

          </header>


          {/* ==================================================
              ABSENSI
          ================================================== */}
          <section className="input-data-card mb-4">

            <div className="input-section-header">

              <div>

                <h5 className="fw-bold mb-1">
                  📋 Input Absensi
                </h5>

                <p className="text-secondary mb-0">
                  Input kehadiran siswa berdasarkan tanggal yang dipilih.
                </p>

              </div>

            </div>


            {/* FILTER ABSENSI */}
            <div className="row g-3 mb-4">

              {/* Kelas */}
              <div className="col-md-4">

                <label
                  htmlFor="attendance-class"
                  className="form-label fw-semibold"
                >
                  Kelas
                </label>

                <select
                  id="attendance-class"
                  className="form-select"
                  value={attendanceClass}
                  onChange={(event) =>
                    setAttendanceClass(event.target.value)
                  }
                >

                  <option value="">
                    Pilih kelas
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


              {/* Tanggal Mulai */}
              <div className="col-md-4">

                <label
                  htmlFor="start-date"
                  className="form-label fw-semibold"
                >
                  Tanggal Mulai
                </label>

                <input
                  type="date"
                  id="start-date"
                  className="form-control"
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                />

              </div>


              {/* Tanggal Akhir */}
              <div className="col-md-4">

                <label
                  htmlFor="end-date"
                  className="form-label fw-semibold"
                >
                  Tanggal Akhir
                </label>

                <input
                  type="date"
                  id="end-date"
                  className="form-control"
                  value={endDate}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                />

              </div>

            </div>


            <div className="selected-period-info mb-4">

              <strong>
                Periode:
              </strong>{" "}

              {startDate || "Belum dipilih"}

              <span className="mx-2">
                sampai
              </span>

              {endDate || "Belum dipilih"}

            </div>


            {/* TABEL ABSENSI */}
            <form onSubmit={handleAttendanceSubmit}>

              <div className="table-responsive">

                <table className="table align-middle attendance-table">

                  <thead>

                    <tr>

                      <th
                        style={{
                          width: "60px",
                        }}
                      >
                        No
                      </th>

                      <th
                        style={{
                          minWidth: "220px",
                        }}
                      >
                        Nama Siswa
                      </th>

                      {attendanceDates.map((date) => (
                        <th
                          key={date}
                          className="text-center"
                          style={{
                            minWidth: "140px",
                          }}
                        >
                          {getDayName(date)}
                        </th>
                      ))}

                    </tr>

                  </thead>


                  <tbody>

                    {studentsDummy.map(
                      (student, index) => (

                        <tr key={student.nisn}>

                          <td>
                            {index + 1}
                          </td>

                          <td>
                            <span className="fw-semibold">
                              {student.nama}
                            </span>

                            <small className="d-block text-secondary">
                              {student.nisn}
                            </small>
                          </td>


                          {attendanceDates.map((date) => (

                            <td
                              key={date}
                              className="text-center"
                            >

                              <select
                                className={`form-select attendance-select ${
                                  attendance[student.nisn]?.[date]
                                    ? `status-${
                                        attendance[student.nisn][date].toLowerCase()
                                      }`
                                    : ""
                                }`}
                                value={
                                  attendance[student.nisn]?.[date] ||
                                  "HADIR"
                                }
                                onChange={(event) =>
                                  handleAttendanceChange(
                                    student.nisn,
                                    date,
                                    event.target.value
                                  )
                                }
                              >

                                <option value="HADIR">
                                  Hadir
                                </option>

                                <option value="IZIN">
                                  Izin
                                </option>

                                <option value="SAKIT">
                                  Sakit
                                </option>

                                <option value="ALPHA">
                                  Alpha
                                </option>

                              </select>

                            </td>

                          ))}

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>


              {/* SUMMARY */}
              <div className="attendance-summary">

                <span>
                  Hadir:{" "}
                  <strong>
                    {attendanceSummary.HADIR}
                  </strong>
                </span>

                <span>
                  Izin:{" "}
                  <strong>
                    {attendanceSummary.IZIN}
                  </strong>
                </span>

                <span>
                  Sakit:{" "}
                  <strong>
                    {attendanceSummary.SAKIT}
                  </strong>
                </span>

                <span>
                  Alpha:{" "}
                  <strong>
                    {attendanceSummary.ALPHA}
                  </strong>
                </span>

              </div>


              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                Simpan Absensi
              </button>

            </form>

          </section>


          {/* ==================================================
              NILAI MINGGUAN
          ================================================== */}
          <section className="input-data-card">

            <div className="input-section-header">

              <div>

                <h5 className="fw-bold mb-1">
                  📊 Input Nilai Mingguan
                </h5>

                <p className="text-secondary mb-0">
                  Satu input untuk satu minggu dan
                  seluruh siswa dalam kelas.
                </p>

              </div>

            </div>


            {/* FILTER NILAI */}
            <div className="row g-3 mb-4">

              {/* Kelas */}
              <div className="col-md-3">

                <label
                  htmlFor="score-class"
                  className="form-label fw-semibold"
                >
                  Kelas
                </label>

                <select
                  id="score-class"
                  className="form-select"
                  value={scoreClass}
                  onChange={(event) =>
                    setScoreClass(event.target.value)
                  }
                >

                  <option value="">
                    Pilih kelas
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


              {/* Mapel */}
              <div className="col-md-3">

                <label
                  htmlFor="subject"
                  className="form-label fw-semibold"
                >
                  Mata Pelajaran
                </label>

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


              {/* Minggu */}
              <div className="col-md-3">

                <label
                  htmlFor="week"
                  className="form-label fw-semibold"
                >
                  Minggu
                </label>

                <select
                  id="week"
                  className="form-select"
                  value={week}
                  onChange={(event) =>
                    setWeek(event.target.value)
                  }
                >

                  <option value="1">
                    Minggu 1
                  </option>

                  <option value="2">
                    Minggu 2
                  </option>

                  <option value="3">
                    Minggu 3
                  </option>

                  <option value="4">
                    Minggu 4
                  </option>

                  <option value="5">
                    Minggu 5
                  </option>

                </select>

              </div>


              {/* Tanggal */}
              <div className="col-md-3">

                <label
                  htmlFor="score-date"
                  className="form-label fw-semibold"
                >
                  Tanggal Input
                </label>

                <input
                  type="date"
                  id="score-date"
                  className="form-control"
                  value={scoreDate}
                  onChange={(event) =>
                    setScoreDate(event.target.value)
                  }
                />

              </div>

            </div>


            <div className="selected-period-info mb-4">

              <strong>
                Kelas:
              </strong>{" "}

              {scoreClass || "Belum dipilih"}

              <span className="mx-2">
                |
              </span>

              <strong>
                Mapel:
              </strong>{" "}

              {subject || "Belum dipilih"}

              <span className="mx-2">
                |
              </span>

              <strong>
                Minggu:
              </strong>{" "}

              {week}

            </div>


            {/* TABEL NILAI */}
            <form onSubmit={handleScoreSubmit}>

              <div className="table-responsive">

                <table className="table align-middle score-table">

                  <thead>

                    <tr>

                      <th
                        style={{
                          width: "60px",
                        }}
                      >
                        No
                      </th>

                      <th
                        style={{
                          minWidth: "220px",
                        }}
                      >
                        Nama Siswa
                      </th>

                      <th
                        style={{
                          minWidth: "150px",
                        }}
                      >
                        Study Time
                        <small>
                          Jam
                        </small>
                      </th>

                      <th
                        style={{
                          minWidth: "140px",
                        }}
                      >
                        Quiz 1
                        <small>
                          Pretest
                        </small>
                      </th>

                      <th
                        style={{
                          minWidth: "160px",
                        }}
                      >
                        Tugas
                        <small>
                          Assessment
                        </small>
                      </th>

                      <th
                        style={{
                          minWidth: "140px",
                        }}
                      >
                        Quiz 2
                        <small>
                          Posttest
                        </small>
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {studentsDummy.map(
                      (student, index) => (

                        <tr key={student.nisn}>

                          <td>
                            {index + 1}
                          </td>

                          <td>
                            <span className="fw-semibold">
                              {student.nama}
                            </span>

                            <small className="d-block text-secondary">
                              {student.nisn}
                            </small>
                          </td>


                          {/* Study Time */}
                          <td>

                            <input
                              type="number"
                              className="form-control score-input"
                              min="0"
                              step="0.5"
                              placeholder="Jam"
                              value={
                                scores[
                                  student.nisn
                                ].studyTime
                              }
                              onChange={(event) =>
                                handleScoreChange(
                                  student.nisn,
                                  "studyTime",
                                  event.target.value
                                )
                              }
                            />

                          </td>


                          {/* Quiz 1 */}
                          <td>

                            <input
                              type="number"
                              className="form-control score-input"
                              min="0"
                              max="100"
                              placeholder="0-100"
                              value={
                                scores[
                                  student.nisn
                                ].quiz1
                              }
                              onChange={(event) =>
                                handleScoreChange(
                                  student.nisn,
                                  "quiz1",
                                  event.target.value
                                )
                              }
                            />

                          </td>


                          {/* Assessment */}
                          <td>

                            <input
                              type="number"
                              className="form-control score-input"
                              min="0"
                              max="100"
                              placeholder="0-100"
                              value={
                                scores[
                                  student.nisn
                                ].assessment
                              }
                              onChange={(event) =>
                                handleScoreChange(
                                  student.nisn,
                                  "assessment",
                                  event.target.value
                                )
                              }
                            />

                          </td>


                          {/* Quiz 2 */}
                          <td>

                            <input
                              type="number"
                              className="form-control score-input"
                              min="0"
                              max="100"
                              placeholder="0-100"
                              value={
                                scores[
                                  student.nisn
                                ].quiz2
                              }
                              onChange={(event) =>
                                handleScoreChange(
                                  student.nisn,
                                  "quiz2",
                                  event.target.value
                                )
                              }
                            />

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>


              <div className="score-summary">

                {studentsDummy.length} siswa •{" "}
                {studentsDummy.length * 4} nilai yang
                akan disimpan

              </div>


              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                Simpan Data Minggu Ini
              </button>

            </form>

          </section>

        </div>

      </section>

    </main>
  );
}

export default InputNilaiAbsensiPage;