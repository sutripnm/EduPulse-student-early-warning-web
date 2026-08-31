import Navbar from "../components/Navbar";
import "../styles/landing-page.css";

function LandingPage() {
  return (
    <main>
      <Navbar />

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
                <button className="btn btn-primary rounded-pill px-4">
                  Explore Dashboard
                </button>

                <button className="btn btn-outline-dark rounded-pill px-4">
                  See how it works
                </button>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="col-lg-6">
              <div className="dashboard-preview">
                Student Overview
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;