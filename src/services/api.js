import axios from "axios";

const api = axios.create({
  baseURL:
    "https://92d0-2402-8780-1018-c90c-9800-a1d9-4813-cf12.ngrok-free.app/api",
});

/* =========================================================
   AXIOS REQUEST INTERCEPTOR
   ========================================================= */

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken");

  // Jangan kirim access token ke login / refresh
  const isAuthRequest =
    config.url?.includes("/auth/login/") ||
    config.url?.includes("/auth/refresh/");

  if (token && !isAuthRequest) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  // Biar ngrok gak nampilin halaman warning
  config.headers[
    "ngrok-skip-browser-warning"
  ] = "true";

  return config;
});


/* =========================================================
   REFRESH TOKEN
   ========================================================= */

// Menyimpan proses refresh yang sedang berjalan.
// Ini mencegah beberapa request sekaligus melakukan
// refresh token secara bersamaan.
let refreshPromise = null;

const refreshAccessToken = async () => {
  const refreshToken =
    localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error(
      "Refresh token tidak tersedia."
    );
  }

  // Kalau sedang ada refresh berjalan,
  // request lain tinggal menunggu hasilnya.
  if (!refreshPromise) {
    refreshPromise =
      axios
        .post(
          `${api.defaults.baseURL}/v1/auth/refresh/`,
          {
            refresh: refreshToken,
          },
          {
            headers: {
              "ngrok-skip-browser-warning":
                "true",
            },
          }
        )
        .then((response) => {
          const result =
            response.data;

          console.log(
            "HASIL REFRESH TOKEN:",
            result
          );

          if (
            !result.success ||
            !result.data?.access_token
          ) {
            throw new Error(
              result.message ||
                "Gagal memperbarui token."
            );
          }

          // Backend memberikan access token
          // DAN refresh token baru.
          localStorage.setItem(
            "accessToken",
            result.data.access_token
          );

          if (
            result.data.refresh_token
          ) {
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
};


/* =========================================================
   AXIOS RESPONSE INTERCEPTOR
   ========================================================= */

api.interceptors.response.use(
  (response) => {
    // Response normal
    return response;
  },

  async (error) => {
    const originalRequest =
      error.config;

    // Bukan 401 → langsung teruskan error
    if (
      error.response?.status !== 401
    ) {
      return Promise.reject(
        error
      );
    }

    // Kalau request sudah pernah di-retry,
    // jangan refresh lagi supaya tidak infinite loop.
    if (
      originalRequest?._retry
    ) {
      return Promise.reject(
        error
      );
    }

    // Login dan refresh sendiri tidak perlu
    // di-refresh ulang.
    if (
      originalRequest?.url?.includes(
        "/auth/login/"
      ) ||
      originalRequest?.url?.includes(
        "/auth/refresh/"
      )
    ) {
      return Promise.reject(
        error
      );
    }

    const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );

    // Tidak ada refresh token
    → hapus session dan login ulang
    if (!refreshToken) {
      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      window.location.href =
        "/login";

      return Promise.reject(
        error
      );
    }

    originalRequest._retry =
      true;

    try {
      // Ambil access token baru
      const newAccessToken =
        await refreshAccessToken();

      // Pasang token baru ke request
      originalRequest.headers =
        originalRequest.headers || {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      // Ulangi request yang sebelumnya 401
      return api(
        originalRequest
      );

    } catch (refreshError) {
      console.error(
        "Refresh token gagal:",
        refreshError
      );

      // Refresh token juga sudah tidak valid
      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      window.location.href =
        "/login";

      return Promise.reject(
        refreshError
      );
    }
  }
);


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


/*
GET /api/v1/dashboard/student/{siswa_nisn}/

Response shape:
{
  success, message,
  data: {
    profil: { nisn, nama_siswa, kelas },
    mapel_aktif: { id, nama_mapel },
    filter_opsi_mapel: [{ id, nama_mapel }],
    ringkasan_mingguan: {
      minggu_ke, study_time_jam,
      presensi_harian: [{ hari, status }],
      nilai: { tugas_1_pretest, tugas_2_posttest, assessment }
    },
    analisis_ews: { status_risiko, label_risiko_display, rekomendasi }
  }
}
*/
export const getStudentDashboard = async (nisn, mapel_id) => {
  const params = {};

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get(
    `/v1/dashboard/student/${nisn}/`,
    {
      params,
    }
  );

  return response.data;
};


/*
GET /api/v1/dashboard/parent/{siswa_nisn}/
*/
export const getParentDashboard = async (nisn, mapel_id) => {
  const params = {};

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get(
    `/v1/dashboard/parent/${nisn}/`,
    {
      params,
    }
  );

  return response.data;
};

// ========
// Hapus siswa
// ========
export const deleteStudent = async (nisn) => {
  const response = await api.delete(
    `/v1/academic/siswa/${nisn}/`
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

  const response = await api.get(
    "/v1/academic/siswa/",
    {
      params,
    }
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

/*
POST /api/v1/academic/siswa/
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
   Detail Page
   ========================================================= */
export const getStudentScores = async ({
  nisn,
  mapel_id,
}) => {
  const params = {
    siswa_nisn: nisn,
    mapel_id: Number(mapel_id),
  };

  const response = await api.get(
    "/v1/assessment/nilai/",
    {
      params,
    }
  );

  return response.data;
};

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


/* =========================================================
   EXPORT DEFAULT
   ========================================================= */

export default api;
