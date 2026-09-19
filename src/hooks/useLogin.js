import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function useLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("=== LOGIN START ===");
    console.log("EMAIL:", email);

    try {
      // =========================
      // LOGIN
      // =========================

      const response = await api.post(
        "/v1/auth/login/",
        {
          email,
          password,
        }
      );

      const loginData =
        response.data?.data;

      console.log(
        "=== LOGIN SUCCESS ==="
      );

      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "LOGIN DATA JSON:",
        JSON.stringify(
          loginData,
          null,
          2
        )
      );

      // =========================
      // VALIDASI RESPONSE
      // =========================

      if (!loginData) {
        throw new Error(
          "Data login tidak tersedia."
        );
      }

      if (
        !loginData.access_token
      ) {
        throw new Error(
          "Access token tidak tersedia."
        );
      }

      if (
        !loginData.refresh_token
      ) {
        throw new Error(
          "Refresh token tidak tersedia."
        );
      }

      // =========================
      // SIMPAN ACCESS TOKEN
      // =========================

      localStorage.setItem(
        "accessToken",
        loginData.access_token
      );

      // =========================
      // SIMPAN REFRESH TOKEN
      // =========================

      localStorage.setItem(
        "refreshToken",
        loginData.refresh_token
      );

      // =========================
      // DATA USER
      // =========================

      const user =
        loginData.user;

      console.log(
        "USER LOGIN:",
        user
      );

      // =========================
      // ROLE
      // =========================

      const role = String(
        user?.role || ""
      ).toUpperCase();

      console.log(
        "ROLE USER:",
        role
      );

      // Simpan role
      localStorage.setItem(
        "role",
        role
      );

      // =========================
      // AMBIL NISN
      // =========================
      //
      // Saat ini API login belum
      // mengirim nisn secara langsung.
      //
      // Untuk akun siswa/orang tua,
      // NISN terdapat pada email:
      //
      // ortu_1000000071@school.id
      //
      // → 1000000071
      //
      // =========================

      let nisn = "";

      if (
        role === "SISWA" ||
        role === "ORANGTUA" ||
        role === "ORANG_TUA"
      ) {
        const nisnMatch =
          user?.email?.match(
            /\d{10}/
          );

        nisn =
          nisnMatch?.[0] || "";

        // =========================
        // SIMPAN NISN
        // =========================

        if (nisn) {
          localStorage.setItem(
            "nisn",
            nisn
          );

          console.log(
            "NISN USER:",
            nisn
          );
        } else {
          console.warn(
            "NISN tidak ditemukan dari email user."
          );

          localStorage.removeItem(
            "nisn"
          );
        }
      } else {
        // Admin / Guru tidak membutuhkan
        // NISN siswa.
        localStorage.removeItem(
          "nisn"
        );
      }

      // =========================
      // CEK LOCAL STORAGE
      // =========================

      console.log(
        "ACCESS TOKEN:",
        localStorage.getItem(
          "accessToken"
        )
          ? "ADA"
          : "TIDAK ADA"
      );

      console.log(
        "REFRESH TOKEN:",
        localStorage.getItem(
          "refreshToken"
        )
          ? "ADA"
          : "TIDAK ADA"
      );

      console.log(
        "ROLE LOCAL STORAGE:",
        localStorage.getItem(
          "role"
        )
      );

      console.log(
        "NISN LOCAL STORAGE:",
        localStorage.getItem(
          "nisn"
        )
      );

      // =========================
      // REDIRECT BERDASARKAN ROLE
      // =========================

      if (
        role === "ORANGTUA" ||
        role === "ORANG_TUA"
      ) {
        // Pastikan NISN tersedia
        if (!nisn) {
          throw new Error(
            "NISN siswa untuk akun orang tua tidak ditemukan."
          );
        }

        navigate(
          `/dashboard-ortu/${nisn}`
        );

        return;
      }

      if (
        role === "SISWA"
      ) {
        // Pastikan NISN tersedia
        if (!nisn) {
          throw new Error(
            "NISN siswa tidak ditemukan."
          );
        }

        navigate(
          `/dashboard-siswa/${nisn}`
        );

        return;
      }

      // ADMIN dan GURU
      navigate("/dashboard");

    } catch (error) {
      console.log(
        "=== LOGIN ERROR ==="
      );

      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "DATA:",
        error.response?.data
      );

      console.log(
        "MESSAGE:",
        error.message
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

export default useLogin;