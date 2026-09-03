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

  console.log("Dashboard API:", response);
  console.log("Dashboard DATA:", response.data);
  console.log("SUMMARY:", response.data?.summary);

  return response.data;
};

export const getSchoolAnalytics = async ({
  angkatan,
  kelas_id,
  mapel_id,
}) => {
  const params = {
    angkatan,
  };

  if (kelas_id) {
    params.kelas_id = kelas_id;
  }

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get("/v1/dashboard/analytics/", {
    params,
  });

  return response.data;
};

export const getStudents = async () => {
  const response = await api.get("/v1/academic/siswa/");

  return response.data;
};

export default api;