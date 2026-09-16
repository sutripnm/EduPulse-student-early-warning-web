import axios from "axios";

const api = axios.create({
  baseURL:
    "https://0a35-2402-8780-1018-c90c-9800-a1d9-4813-cf12.ngrok-free.app/api",
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

export const getDashboardSummary = async ({
  kelas_id,
  mapel_id,
} = {}) => {
  const params = {};

  if (kelas_id) {
    params.kelas_id = kelas_id;
  }

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get("/v1/dashboard/summary/", {
    params,
  });

  return response.data;
};

export const getSchoolAnalytics = async ({
  angkatan,
  kelas_id,
  mapel_id,
} = {}) => {
  const params = {};

  if (angkatan) {
    params.angkatan = angkatan;
  }

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

export const getStudents = async ({
  page = 1,
  page_size = 10,
  search = "",
  kelas_id = "",
  risk_status = "",
} = {}) => {
  const params = {
    page,
    page_size,
  };

  if (search) {
    params.search = search;
  }

  if (kelas_id) {
    params.kelas_id = kelas_id;
  }

  if (risk_status) {
    params.risk_status = risk_status;
  }

  console.log("PARAMS SISWA:", params);

  const response = await api.get(
    "/v1/assessment/siswa-risk-summary/",
    {
      params,
    }
  );

  console.log("URL REQUEST:", response.config.url);
  console.log("DATA SISWA:", response.data);

  return response.data;
};

export const getStudentByNisn = async (nisn) => {
  const response = await api.get(`/v1/academic/siswa/${nisn}/`);

  return response.data;
};

export const getHighRiskStudents = async ({
  page = 1,
  page_size = 10,
  kelas_id = "",
  search = "",
} = {}) => {
  const params = {
    page,
    page_size,
    risk_status: "HIGH",
  };

  if (kelas_id) {
    params.kelas_id = kelas_id;
  }

  if (search) {
    params.search = search;
  }

  const response = await api.get(
    "/v1/assessment/siswa-risk-summary/",
    {
      params,
    }
  );

  return response.data;
};

export const getKelas = async () => {
  const response = await api.get("/v1/academic/kelas/");
  return response.data;
};

export const getMapel = async () => {
  const response = await api.get("/v1/academic/mapel/");
  return response.data;
};


export const getStudentDetailRisk = async ({
  nisn,
  mapel_id = "",
}) => {
  const params = {};

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get(
    `/v1/assessment/detail-siswa/${nisn}/`,
    {
      params,
    }
  );

  return response.data;
};


export const createPresensi = async (data) => {
  const response = await api.post(
    "/v1/assessment/presensi/",
    data
  );

  return response.data;
};

export const createNilai = async (data) => {
  const response = await api.post(
    "/v1/assessment/nilai/",
    data
  );

  return response.data;
};

export const getSemester = async () => {
  const response = await api.get("/v1/academic/semester/");
  return response.data;
};

export default api;