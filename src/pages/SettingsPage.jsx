import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/settings-page.css";

function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Agus Guru",
    email: "agus@sekolah.sch.id",
    role: "Guru",
  });

  const [school, setSchool] = useState({
    name: "SMA EduPulse",
    academicYear: "2026/2027",
  });

  const [risk, setRisk] = useState({
    attendanceLimit: 70,
    minimumScore: 75,
  });

  const [notification, setNotification] = useState(true);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSchoolChange = (event) => {
    const { name, value } = event.target;

    setSchool({
      ...school,
      [name]: value,
    });
  };

  const handleRiskChange = (event) => {
    const { name, value } = event.target;

    setRisk({
      ...risk,
      [name]: value,
    });
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    console.log("Profil:", profile);
  };

  const handleSchoolSubmit = (event) => {
    event.preventDefault();

    console.log("Sekolah:", school);
  };

  const handleRiskSubmit = (event) => {
    event.preventDefault();

    console.log("Pengaturan risiko:", risk);
  };

  return (
    <main className="settings-page d-flex">

      <Sidebar />

      <section className="settings-main flex-grow-1 p-4">

        {/* Header */}
        <header className="mb-4">

          <p className="text-secondary mb-1">
            System Management
          </p>

          <h1 className="h3 fw-bold mb-1">
            Pengaturan
          </h1>

          <p className="text-secondary mb-0">
            Kelola akun dan pengaturan sistem EduPulse.
          </p>

        </header>


        <div className="settings-container">


          {/* ========================= */}
          {/* PROFIL PENGGUNA */}
          {/* ========================= */}

          <section className="settings-card mb-4">

            <div className="settings-card-header">
              <div>
                <h5 className="fw-bold mb-1">
                  👤 Profil Pengguna
                </h5>

                <p className="text-secondary mb-0">
                  Informasi akun pengguna.
                </p>
              </div>
            </div>


            <form onSubmit={handleProfileSubmit}>

              <div className="row g-3">

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
                    name="name"
                    className="form-control"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />

                </div>


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
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />

                </div>


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
                    disabled
                  />

                </div>

              </div>


              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                Simpan Profil
              </button>

            </form>

          </section>


          {/* ========================= */}
          {/* SEKOLAH */}
          {/* ========================= */}

          <section className="settings-card mb-4">

            <div className="mb-4">

              <h5 className="fw-bold mb-1">
                🏫 Pengaturan Sekolah
              </h5>

              <p className="text-secondary mb-0">
                Informasi sekolah yang digunakan dalam sistem.
              </p>

            </div>


            <form onSubmit={handleSchoolSubmit}>

              <div className="row g-3">

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

              </div>


              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                Simpan Pengaturan
              </button>

            </form>

          </section>


          {/* ========================= */}
          {/* RISIKO */}
          {/* ========================= */}

          <section className="settings-card mb-4">

            <div className="mb-4">

              <h5 className="fw-bold mb-1">
                ⚠️ Pengaturan Risiko
              </h5>

              <p className="text-secondary mb-0">
                Atur batas dasar yang digunakan untuk indikator risiko.
              </p>

            </div>


            <form onSubmit={handleRiskSubmit}>

              <div className="row g-3">

                <div className="col-md-6">

                  <label
                    htmlFor="attendance-limit"
                    className="form-label fw-semibold"
                  >
                    Batas Minimum Kehadiran
                  </label>

                  <div className="input-group">

                    <input
                      type="number"
                      id="attendance-limit"
                      name="attendanceLimit"
                      className="form-control"
                      min="0"
                      max="100"
                      value={risk.attendanceLimit}
                      onChange={handleRiskChange}
                    />

                    <span className="input-group-text">
                      %
                    </span>

                  </div>

                </div>


                <div className="col-md-6">

                  <label
                    htmlFor="minimum-score"
                    className="form-label fw-semibold"
                  >
                    KKM / Nilai Minimum
                  </label>

                  <input
                    type="number"
                    id="minimum-score"
                    name="minimumScore"
                    className="form-control"
                    min="0"
                    max="100"
                    value={risk.minimumScore}
                    onChange={handleRiskChange}
                  />

                </div>

              </div>


              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                Simpan Pengaturan Risiko
              </button>

            </form>

          </section>


          {/* ========================= */}
          {/* NOTIFIKASI */}
          {/* ========================= */}

          <section className="settings-card mb-4">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h5 className="fw-bold mb-1">
                  🔔 Notifikasi
                </h5>

                <p className="text-secondary mb-0">
                  Terima pemberitahuan ketika terdapat siswa berisiko.
                </p>

              </div>


              <div className="form-check form-switch">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notification"
                  checked={notification}
                  onChange={(event) =>
                    setNotification(event.target.checked)
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="notification"
                >
                  {notification ? "Aktif" : "Nonaktif"}
                </label>

              </div>

            </div>

          </section>


          {/* Logout */}
          <div className="text-end">

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => console.log("Logout")}
            >
              Logout
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

export default SettingsPage;