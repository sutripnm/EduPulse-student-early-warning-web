import axios from "axios";

const api = axios.create({
  baseURL: "https://0a35-2402-8780-1018-c90c-9800-a1d9-4813-cf12.ngrok-free.app/api",
  headers: {
    // Biar ngrok gak nampilin halaman warning ke request non-browser-navigasi
    "ngrok-skip-browser-warning": "true",
  },
});

// ==============================================================
// Dashboard Siswa
// ==============================================================
// Endpoint asli dari backend (lihat swagger):
// GET /api/v1/dashboard/student/{siswa_nisn}/
//
// Response shape:
// {
//   success, message,
//   data: {
//     profil: { nisn, nama_siswa, kelas },
//     mapel_aktif: { id, nama_mapel },
//     filter_opsi_mapel: [{ id, nama_mapel }],
//     ringkasan_mingguan: {
//       minggu_ke, study_time_jam,
//       presensi_harian: [{ hari, status }],
//       nilai: { tugas_1_pretest, tugas_2_posttest, assessment }
//     },
//     analisis_ews: { status_risiko, label_risiko_display, rekomendasi }
//   }
// }
export const getStudentDashboard = async (nisn, mapel_id) => {
  const params = {};

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get(`/v1/dashboard/student/${nisn}/`, {
    params,
  });

  return response.data;
};

// ==============================================================
// Dashboard Orang Tua
// ==============================================================
// Endpoint asli dari backend (lihat swagger):
// GET /api/v1/dashboard/parent/{siswa_nisn}/
export const getParentDashboard = async (nisn, mapel_id) => {
  const params = {};

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get(`/v1/dashboard/parent/${nisn}/`, {
    params,
  });

  return response.data;
};

export default api;