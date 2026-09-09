function RiskSettingsCard({ risk, onChange, onSubmit }) {
  return (
    <section className="settings-card mb-4">
      <div className="mb-4">
        <h5 className="fw-bold mb-1">⚠️ Pengaturan Risiko</h5>
        <p className="text-secondary mb-0">
          Atur batas indikator yang digunakan untuk analisis risiko siswa.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="attendance" className="form-label fw-semibold">
              Absensi
            </label>
            <div className="input-group">
              <input
                type="number"
                id="attendance"
                name="attendance"
                className="form-control"
                min="0"
                max="100"
                value={risk.attendance}
                onChange={onChange}
              />
              <span className="input-group-text">%</span>
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="study-time" className="form-label fw-semibold">
              Study Time
            </label>
            <div className="input-group">
              <input
                type="number"
                id="study-time"
                name="studyTime"
                className="form-control"
                min="0"
                step="0.5"
                value={risk.studyTime}
                onChange={onChange}
              />
              <span className="input-group-text">jam</span>
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="quiz-1" className="form-label fw-semibold">
              Quiz 1 / Pretest
            </label>
            <input
              type="number"
              id="quiz-1"
              name="quiz1"
              className="form-control"
              min="0"
              max="100"
              value={risk.quiz1}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="assessment" className="form-label fw-semibold">
              Tugas / Assessment
            </label>
            <input
              type="number"
              id="assessment"
              name="assessment"
              className="form-control"
              min="0"
              max="100"
              value={risk.assessment}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="quiz-2" className="form-label fw-semibold">
              Quiz 2 / Posttest
            </label>
            <input
              type="number"
              id="quiz-2"
              name="quiz2"
              className="form-control"
              min="0"
              max="100"
              value={risk.quiz2}
              onChange={onChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Simpan Pengaturan Risiko
        </button>
      </form>
    </section>
  );
}

export default RiskSettingsCard;
