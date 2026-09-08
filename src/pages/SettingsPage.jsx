import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/settings-page.css";
import { Link } from "react-router-dom";

function SettingsPage() {
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);

  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");

  // =========================
  // PROFIL PENGGUNA
  // =========================
  const [profile, setProfile] = useState({
    name: "Agus Guru",
    email: "agus@sekolah.sch.id",
    role: "Guru",
  });

  // =========================
  // PENGATURAN SEKOLAH
  // =========================
  const [school, setSchool] = useState({
    name: "SMA EduPulse",
    academicYear: "2026/2027",
    subject: "Matematika",
    className: "XI IPA 1",
    semester: "Ganjil",
  });

  // =========================
  // PENGATURAN RISIKO
  // =========================
  const [risk, setRisk] = useState({
    attendance: 70,
    studyTime: 5,
    quiz1: 70,
    assessment: 70,
    quiz2: 70,
  });

  // =========================
  // TAMPILAN
  // =========================
  const [theme, setTheme] = useState("light");

  // =========================
  // HANDLER
  // ==========================
  const handleSchoolChange = (event) => {
    const { name, value } = event.target;

    setSchool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRiskChange = (event) => {
    const { name, value } = event.target;

    setRisk((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSchoolSubmit = (event) => {
    event.preventDefault();
    console.log("Sekolah:", school);
  };

  const handleRiskSubmit = (event) => {
    event.preventDefault();
    console.log("Risiko:", risk);
  };

  return (
    <main className="settings-page d-flex">

      <Sidebar />

      <section className="settings-main flex-grow-1 p-4">

        {/* =========================
            HEADER
        ========================== */}
        <header className="mb-4">

          <p className="text-secondary mb-1">
            System Management
          </p>

          <h1 className="h3 fw-bold mb-1">
            Pengaturan
          </h1>

          <p className="text-secondary mb-0">
            Kelola akun, sekolah, risiko, dan tampilan EduPulse.
          </p>

        </header>


        <div className="settings-container">

          {/* =========================
              1. PROFIL PENGGUNA
          ========================== */}
          <section className="settings-card mb-4">

            <div className="mb-4">

              <h5 className="fw-bold mb-1">
                👤 Profil Pengguna
              </h5>

              <p className="text-secondary mb-0">
                Informasi akun pengguna yang sedang login.
              </p>

            </div>

              <div className="row g-3">

                {/* Nama */}
                <div className="col-md-6">

                  <label
                    htmlFor="profile-name"
                    className="form-label fw-semibold"
                  >
                    Nama
                  </label>

                  <input
                    type="text"
                    id="profile-name"
                    className="form-control"
                    value={profile.name}
                    readOnly
                  />

                </div>


                {/* Email */}
                <div className="col-md-6">

                  <label
                    htmlFor="profile-email"
                    className="form-label fw-semibold"
                  >
                    Email
                  </label>

                 <input
                    type="email"
                    id="profile-email"
                    className="form-control"
                    value={profile.email}
                    readOnly
                  />

                </div>


                {/* Role */}
                <div className="col-md-6">

                  <label
                    htmlFor="profile-role"
                    className="form-label fw-semibold"
                  >
                    Role
                  </label>

                  <input
                    type="text"
                    id="profile-role"
                    className="form-control"
                    value={profile.role}
                    readOnly
                  />

                </div>

              </div>
          </section>


          {/* =========================
              2. PENGATURAN SEKOLAH
          ========================== */}
          <section className="settings-card mb-4">

            <div className="mb-4">

              <h5 className="fw-bold mb-1">
                🏫 Pengaturan Sekolah
              </h5>

              <p className="text-secondary mb-0">
                Kelola informasi sekolah dan pengaturan akademik.
              </p>

            </div>

            <form onSubmit={handleSchoolSubmit}>

<div className="row g-3">

  {/* Nama Sekolah */}
  <div className="col-md-6">

    <label
      htmlFor="school-name"
      className="form-label fw-semibold"
    >
      Nama Sekolah
    </label>

    <input
      type="text"
      id="school-name"
      name="name"
      className="form-control"
      value={school.name}
      onChange={handleSchoolChange}
    />

  </div>


  {/* Tahun Ajaran */}
  <div className="col-md-6">

    <label
      htmlFor="academic-year"
      className="form-label fw-semibold"
    >
      Tahun Ajaran
    </label>

    <input
      type="text"
      id="academic-year"
      name="academicYear"
      className="form-control"
      value={school.academicYear}
      onChange={handleSchoolChange}
    />

  </div>


  {/* Semester */}
  <div className="col-md-6">

    <label
      htmlFor="semester"
      className="form-label fw-semibold"
    >
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

  <button
    type="submit"
    className="btn btn-primary"
  >
    Simpan Pengaturan
  </button>

  <Link
    to="/pengaturan-akademik"
    className="btn btn-outline-dark"
  >
    + Kelola Data Akademik
  </Link>

</div>

            </form>

          </section>

          {/* =========================
              4. TAMPILAN
          ========================== */}
          <section className="settings-card mb-4">

            <div className="mb-4">

              <h5 className="fw-bold mb-1">
                🎨 Tampilan
              </h5>

              <p className="text-secondary mb-0">
                Atur tampilan aplikasi sesuai preferensi.
              </p>

            </div>


            <div>

              <label className="form-label fw-semibold">
                Tema
              </label>

              <div className="d-flex gap-3">

                <button
                  type="button"
                  className={`btn ${
                    theme === "light"
                      ? "btn-primary"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setTheme("light")}
                >
                  ☀ Light
                </button>

                <button
                  type="button"
                  className={`btn ${
                    theme === "dark"
                      ? "btn-primary"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  🌙 Dark
                </button>

              </div>

            </div>

          </section>

        </div>

      </section>

    </main>
  );
}

export default SettingsPage;