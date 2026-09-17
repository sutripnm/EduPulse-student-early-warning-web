import {
  BsGraphUpArrow,
  BsExclamationTriangleFill,
  BsPeopleFill,
} from "react-icons/bs";
import logo from "../../assets/gemini-svg.svg";

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
          Ubah data siswa
          <br />
          menjadi tindakan <span>early</span>
          <br />
          <span>pencegahan dini.</span>
        </h1>

        <p className="login-description">
          Akses workspace EduPulse Anda dan pantau performa siswa, 
          tingkat risiko, serta sinyal peringatan dini dengan lebih jelas.
        </p>

        <div className="mt-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="login-feature-icon"><BsGraphUpArrow /></div>
            <div>
              <h6 className="text-white mb-1">Performance insights</h6>
              <small>Ketahui indikator yang memengaruhi tingkat risiko siswa.</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="login-feature-icon"><BsExclamationTriangleFill /></div>
            <div>
              <h6 className="text-white mb-1">Early warnings</h6>
              <small>Beri prioritas pada siswa yang paling membutuhkan perhatian.</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="login-feature-icon"><BsPeopleFill /></div>
            <div>
              <h6 className="text-white mb-1">Student overview</h6>
              <small>Pantau seluruh siswa Anda dalam satu platform terpusat.</small>
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