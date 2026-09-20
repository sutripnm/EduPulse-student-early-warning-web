import { BsBarChartFill } from "react-icons/bs";

/**
 * Daftar field nilai yang ditampilkan pada tabel input nilai mingguan.
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
    step: "1",
    placeholder: "0-100",
  },
  {
    key: "assessment",
    label: "Tugas",
    hint: "Assessment",
    min: "0",
    max: "100",
    step: "1",
    placeholder: "0-100",
  },
  {
    key: "quiz2",
    label: "Quiz 2",
    hint: "Posttest",
    min: "0",
    max: "100",
    step: "1",
    placeholder: "0-100",
  },
];

/**
 * Mengambil nama kelas berdasarkan ID kelas yang sedang dipilih.
 */
function getSelectedClassName(scoreClass, kelasOptions) {
  if (!scoreClass) {
    return "Belum dipilih";
  }

  return (
    kelasOptions.find(
      (kelas) => String(kelas.id) === String(scoreClass)
    )?.nama_kelas || "-"
  );
}

/**
 * Mengambil nama mata pelajaran berdasarkan ID yang dipilih.
 */
function getSelectedSubjectName(subject, mapelOptions) {
  if (!subject) {
    return "Belum dipilih";
  }

  return (
    mapelOptions.find(
      (mapel) => String(mapel.id) === String(subject)
    )?.nama_mapel || "-"
  );
}

/**
 * Menampilkan form input nilai mingguan untuk seluruh siswa
 * dalam kelas yang dipilih.
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
  // Nama kelas yang sedang dipilih untuk ringkasan.
  const selectedKelasName = getSelectedClassName(
    scoreClass,
    kelasOptions
  );

  // Nama mata pelajaran yang sedang dipilih untuk ringkasan.
  const selectedMapelName = getSelectedSubjectName(
    subject,
    mapelOptions
  );

  return (
    <section className="input-data-card">
      {/* =================================================
          HEADER
          ================================================= */}
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

      {/* =================================================
          FILTER NILAI
          ================================================= */}
      <div className="row g-3 mb-4">
        {/* Kelas */}
        <div className="col-12">
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
            <option value="">Pilih kelas</option>

            {kelasOptions.map((kelas) => (
              <option
                key={kelas.id}
                value={kelas.id}
              >
                {kelas.nama_kelas}
              </option>
            ))}
          </select>
        </div>

        {/* Mata Pelajaran */}
        <div className="col-12">
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

        {/* Tanggal */}
        <div className="col-12">
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

      {/* =================================================
          RINGKASAN FILTER
          ================================================= */}
      <div className="selected-period-info mb-4">
        <div className="selected-period-item">
          <strong>Kelas</strong>
          <span>{selectedKelasName}</span>
        </div>

        <span className="selected-period-separator">|</span>

        <div className="selected-period-item">
          <strong>Mapel</strong>
          <span>{selectedMapelName}</span>
        </div>

        <span className="selected-period-separator">|</span>

        <div className="selected-period-item">
          <strong>Tanggal</strong>
          <span>{scoreDate || "Belum dipilih"}</span>
        </div>
      </div>

      {/* =================================================
          TABEL INPUT NILAI
          ================================================= */}
      <form onSubmit={onSubmit}>
        <div className="table-responsive input-table-wrapper">
          <table className="table align-middle score-table">
            <thead>
              <tr>
                <th className="score-number-column">
                  No
                </th>

                <th className="score-student-column">
                  Nama Siswa
                </th>

                {scoreFields.map((field) => (
                  <th
                    key={field.key}
                    className="score-value-column"
                  >
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
                    colSpan={scoreFields.length + 2}
                    className="text-center text-secondary py-4"
                  >
                    Silakan pilih kelas terlebih dahulu.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.nisn}>
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <span className="fw-semibold">
                        {student.nama ||
                          student.nama_siswa ||
                          "-"}
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
                          value={
                            scores[student.nisn]?.[field.key] ??
                            ""
                          }
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

        {/* Ringkasan jumlah data yang akan disimpan. */}
        <div className="score-summary">
          {students.length} siswa •{" "}
          {students.length * scoreFields.length} nilai yang akan
          disimpan
        </div>

        {/* Tombol submit */}
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          {loading
            ? "Menyimpan..."
            : "Simpan Data Nilai"}
        </button>
      </form>
    </section>
  );
}

export default ScoreSection;