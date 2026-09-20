import { BsBarChartFill } from "react-icons/bs";

/**
 * Definisi field nilai yang ditampilkan pada tabel input mingguan.
 */
const scoreFields = [
  {
    key: "studyTime",
    label: "Study Time",
    hint: "Jam",
    min: "0",
    step: "0.5",
    placeholder: "Jam",
  },
  {
    key: "quiz1",
    label: "Quiz 1",
    hint: "Pretest",
    min: "0",
    max: "100",
    placeholder: "0-100",
  },
  {
    key: "assessment",
    label: "Tugas",
    hint: "Assessment",
    min: "0",
    max: "100",
    placeholder: "0-100",
  },
  {
    key: "quiz2",
    label: "Quiz 2",
    hint: "Posttest",
    min: "0",
    max: "100",
    placeholder: "0-100",
  },
];

/**
 * Menampilkan form input nilai mingguan berdasarkan data dari hook.
 */
function ScoreSection({
  scoreClass,
  setScoreClass,
  kelasOptions,
  subject,
  setSubject,
  mapelOptions,
  scoreDate,
  setScoreDate,
  students,
  scores,
  onScoreChange,
  onSubmit,
  loading,
}) {
  const selectedKelasName = scoreClass
    ? kelasOptions.find(
        (kelas) => String(kelas.id) === String(scoreClass)
      )?.nama_kelas || "-"
    : "Belum dipilih";

  const selectedMapelName = subject
    ? mapelOptions.find(
        (mapel) => String(mapel.id) === String(subject)
      )?.nama_mapel || "-"
    : "Belum dipilih";

  return (
    <section className="input-data-card">
      <div className="input-section-header">
        <div>
          <h5 className="fw-bold mb-1">
            <BsBarChartFill className="me-2" />
            Input Nilai Mingguan
          </h5>

          <p className="text-secondary mb-0">
            Satu input untuk satu minggu dan seluruh siswa dalam kelas.
          </p>
        </div>
      </div>

      {/* Filter nilai. */}
      <div className="row g-3 mb-4">
        <div className="col-12">
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

            {kelasOptions.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.nama_kelas}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
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

            {mapelOptions.map((mapel) => (
              <option key={mapel.id} value={mapel.id}>
                {mapel.nama_mapel}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
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

      {/* Ringkasan periode yang sedang dipilih. */}
      <div className="selected-period-info mb-4">
        <strong>Kelas:</strong> {selectedKelasName}
        <span className="mx-2">|</span>
        <strong>Mapel:</strong> {selectedMapelName}
        <span className="mx-2">|</span>
        <strong>Tanggal:</strong> {scoreDate || "Belum dipilih"}
      </div>

      {/* Tabel input nilai per siswa. */}
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
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-secondary py-4"
                  >
                    Silakan pilih kelas terlebih dahulu.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.nisn}>
                    <td>{index + 1}</td>

                    <td>
                      <span className="fw-semibold">
                        {student.nama || student.nama_siswa || "-"}
                      </span>

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
                          value={scores[student.nisn]?.[field.key] || ""}
                          onChange={(event) =>
                            onScoreChange(
                              student.nisn,
                              field.key,
                              event.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="score-summary">
          {students.length} siswa • {students.length * 4} nilai yang akan
          disimpan
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Data Nilai"}
        </button>
      </form>
    </section>
  );
}

export default ScoreSection;
