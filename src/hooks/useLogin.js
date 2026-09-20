import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

/**
 * Mengelola input login, penyimpanan session, dan redirect berdasarkan role.
 */
function useLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Mengirim kredensial ke API lalu menyiapkan session user.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/v1/auth/login/", {
        email,
        password,
      });

      const loginData = response.data?.data;

      if (!loginData?.access_token) {
        throw new Error("Access token tidak tersedia.");
      }

      if (!loginData?.refresh_token) {
        throw new Error("Refresh token tidak tersedia.");
      }

      localStorage.setItem("accessToken", loginData.access_token);
      localStorage.setItem("refreshToken", loginData.refresh_token);

      const user = loginData.user;
      const role = String(user?.role || "").toUpperCase();

      // Cache user agar hook useCurrentUser tidak perlu request tambahan.
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      localStorage.setItem("role", role);

      const nisn = extractStudentNisn(user, role);

      if (nisn) {
        localStorage.setItem("nisn", nisn);
      } else {
        localStorage.removeItem("nisn");
      }

      redirectByRole(role, nisn, navigate);
    } catch (error) {
      console.error(
        "Login gagal:",
        error.response?.data || error.message
      );
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
}

/**
 * Mengambil NISN dari email akun siswa/orang tua sesuai format akun sekolah.
 */
function extractStudentNisn(user, role) {
  const studentRoles = ["SISWA", "ORANGTUA", "ORANG_TUA"];

  if (!studentRoles.includes(role)) {
    return "";
  }

  return user?.email?.match(/\d{10}/)?.[0] || "";
}

/**
 * Mengarahkan user ke dashboard sesuai role.
 */
function redirectByRole(role, nisn, navigate) {
  if (role === "ORANGTUA" || role === "ORANG_TUA") {
    if (!nisn) {
      throw new Error(
        "NISN siswa untuk akun orang tua tidak ditemukan."
      );
    }

    navigate(`/dashboard-ortu/${nisn}`);
    return;
  }

  if (role === "SISWA") {
    if (!nisn) {
      throw new Error("NISN siswa tidak ditemukan.");
    }

    navigate(`/dashboard-siswa/${nisn}`);
    return;
  }

  navigate("/dashboard");
}

export default useLogin;
