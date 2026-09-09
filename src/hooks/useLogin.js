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
    const response = await api.post("/v1/auth/login/", {
      email: email,
      password: password,
    });

    console.log("=== LOGIN SUCCESS ===");
    console.log("STATUS:", response.status);
    console.log(
        "LOGIN DATA JSON:",
        JSON.stringify(response.data.data, null, 2)
      );

    localStorage.setItem("accessToken", response.data.data.access_token);
    localStorage.setItem("refreshToken", response.data.data.refresh_token);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data.user)
    );

    navigate("/dashboard");

  } catch (error) {
    console.log("=== LOGIN ERROR ===");
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.message);
  }
};

  return { email, setEmail, password, setPassword, handleSubmit };
}

export default useLogin;