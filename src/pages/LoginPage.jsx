import "../styles/login-page.css";
import LoginBrandPanel from "../components/login/LoginBrandPanel";
import LoginForm from "../components/login/LoginForm";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  // State email/password + fungsi submit login ada di useLogin, biar
  // halaman ini tinggal merakit LoginBrandPanel + LoginForm.
  const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

  return (
    <main className="login-page min-vh-100">
      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">
          <LoginBrandPanel />
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
