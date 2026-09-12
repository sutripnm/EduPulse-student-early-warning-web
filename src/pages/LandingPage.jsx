import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/landing-page.css";

function LandingPage() {
  return (
    <main>
      <Navbar />

      {/* =========================
          HERO
          ========================= */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center min-vh-100">

            {/* Hero Content */}
            <div className="col-lg-6">
              <p className="hero-label d-flex align-items-center gap-2">
                <span></span>
                STUDENT EARLY WARNING SYSTEM
              </p>

              <h1 className="hero-title">
                Know who
                <br />
                needs help
                <br />
                <span>before it’s too late.</span>
              </h1>

              <p className="hero-description">
                EduPulse turns everyday student data into actionable early
                warnings, helping educators identify academic risk before it
                becomes a bigger problem.
              </p>

              <div className="d-flex gap-3 mt-4">
                <Link
                  to="/dashboard"
                  className="btn btn-primary rounded-pill px-4"
                >
                  Explore Dashboard
                </Link>

                <a
                  href="#cara-kerja"
                  className="btn btn-outline-dark rounded-pill px-4"
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Dashboard Preview */}
{/* Dashboard Preview */}
<div className="col-lg-6">
  <div className="landing-kpi-preview">

    {/* Baris 1 */}
    <div className="landing-kpi-row">

      <div className="landing-kpi-card">
        <div>
          <span>Total Siswa</span>
          <strong>100</strong>
        </div>

        <div className="landing-kpi-icon">
          👥
        </div>
      </div>

      <div className="landing-kpi-card">
        <div>
          <span>Risiko Tinggi</span>
          <strong className="text-danger">
            5
          </strong>

          <small className="text-danger">
            5% dari total siswa
          </small>
        </div>

        <div className="landing-kpi-icon">
          ⚠️
        </div>
      </div>

    </div>

    {/* Baris 2 */}
    <div className="landing-kpi-row">

      <div className="landing-kpi-card">
        <div>
          <span>Risiko Sedang</span>
          <strong className="text-warning">
            16
          </strong>

          <small>
            16% dari total siswa
          </small>
        </div>

        <div className="landing-kpi-icon">
          ➖
        </div>
      </div>

      <div className="landing-kpi-card">
        <div>
          <span>Risiko Rendah</span>
          <strong className="text-success">
            79
          </strong>

          <small className="text-success">
            79% dari total siswa
          </small>
        </div>

        <div className="landing-kpi-icon">
          ✓
        </div>
      </div>

    </div>

  </div>
</div>

          </div>
        </div>
      </section>


      {/* =========================
          FITUR
          ========================= */}
      <section
        id="fitur"
        className="landing-section"
      >
        <div className="container">

          <div className="section-heading">
            <p className="section-label">
              FEATURES
            </p>

            <h2>
              Semua yang dibutuhkan untuk
              <span> memahami siswa.</span>
            </h2>

            <p>
              EduPulse membantu guru melihat kondisi siswa melalui data
              akademik dan indikator risiko dalam satu tempat.
            </p>
          </div>

          <div className="row g-4 mt-4">

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  📊
                </div>

                <h5>
                  Dashboard Analytics
                </h5>

                <p>
                  Lihat performa akademik, presensi, dan distribusi risiko
                  siswa secara cepat.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  👨‍🎓
                </div>

                <h5>
                  Student Monitoring
                </h5>

                <p>
                  Cari dan pantau kondisi siswa berdasarkan kelas dan
                  tingkat risiko.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  ⚠️
                </div>

                <h5>
                  Early Warning
                </h5>

                <p>
                  Identifikasi siswa yang membutuhkan perhatian lebih awal.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  📚
                </div>

                <h5>
                  Academic Data
                </h5>

                <p>
                  Kelola data nilai, presensi, kelas, dan informasi akademik
                  siswa.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================
          CARA KERJA
          ========================= */}
      <section
        id="cara-kerja"
        className="landing-section landing-section-muted"
      >
        <div className="container">

          <div className="section-heading text-center">
            <p className="section-label">
              HOW IT WORKS
            </p>

            <h2>
              Dari data menjadi
              <span> tindakan.</span>
            </h2>

            <p>
              EduPulse membantu guru bergerak dari sekadar melihat data
              menjadi mengambil tindakan yang lebih cepat.
            </p>
          </div>

          <div className="row g-4 mt-4">

            <div className="col-md-4">
              <div className="process-card">
                <span className="process-number">
                  01
                </span>

                <h5>
                  Collect Data
                </h5>

                <p>
                  Data siswa seperti nilai dan presensi dikumpulkan dalam
                  satu sistem.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <span className="process-number">
                  02
                </span>

                <h5>
                  Identify Risk
                </h5>

                <p>
                  Sistem menganalisis data untuk membantu mengidentifikasi
                  siswa dengan tingkat risiko tertentu.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <span className="process-number">
                  03
                </span>

                <h5>
                  Take Action
                </h5>

                <p>
                  Guru dapat melihat siswa yang membutuhkan perhatian dan
                  menentukan tindakan yang sesuai.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================
          TENTANG
          ========================= */}
      <section
        id="tentang"
        className="landing-section"
      >
        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">
              <p className="section-label">
                ABOUT EDUPULSE
              </p>

              <h2>
                Membantu sekolah
                <span> bertindak lebih awal.</span>
              </h2>

              <p className="mt-3">
                EduPulse adalah sistem Student Early Warning yang membantu
                pendidik memahami kondisi siswa melalui data akademik dan
                indikator risiko.
              </p>

              <p>
                Tujuannya bukan menggantikan keputusan guru, tetapi membantu
                guru menemukan siswa yang mungkin membutuhkan perhatian
                sebelum masalah berkembang lebih jauh.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="about-card">
                <div>
                  <small>
                    Our Goal
                  </small>

                  <h4>
                    See the risk.
                    <br />
                    Understand the student.
                    <br />
                    Take action.
                  </h4>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CTA
          ========================= */}
      <section className="landing-cta">
        <div className="container">
          <div className="cta-card">

            <div>
              <p className="section-label">
                READY TO EXPLORE?
              </p>

              <h2>
                See your students
                <br />
                more clearly.
              </h2>
            </div>

            <Link
              to="/dashboard"
              className="btn btn-primary rounded-pill px-4"
            >
              Open Dashboard
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

export default LandingPage;