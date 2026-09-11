import axios from "axios";

const api = axios.create({
  baseURL:
    "https://6dd9-2402-8780-1018-417c-64c2-8a42-1464-d260.ngrok-free.app/api",
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

export const getStudentByNisn = async (nisn) => {
  const response = await api.get(`/v1/academic/siswa/${nisn}/`);

  return response.data;
};

export const getMapel = async () => {
  const response = await api.get("/v1/academic/mapel/");
  return response.data;
};

export const getKelas = async () => {
  const response = await api.get("/v1/academic/kelas/");
  return response.data;
};

export default api;