import logo from "../assets/logo purple.png";
import "../styles/login-page.css";

function LoginPage() {
  return (
    <main className="login-page min-vh-100">
      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">

          {/* Left Side */}
          <div className="col-lg-6 login-brand p-5 d-flex flex-column">
            <div>
              <img
                src={logo}
                alt="EduPulse"
                className="login-logo"
              />
            </div>

            <div className="my-auto">
              <p className="login-label mb-4">
                <span></span>
                STUDENT EARLY WARNING SYSTEM
              </p>

              <h1 className="login-title mb-4">
                Turn student
                <br />
                data into <span>early</span>
                <br />
                <span>action.</span>
              </h1>

              <p className="login-description">
                Access your EduPulse workspace and get a clearer view of
                student performance, risk levels, and early warning signals.
              </p>

              <div className="mt-5">

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="login-feature-icon">
                    ↗
                  </div>

                  <div>
                    <h6 className="text-white mb-1">
                      Performance insights
                    </h6>

                    <small>
                      See the indicators behind student risk.
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="login-feature-icon">
                    !
                  </div>

                  <div>
                    <h6 className="text-white mb-1">
                      Early warnings
                    </h6>

                    <small>
                      Prioritize students who need attention.
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="login-feature-icon">
                    ◎
                  </div>

                  <div>
                    <h6 className="text-white mb-1">
                      Student overview
                    </h6>

                    <small>
                      Monitor your student population in one place.
                    </small>
                  </div>
                </div>

              </div>
            </div>

            <div className="d-flex justify-content-between small">
              <span>© 2026 EduPulse</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 bg-white p-5 d-flex align-items-center">
            <div className="login-form-wrapper w-100">

              <p className="login-welcome mb-2">
                WELCOME BACK
              </p>

              <h2 className="login-heading mb-2">
                Sign in to EduPulse
              </h2>

              <p className="text-secondary mb-5">
                Enter your credentials to continue to your dashboard.
              </p>

              <form>

                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                  >
                    Email address
                  </label>

                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="you@school.edu"
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>

                    <a href="#" className="forgot-password">
                      Forgot password?
                    </a>
                  </div>

                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Remember */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="remember"
                  >
                    Remember me
                  </label>
                </div>

                {/* Info */}
                <div className="alert alert-info mb-4">
                  Password recovery will be connected when Django
                  authentication is added.
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100 rounded-3"
                >
                  Sign in&nbsp; →
                </button>

              </form>

              <div className="text-center mt-4">
                <a
                  href="/"
                  className="text-secondary text-decoration-none"
                >
                  ← Back to homepage
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default LoginPage;