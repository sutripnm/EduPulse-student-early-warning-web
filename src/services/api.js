import axios from "axios";
import { filterValidKelas, filterValidMapel } from "../utils/academic";

// Saat development, request diarahkan ke Vite proxy agar browser tidak
// melakukan CORS langsung ke domain ngrok. Untuk production, gunakan
// VITE_API_BASE_URL dari environment deployment.
const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL ||
    "https://92d0-2402-8780-1018-c90c-9800-a1d9-4813-cf12.ngrok-free.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const AUTH_ENDPOINTS = ["/auth/login/", "/auth/refresh/"];

/**
 * Menghapus query parameter kosong agar request API tetap bersih.
 */
function compactParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

/**
 * Mengecek apakah request termasuk endpoint autentikasi yang tidak perlu
 * menerima access token dan tidak boleh diproses refresh token.
 */
function isAuthRequest(url = "") {
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

/**
 * Menghapus session lokal dan mengarahkan pengguna kembali ke login.
 */
function clearSessionAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

/* =========================================================
   AXIOS REQUEST INTERCEPTOR
   ========================================================= */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && !isAuthRequest(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Mencegah halaman warning dari ngrok muncul pada browser.
  config.headers["ngrok-skip-browser-warning"] = "true";

  return config;
});

/* =========================================================
   REFRESH TOKEN
   ========================================================= */

let refreshPromise = null;

/**
 * Meminta access token baru dan menyimpan token hasil refresh.
 * Satu promise dipakai bersama agar banyak request 401 tidak melakukan
 * refresh secara bersamaan.
 */
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token tidak tersedia.");
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${api.defaults.baseURL}/v1/auth/refresh/`,
        { refresh: refreshToken },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      )
      .then((response) => {
        const result = response.data;

        if (!result.success || !result.data?.access_token) {
          throw new Error(
            result.message || "Gagal memperbarui token."
          );
        }

        localStorage.setItem(
          "accessToken",
          result.data.access_token
        );

        if (result.data.refresh_token) {
          localStorage.setItem(
            "refreshToken",
            result.data.refresh_token
          );
        }

        return result.data.access_token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

/* =========================================================
   AXIOS RESPONSE INTERCEPTOR
   ========================================================= */

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest?._retry || isAuthRequest(originalRequest?.url)) {
      return Promise.reject(error);
    }

    if (!localStorage.getItem("refreshToken")) {
      clearSessionAndRedirect();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      console.error(
        "Refresh token gagal:",
        refreshError.response?.data || refreshError.message
      );

      clearSessionAndRedirect();
      return Promise.reject(refreshError);
    }
  }
);

/* =========================================================
   DASHBOARD
   ========================================================= */

/**
 * Mengambil ringkasan dashboard sekolah dengan filter kelas/mapel opsional.
 */
export const getDashboardSummary = async ({
  kelas_id,
  mapel_id,
} = {}) => {
  const response = await api.get("/v1/dashboard/summary/", {
    params: compactParams({ kelas_id, mapel_id }),
  });

  return response.data;
};

/**
 * Mengambil analytics sekolah beserta opsi filter kelas dan mapel.
 */
export const getSchoolAnalytics = async ({
  angkatan,
  kelas_id,
  mapel_id,
} = {}) => {
  const response = await api.get("/v1/dashboard/analytics/", {
    params: compactParams({ angkatan, kelas_id, mapel_id }),
  });

  return response.data;
};

/**
 * Mengambil dashboard siswa berdasarkan NISN dan mapel aktif.
 */
export const getStudentDashboard = async (nisn, mapel_id) => {
  const response = await api.get(`/v1/dashboard/student/${nisn}/`, {
    params: compactParams({ mapel_id }),
  });

  return response.data;
};

/**
 * Mengambil dashboard orang tua untuk siswa tertentu.
 */
export const getParentDashboard = async (nisn, mapel_id) => {
  const response = await api.get(`/v1/dashboard/parent/${nisn}/`, {
    params: compactParams({ mapel_id }),
  });

  return response.data;
};

/**
 * Menghapus data siswa berdasarkan NISN.
 */
export const deleteStudent = async (nisn) => {
  const response = await api.delete(`/v1/academic/siswa/${nisn}/`);
  return response.data;
};

/* =========================================================
   AUTH
   ========================================================= */

/**
 * Mengambil data user yang sedang login.
 */
export const getCurrentUser = async () => {
  const response = await api.get("/v1/auth/me/");
  return response.data;
};

/* =========================================================
   ACADEMIC - KELAS
   ========================================================= */

/**
 * Mengambil daftar kelas dan menghapus record dummy "string".
 */
export const getKelas = async () => {
  const response = await api.get("/v1/academic/kelas/");

  return {
    ...response.data,
    results: filterValidKelas(response.data?.results),
  };
};

/**
 * Membuat kelas baru.
 */
export const createKelas = async (data) => {
  const response = await api.post("/v1/academic/kelas/", data);
  return response.data;
};

/**
 * Mengubah data kelas.
 */
export const updateKelas = async (id, data) => {
  const response = await api.put(`/v1/academic/kelas/${id}/`, data);
  return response.data;
};

/**
 * Menghapus kelas.
 */
export const deleteKelas = async (id) => {
  const response = await api.delete(`/v1/academic/kelas/${id}/`);
  return response.data;
};

/* =========================================================
   ACADEMIC - MATA PELAJARAN
   ========================================================= */

/**
 * Mengambil daftar mata pelajaran dan menghapus record dummy API.
 */
export const getMapel = async () => {
  const response = await api.get("/v1/academic/mapel/");

  return {
    ...response.data,
    results: filterValidMapel(response.data?.results),
  };
};

/**
 * Membuat mata pelajaran baru.
 */
export const createMapel = async (data) => {
  const response = await api.post("/v1/academic/mapel/", data);
  return response.data;
};

/**
 * Mengubah mata pelajaran.
 */
export const updateMapel = async (id, data) => {
  const response = await api.put(`/v1/academic/mapel/${id}/`, data);
  return response.data;
};

/**
 * Menghapus mata pelajaran.
 */
export const deleteMapel = async (id) => {
  const response = await api.delete(`/v1/academic/mapel/${id}/`);
  return response.data;
};

/* =========================================================
   ACADEMIC - SEMESTER & TAHUN AJARAN
   ========================================================= */

/**
 * Mengambil daftar semester.
 */
export const getSemester = async () => {
  const response = await api.get("/v1/academic/semester/");
  return response.data;
};

/**
 * Mengambil daftar tahun ajaran.
 */
export const getTahunAjaran = async () => {
  const response = await api.get("/v1/academic/tahun-ajaran/");
  return response.data;
};

/* =========================================================
   ACADEMIC - SISWA
   ========================================================= */

/**
 * Mengambil daftar siswa dengan pagination dan filter opsional.
 */
export const getStudents = async ({
  limit = 100,
  offset = 0,
  search = "",
  kelas_id = "",
  risk = "",
} = {}) => {
  const response = await api.get("/v1/academic/siswa/", {
    params: compactParams({
      limit,
      offset,
      search,
      kelas_id,
      risk,
    }),
  });

  return response.data;
};

/**
 * Mengambil satu siswa berdasarkan NISN.
 */
export const getStudentByNisn = async (nisn) => {
  const response = await api.get(`/v1/academic/siswa/${nisn}/`);
  return response.data;
};

/* =========================================================
   ASSESSMENT - RISK SUMMARY
   ========================================================= */

/**
 * Mengambil ringkasan risiko siswa dengan pagination dan filter.
 */
export const getStudentRiskSummary = async ({
  page = 1,
  page_size = 10,
  search = "",
  kelas_id = "",
  risk_status = "",
} = {}) => {
  const response = await api.get("/v1/assessment/siswa-risk-summary/", {
    params: compactParams({
      page,
      page_size,
      search,
      kelas_id,
      risk_status,
    }),
  });

  return response.data;
};

/**
 * Mengambil siswa berisiko tinggi memakai endpoint risk summary yang sama.
 */
export const getHighRiskStudents = async ({
  page = 1,
  page_size = 10,
  kelas_id = "",
  search = "",
} = {}) => {
  return getStudentRiskSummary({
    page,
    page_size,
    kelas_id,
    search,
    risk_status: "HIGH",
  });
};

/* =========================================================
   ASSESSMENT - DETAIL SISWA
   ========================================================= */

/**
 * Mengambil analisis risiko detail siswa berdasarkan mapel.
 */
export const getStudentDetailRisk = async ({
  nisn,
  mapel_id = "",
} = {}) => {
  const response = await api.get(`/v1/assessment/detail-siswa/${nisn}/`, {
    params: compactParams({ mapel_id }),
  });

  return response.data;
};

/**
 * Menyimpan data presensi siswa.
 */
export const createPresensi = async (data) => {
  const response = await api.post("/v1/assessment/presensi/", data);
  return response.data;
};

/**
 * Menyimpan data nilai siswa.
 */
export const createNilai = async (data) => {
  const response = await api.post("/v1/assessment/nilai/", data);
  return response.data;
};

/**
 * Membuat siswa baru dan akun terkait.
 */
export const createStudent = async (data) => {
  const response = await api.post("/v1/academic/siswa/", data);
  return response.data;
};

/* =========================================================
   DETAIL PAGE - NILAI & PREDIKSI
   ========================================================= */

/**
 * Mengambil daftar nilai siswa untuk mapel tertentu.
 */
export const getStudentScores = async ({
  nisn,
  mapel_id,
}) => {
  const response = await api.get("/v1/assessment/nilai/", {
    params: {
      siswa_nisn: nisn,
      mapel_id: Number(mapel_id),
    },
  });

  return response.data;
};

/**
 * Mengambil detail prediksi untuk siswa, mapel, dan minggu tertentu.
 */
export const getStudentPrediction = async ({
  nisn,
  mapel_id,
  minggu_ke,
}) => {
  const response = await api.get(
    `/v1/assessment/detail-prediksi/${nisn}/${mapel_id}/${minggu_ke}/`
  );

  return response.data;
};

export default api;
