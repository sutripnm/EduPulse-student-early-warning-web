import logo from "../../assets/logo purple.png";

function LoginBrandPanel() {
  return (
    <div className="col-lg-6 login-brand p-5 d-flex flex-column">
      <div>
        <img src={logo} alt="EduPulse" className="login-logo" />
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
          Access your EduPulse workspace and get a clearer view of student
          performance, risk levels, and early warning signals.
        </p>

        <div className="mt-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="login-feature-icon">↗</div>
            <div>
              <h6 className="text-white mb-1">Performance insights</h6>
              <small>See the indicators behind student risk.</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="login-feature-icon">!</div>
            <div>
              <h6 className="text-white mb-1">Early warnings</h6>
              <small>Prioritize students who need attention.</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="login-feature-icon">◎</div>
            <div>
              <h6 className="text-white mb-1">Student overview</h6>
              <small>Monitor your student population in one place.</small>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between small">
        <span>© 2026 EduPulse</span>
      </div>
    </div>
  );
}

export default LoginBrandPanel;
