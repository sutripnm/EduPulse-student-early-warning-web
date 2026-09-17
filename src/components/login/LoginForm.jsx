import { Link } from "react-router-dom";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

function LoginForm({ email, setEmail, password, setPassword, onSubmit }) {
  return (
    <div className="col-lg-6 login-form p-5 d-flex align-items-center">
      <div className="login-form-wrapper w-100">
        <p className="login-welcome mb-2">SELAMAT DATANG</p>
        <h2 className="login-heading mb-2">Masuk ke EduPulse</h2>
        <p className="text-secondary mb-5">
          Masukkan kredensial Anda untuk melanjutkan ke dashboard.
        </p>

        <form onSubmit={onSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
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
                Kata Sandi
              </label>
            </div>
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              placeholder="Masukkan kata sandi"
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

          {/* Submit */}
          <button type="submit" className="btn btn-dark btn-lg w-100 rounded-3">
            Masuk  <BsArrowRight className="ms-1" />
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-secondary text-decoration-none">
            <BsArrowLeft className="me-1" />
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;