import axios from "axios";

const api = axios.create({
  baseURL:
     "https://d6ca-156-230-191-173.ngrok-free.app/api",
});

// ==============================================================
// Dashboard Siswa / Orang Tua
// ==============================================================
// TODO: konfirmasi ke tim backend endpoint & nama field yang benar.
// Ini masih tebakan, dipakai sementara sampai backend kasih tau
// endpoint aslinya. Struktur data yang diharapkan:
// {
//   profil: { nisn, nama, kelas },
//   absensi: [{ label, persen }],
//   study_time: [{ label, jam }],
//   tugas_pretest: [{ label, nilai }],
//   assessment: [{ label, nilai }],
//   tugas_posttest: [{ label, nilai }],
//   status_risk: "LOW" | "MEDIUM" | "HIGH",
//   rekomendasi: ["...", "..."],
// }
export const getStudentDashboard = async (nisn, mapel_id) => {
  const params = {};

  if (mapel_id) {
    params.mapel_id = mapel_id;
  }

  const response = await api.get(`/v1/academic/siswa/${nisn}/dashboard/`, {
    params,
  });

  return response.data;
};

export default api;