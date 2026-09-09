import { Link } from "react-router-dom";

function LoginForm({ email, setEmail, password, setPassword, onSubmit }) {
  return (
    <div className="col-lg-6 bg-white p-5 d-flex align-items-center">
      <div className="login-form-wrapper w-100">
        <p className="login-welcome mb-2">WELCOME BACK</p>
        <h2 className="login-heading mb-2">Sign in to EduPulse</h2>
        <p className="text-secondary mb-5">
          Enter your credentials to continue to your dashboard.
        </p>

        <form onSubmit={onSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label htmlFor="password" className="form-label fw-semibold">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember */}
          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          {/* Info */}
          <div className="alert alert-info mb-4">
            Password recovery will be connected when Django authentication is
            added.
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-dark btn-lg w-100 rounded-3">
            Sign in&nbsp; →
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-secondary text-decoration-none">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
