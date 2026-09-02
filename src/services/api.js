import axios from "axios";

const api = axios.create({
  baseURL:
    "https://bd66-2402-8780-1018-1ae8-d539-418c-f41e-b4b0.ngrok-free.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  console.log("REQUEST:", config.url);
  console.log("TOKEN:", token ? "ADA" : "TIDAK ADA");
  console.log("TOKEN TYPE:", typeof token);
  console.log("TOKEN LENGTH:", token?.length);

  if (token && !config.url.includes("/auth/login/")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["ngrok-skip-browser-warning"] = "true";

  return config;
});

export const getDashboardSummary = async (angkatan) => {
  const response = await api.get("/v1/dashboard/summary/", {
    params: {
      angkatan,
    },
  });

  return response.data;
};

export default api;