import studentsDummy from "../../data/studentsDummy";
import classOptions from "../../data/classOptions";
import { getDayName } from "../../utils/date";

function AttendanceSection({
  attendanceClass,
  setAttendanceClass,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  attendance,
  attendanceDates,
  attendanceSummary,
  onAttendanceChange,
  onSubmit,
}) {
  return (
    <section className="input-data-card mb-4">
      <div className="input-section-header">
        <div>
          <h5 className="fw-bold mb-1">📋 Input Absensi</h5>
          <p className="text-secondary mb-0">
            Input kehadiran siswa berdasarkan tanggal yang dipilih.
          </p>
        </div>
      </div>

      {/* FILTER ABSENSI */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="attendance-class" className="form-label fw-semibold">
            Kelas
          </label>
          <select
            id="attendance-class"
            className="form-select"
            value={attendanceClass}
            onChange={(event) => setAttendanceClass(event.target.value)}
          >
            <option value="">Pilih kelas</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="start-date" className="form-label fw-semibold">
            Tanggal Mulai
          </label>
          <input
            type="date"
            id="start-date"
            className="form-control"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="end-date" className="form-label fw-semibold">
            Tanggal Akhir
          </label>
          <input
            type="date"
            id="end-date"
            className="form-control"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
      </div>

      <div className="selected-period-info mb-4">
        <strong>Periode:</strong> {startDate || "Belum dipilih"}
        <span className="mx-2">sampai</span>
        {endDate || "Belum dipilih"}
      </div>

      {/* TABEL ABSENSI */}
      <form onSubmit={onSubmit}>
        <div className="table-responsive">
          <table className="table align-middle attendance-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>No</th>
                <th style={{ minWidth: "220px" }}>Nama Siswa</th>
                {attendanceDates.map((date) => (
                  <th key={date} className="text-center" style={{ minWidth: "140px" }}>
                    {getDayName(date)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {studentsDummy.map((student, index) => (
                <tr key={student.nisn}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="fw-semibold">{student.nama}</span>
                    <small className="d-block text-secondary">
                      {student.nisn}
                    </small>
                  </td>

                  {attendanceDates.map((date) => (
                    <td key={date} className="text-center">
                      <select
                        className={`form-select attendance-select ${
                          attendance[student.nisn]?.[date]
                            ? `status-${attendance[student.nisn][date].toLowerCase()}`
                            : ""
                        }`}
                        value={attendance[student.nisn]?.[date] || "HADIR"}
                        onChange={(event) =>
                          onAttendanceChange(student.nisn, date, event.target.value)
                        }
                      >
                        <option value="HADIR">Hadir</option>
                        <option value="IZIN">Izin</option>
                        <option value="SAKIT">Sakit</option>
                        <option value="ALPHA">Alpha</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="attendance-summary">
          <span>
            Hadir: <strong>{attendanceSummary.HADIR}</strong>
          </span>
          <span>
            Izin: <strong>{attendanceSummary.IZIN}</strong>
          </span>
          <span>
            Sakit: <strong>{attendanceSummary.SAKIT}</strong>
          </span>
          <span>
            Alpha: <strong>{attendanceSummary.ALPHA}</strong>
          </span>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Simpan Absensi
        </button>
      </form>
    </section>
  );
}

export default AttendanceSection;
