import { Link } from "react-router-dom";
import { BsBuildingFill } from "react-icons/bs";

function SchoolSettingsCard({
  activeTahunAjaran,
  activeSemester,
}) {
  return (
    <section className="settings-card mb-4">
      <div className="mb-4">
        <h5 className="fw-bold mb-1">
          <BsBuildingFill className="me-2" />
          Pengaturan Sekolah
        </h5>

        <p className="text-secondary mb-0">
          Informasi tahun ajaran dan semester aktif.
        </p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label
            htmlFor="academic-year"
            className="form-label fw-semibold"
          >
            Tahun Ajaran Aktif
          </label>

          <input
            type="text"
            id="academic-year"
            className="form-control"
            value={
              activeTahunAjaran?.nama || "-"
            }
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label
            htmlFor="semester"
            className="form-label fw-semibold"
          >
            Semester Aktif
          </label>

          <input
            type="text"
            id="semester"
            className="form-control"
            value={
              activeSemester?.semester_ke
                ? `Semester ${activeSemester.semester_ke}`
                : "-"
            }
            readOnly
          />
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <Link
          to="/pengaturan-akademik"
          className="btn btn-outline-dark"
        >
          + Kelola Data Akademik
        </Link>
      </div>
    </section>
  );
}

export default SchoolSettingsCard;