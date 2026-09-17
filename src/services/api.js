import axios from "axios";

const api = axios.create({
  baseURL:
    "https://0a35-2402-8780-1018-c90c-9800-a1d9-4813-cf12.ngrok-free.app/api",
});

/* =========================================================
   AXIOS INTERCEPTOR
   ========================================================= */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  console.log("REQUEST:", config.url);
  console.log("TOKEN:", token ? "ADA" : "TIDAK ADA");
  console.log("TOKEN TYPE:", typeof token);
  console.log("TOKEN LENGTH:", token?.length);

  if (
    token &&
    !config.url.includes("/auth/login/")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["ngrok-skip-browser-warning"] = "true";

  return config;
});


/* =========================================================
   DASHBOARD
   ========================================================= */

/*
GET /api/v1/dashboard/summary/
*/
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

  const response = await api.get(
    "/v1/dashboard/summary/",
    {
      params,
    }
  );

  return response.data;
};


/*
GET /api/v1/dashboard/analytics/
*/
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

  const response = await api.get(
    "/v1/dashboard/analytics/",
    {
      params,
    }
  );

  return response.data;
};


/* =========================================================
   AUTH
   ========================================================= */

/*
GET /api/v1/auth/me/
*/
export const getCurrentUser = async () => {
  const response = await api.get(
    "/v1/auth/me/"
  );

  return response.data;
};


/* =========================================================
   ACADEMIC - KELAS
   ========================================================= */

/*
GET /api/v1/academic/kelas/

Record dummy "string" difilter agar tidak muncul
di dropdown/tabel frontend.
*/
export const getKelas = async () => {
  const response = await api.get(
    "/v1/academic/kelas/"
  );

  const results =
    response.data?.results || [];

  return {
    ...response.data,

    results: results.filter(
      (kelas) =>
        kelas.nama_kelas !== "string"
    ),
  };
};


/*
POST /api/v1/academic/kelas/
*/
export const createKelas = async (data) => {
  const response = await api.post(
    "/v1/academic/kelas/",
    data
  );

  return response.data;
};


/*
PUT /api/v1/academic/kelas/{id}/
*/
export const updateKelas = async (
  id,
  data
) => {
  const response = await api.put(
    `/v1/academic/kelas/${id}/`,
    data
  );

  return response.data;
};


/*
DELETE /api/v1/academic/kelas/{id}/
*/
export const deleteKelas = async (id) => {
  const response = await api.delete(
    `/v1/academic/kelas/${id}/`
  );

  return response.data;
};


/* =========================================================
   ACADEMIC - MATA PELAJARAN
   ========================================================= */

/*
GET /api/v1/academic/mapel/

Record dummy "string" difilter agar tidak muncul
di dropdown/tabel frontend.
*/
export const getMapel = async () => {
  const response = await api.get(
    "/v1/academic/mapel/"
  );

  const results =
    response.data?.results || [];

  return {
    ...response.data,

    results: results.filter(
      (mapel) =>
        mapel.kode_mapel !== "string" &&
        mapel.nama_mapel !== "string"
    ),
  };
};


/*
POST /api/v1/academic/mapel/
*/
export const createMapel = async (data) => {
  const response = await api.post(
    "/v1/academic/mapel/",
    data
  );

  return response.data;
};


/*
PUT /api/v1/academic/mapel/{id}/
*/
export const updateMapel = async (
  id,
  data
) => {
  const response = await api.put(
    `/v1/academic/mapel/${id}/`,
    data
  );

  return response.data;
};


/*
DELETE /api/v1/academic/mapel/{id}/
*/
export const deleteMapel = async (id) => {
  const response = await api.delete(
    `/v1/academic/mapel/${id}/`
  );

  return response.data;
};


/* =========================================================
   ACADEMIC - SEMESTER
   ========================================================= */

/*
GET /api/v1/academic/semester/
*/
export const getSemester = async () => {
  const response = await api.get(
    "/v1/academic/semester/"
  );

  return response.data;
};


/* =========================================================
   ACADEMIC - TAHUN AJARAN
   ========================================================= */

/*
GET /api/v1/academic/tahun-ajaran/
*/
export const getTahunAjaran = async () => {
  const response = await api.get(
    "/v1/academic/tahun-ajaran/"
  );

  return response.data;
};


/* =========================================================
   ACADEMIC - SISWA
   ========================================================= */

/*
GET /api/v1/academic/siswa/

Dipakai antara lain untuk mengambil daftar siswa
berdasarkan kelas.
*/
export const getStudents = async ({
  limit = 100,
  offset = 0,
  search = "",
  kelas_id = "",
  risk = "",
} = {}) => {
  const params = {
    limit,
    offset,
  };

  if (search) {
    params.search = search;
  }

  if (kelas_id) {
    params.kelas_id = kelas_id;
  }

  if (risk) {
    params.risk = risk;
  }

  console.log(
    "PARAMS SISWA:",
    params
  );

  const response = await api.get(
    "/v1/academic/siswa/",
    {
      params,
    }
  );

  console.log(
    "URL REQUEST:",
    response.config.url
  );

  console.log(
    "DATA SISWA:",
    response.data
  );

  return response.data;
};


/*
GET /api/v1/academic/siswa/{nisn}/
*/
export const getStudentByNisn = async (
  nisn
) => {
  const response = await api.get(
    `/v1/academic/siswa/${nisn}/`
  );

  return response.data;
};


/* =========================================================
   ASSESSMENT - SISWA RISK SUMMARY
   ========================================================= */

/*
GET /api/v1/assessment/siswa-risk-summary/

Pagination:
page
page_size

Filter:
kelas_id
risk_status
search
*/
export const getStudentRiskSummary = async ({
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

  const response = await api.get(
    "/v1/assessment/siswa-risk-summary/",
    {
      params,
    }
  );

  return response.data;
};

/*
GET /api/v1/assessment/siswa-risk-summary/

Khusus siswa HIGH RISK.
*/
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


/* =========================================================
   ASSESSMENT - DETAIL SISWA
   ========================================================= */

/*
GET /api/v1/assessment/detail-siswa/{nisn}/

Filter:
mapel_id
*/
export const getStudentDetailRisk = async ({
  nisn,
  mapel_id = "",
} = {}) => {
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


/* =========================================================
   ASSESSMENT - PRESENSI
   ========================================================= */

/*
POST /api/v1/assessment/presensi/
*/
export const createPresensi = async (
  data
) => {
  const response = await api.post(
    "/v1/assessment/presensi/",
    data
  );

  return response.data;
};


/* =========================================================
   ASSESSMENT - NILAI
   ========================================================= */

/*
POST /api/v1/assessment/nilai/
*/
export const createNilai = async (
  data
) => {
  const response = await api.post(
    "/v1/assessment/nilai/",
    data
  );

  return response.data;
};

/* =========================================================
   ASSESSMENT - NILAI
   ========================================================= */
/*
POST
/api/v1/academic/siswa/
Buat Siswa Baru (Auto Generate Akun)
*/
export const createStudent = async (data) => {
  const response = await api.post(
    "/v1/academic/siswa/",
    data
  );

  return response.data;
};


/* =========================================================
   EXPORT DEFAULT
   ========================================================= */

export default api;