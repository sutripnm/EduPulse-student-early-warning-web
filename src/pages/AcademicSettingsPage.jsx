import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/academic-settings-page.css";

function AcademicSettingsPage() {
  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");

  const handleSubjectSubmit = (event) => {
    event.preventDefault();

    console.log("Mata Pelajaran:", subjectName);
  };

  const handleClassSubmit = (event) => {
    event.preventDefault();

    console.log("Kelas:", className);
  };

  return (
    <main className="academic-settings-page d-flex">

      <Sidebar />

      <section className="academic-settings-main flex-grow-1 p-4">

        {/* Header */}
        <header className="mb-4">

          <p className="text-secondary mb-1">
            Academic Management
          </p>

          <h1 className="h3 fw-bold mb-1">
            Pengaturan Akademik
          </h1>

          <p className="text-secondary mb-0">
            Kelola mata pelajaran dan kelas yang digunakan dalam sistem.
          </p>

        </header>


        {/* Kembali */}
        <div className="mb-4">

          <Link
            to="/pengaturan"
            className="btn btn-outline-dark"
          >
            ← Kembali ke Pengaturan
          </Link>

        </div>


        <div className="row g-4">

          {/* =========================
              MATA PELAJARAN
          ========================== */}
          <div className="col-lg-6">

            <section className="academic-settings-card">

              <div className="mb-4">

                <h5 className="fw-bold mb-1">
                  📚 Tambah Mata Pelajaran
                </h5>

                <p className="text-secondary mb-0">
                  Tambahkan mata pelajaran baru ke dalam sistem.
                </p>

              </div>


              <form onSubmit={handleSubjectSubmit}>

                <div className="mb-3">

                  <label
                    htmlFor="subject-name"
                    className="form-label fw-semibold"
                  >
                    Nama Mata Pelajaran
                  </label>

                  <input
                    type="text"
                    id="subject-name"
                    className="form-control"
                    placeholder="Contoh: Matematika"
                    value={subjectName}
                    onChange={(event) =>
                      setSubjectName(event.target.value)
                    }
                    required
                  />

                </div>


                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  + Tambah Mata Pelajaran
                </button>

              </form>

            </section>

          </div>


          {/* =========================
              KELAS
          ========================== */}
          <div className="col-lg-6">

            <section className="academic-settings-card">

              <div className="mb-4">

                <h5 className="fw-bold mb-1">
                  🏫 Tambah Kelas
                </h5>

                <p className="text-secondary mb-0">
                  Tambahkan kelas baru ke dalam sistem.
                </p>

              </div>


              <form onSubmit={handleClassSubmit}>

                <div className="mb-3">

                  <label
                    htmlFor="class-name"
                    className="form-label fw-semibold"
                  >
                    Nama Kelas
                  </label>

                  <input
                    type="text"
                    id="class-name"
                    className="form-control"
                    placeholder="Contoh: XI IPA 3"
                    value={className}
                    onChange={(event) =>
                      setClassName(event.target.value)
                    }
                    required
                  />

                </div>


                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  + Tambah Kelas
                </button>

              </form>

            </section>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AcademicSettingsPage;