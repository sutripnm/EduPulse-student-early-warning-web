import axios from "axios";

const api = axios.create({
  baseURL:
    "https://950e-2402-8780-1018-1ae8-d0d4-dbf4-15d7-a35b.ngrok-free.app/api",
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
export const getStudentDashboard = async (nisn) => {
  const response = await api.get(`/v1/academic/siswa/${nisn}/dashboard/`);

  return response.data;
};

export default api;