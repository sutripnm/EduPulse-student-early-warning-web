import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import KpiCard from "../components/landing-page/KpiCard";
import FeatureCard from "../components/landing-page/FeatureCard";
import ProcessCard from "../components/landing-page/ProcessCard";
import { KPI_DATA, FEATURES_DATA, PROCESS_DATA } from "../data/landingData";
import "../styles/landing-page.css";

function LandingPage() {
  return (
    <main>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <p className="hero-label d-flex align-items-center gap-2">
                <span></span>
                STUDENT EARLY WARNING SYSTEM
              </p>

              <h1 className="hero-title">
                Ketahui siapa <br />
                yang membutuhkan bantuan <br />
                <span>sebelum terlambat.</span>
              </h1>

              <p className="hero-description">
               EduPulse mengubah data siswa sehari-hari menjadi peringatan dini yang dapat ditindaklanjuti, 
               membantu pendidik mengidentifikasi risiko akademik 
               sebelum masalah tersebut berkembang menjadi lebih besar.
              </p>

              <div className="d-flex gap-3 mt-4">
                <Link to="/dashboard" className="btn btn-dark rounded-pill px-4">
                  Buka   Dashboard
                </Link>
                <a href="#cara-kerja" className="btn btn-outline-dark rounded-pill px-4">
                  Cara Kerja
                </a>
              </div>
            </div>

            {/* Dashboard KPI Preview */}
            <div className="col-lg-6">
              <div className="landing-kpi-preview">
                <div className="landing-kpi-row">
                  {KPI_DATA.slice(0, 2).map((item) => (
                    <KpiCard key={item.id} {...item} />
                  ))}
                </div>
                <div className="landing-kpi-row">
                  {KPI_DATA.slice(2, 4).map((item) => (
                    <KpiCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="fitur" className="landing-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">FITUR</p>
            <h2>
              Semua yang dibutuhkan untuk <span>memahami siswa.</span>
            </h2>
            <p>
              EduPulse membantu guru melihat kondisi siswa melalui data akademik
              dan indikator risiko dalam satu tempat.
            </p>
          </div>

          <div className="row g-4 mt-4">
            {FEATURES_DATA.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="cara-kerja" className="landing-section landing-section-muted">
        <div className="container">
          <div className="section-heading text-center">
            <p className="section-label">CARA KERJA</p>
            <h2>
              Dari data menjadi <span>tindakan.</span>
            </h2>
            <p>
              EduPulse membantu guru bergerak dari sekadar melihat data menjadi
              mengambil tindakan yang lebih cepat.
            </p>
          </div>

          <div className="row g-4 mt-4">
            {PROCESS_DATA.map((process) => (
              <ProcessCard key={process.step} {...process} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="tentang" className="landing-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="section-label">TENTANG EDUPULSE</p>
              <h2>
                Membantu sekolah <span>bertindak lebih awal.</span>
              </h2>
              <p className="mt-3">
                EduPulse adalah sistem Student Early Warning yang membantu pendidik
                memahami kondisi siswa melalui data akademik dan indikator risiko.
              </p>
              <p>
                Tujuannya bukan menggantikan keputusan guru, tetapi membantu guru
                menemukan siswa yang mungkin membutuhkan perhatian sebelum masalah
                berkembang lebih jauh.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="about-card">
                <div>
                  <small>Tujuan Kami</small>
                  <h4>
                    Kenali risikonya <br />
                    Pahami siswanya <br />
                    Ambil tindakan.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="landing-cta">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="section-label">SIAP UNTUK MENJELAJAHI?</p>
              <h2>
                Kenali siswa Anda <br />
                dengan lebih jelas.
              </h2>
            </div>
            <Link to="/dashboard" className="btn btn-dark rounded-pill px-4">
              Buka Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;