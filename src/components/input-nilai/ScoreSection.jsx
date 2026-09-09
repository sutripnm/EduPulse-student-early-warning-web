import studentsDummy from "../../data/studentsDummy";
import classOptions from "../../data/classOptions";

const subjectOptions = [
  "Matematika",
  "Fisika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
];

const scoreFields = [
  { key: "studyTime", label: "Study Time", hint: "Jam", min: "0", step: "0.5", placeholder: "Jam" },
  { key: "quiz1", label: "Quiz 1", hint: "Pretest", min: "0", max: "100", placeholder: "0-100" },
  { key: "assessment", label: "Tugas", hint: "Assessment", min: "0", max: "100", placeholder: "0-100" },
  { key: "quiz2", label: "Quiz 2", hint: "Posttest", min: "0", max: "100", placeholder: "0-100" },
];

function ScoreSection({
  scoreClass,
  setScoreClass,
  subject,
  setSubject,
  week,
  setWeek,
  scoreDate,
  setScoreDate,
  scores,
  onScoreChange,
  onSubmit,
}) {
  return (
    <section className="input-data-card">
      <div className="input-section-header">
        <div>
          <h5 className="fw-bold mb-1">📊 Input Nilai Mingguan</h5>
          <p className="text-secondary mb-0">
            Satu input untuk satu minggu dan seluruh siswa dalam kelas.
          </p>
        </div>
      </div>

      {/* FILTER NILAI */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <label htmlFor="score-class" className="form-label fw-semibold">
            Kelas
          </label>
          <select
            id="score-class"
            className="form-select"
            value={scoreClass}
            onChange={(event) => setScoreClass(event.target.value)}
          >
            <option value="">Pilih kelas</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="subject" className="form-label fw-semibold">
            Mata Pelajaran
          </label>
          <select
            id="subject"
            className="form-select"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          >
            <option value="">Pilih mata pelajaran</option>
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="week" className="form-label fw-semibold">
            Minggu
          </label>
          <select
            id="week"
            className="form-select"
            value={week}
            onChange={(event) => setWeek(event.target.value)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={String(num)}>
                Minggu {num}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="score-date" className="form-label fw-semibold">
            Tanggal Input
          </label>
          <input
            type="date"
            id="score-date"
            className="form-control"
            value={scoreDate}
            onChange={(event) => setScoreDate(event.target.value)}
          />
        </div>
      </div>

      <div className="selected-period-info mb-4">
        <strong>Kelas:</strong> {scoreClass || "Belum dipilih"}
        <span className="mx-2">|</span>
        <strong>Mapel:</strong> {subject || "Belum dipilih"}
        <span className="mx-2">|</span>
        <strong>Minggu:</strong> {week}
      </div>

      {/* TABEL NILAI */}
      <form onSubmit={onSubmit}>
        <div className="table-responsive">
          <table className="table align-middle score-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>No</th>
                <th style={{ minWidth: "220px" }}>Nama Siswa</th>
                {scoreFields.map((field) => (
                  <th key={field.key} style={{ minWidth: "140px" }}>
                    {field.label}
                    <small>{field.hint}</small>
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

                  {scoreFields.map((field) => (
                    <td key={field.key}>
                      <input
                        type="number"
                        className="form-control score-input"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        placeholder={field.placeholder}
                        value={scores[student.nisn][field.key]}
                        onChange={(event) =>
                          onScoreChange(student.nisn, field.key, event.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="score-summary">
          {studentsDummy.length} siswa • {studentsDummy.length * 4} nilai yang
          akan disimpan
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Simpan Data Minggu Ini
        </button>
      </form>
    </section>
  );
}

export default ScoreSection;
