import { Link } from "react-router-dom";

function SchoolSettingsCard({ school, onChange, onSubmit }) {
  return (
    <section className="settings-card mb-4">
      <div className="mb-4">
        <h5 className="fw-bold mb-1">🏫 Pengaturan Sekolah</h5>
        <p className="text-secondary mb-0">
          Kelola informasi sekolah dan pengaturan akademik.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="school-name" className="form-label fw-semibold">
              Nama Sekolah
            </label>
            <input
              type="text"
              id="school-name"
              name="name"
              className="form-control"
              value={school.name}
              onChange={onChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="academic-year" className="form-label fw-semibold">
              Tahun Ajaran
            </label>
            <input
              type="text"
              id="academic-year"
              name="academicYear"
              className="form-control"
              value={school.academicYear}
              onChange={onChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="semester" className="form-label fw-semibold">
              Semester
            </label>
            <input
              type="text"
              id="semester"
              name="semester"
              className="form-control"
              value={school.semester}
              readOnly
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            Simpan Pengaturan
          </button>

          <Link to="/pengaturan-akademik" className="btn btn-outline-dark">
            + Kelola Data Akademik
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SchoolSettingsCard;
