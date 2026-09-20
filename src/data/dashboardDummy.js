/**
 * Data fallback dashboard siswa saat API belum dapat digunakan.
 */
export const STUDENT_DASHBOARD_DUMMY = {
  profil: {
    nisn: "0051234567",
    nama: "Nadya Putri Ramadhani",
    kelas: "XI IPA 1",
  },
  absensi_harian: [],
  study_time: [{ label: "Minggu Ini", jam: 7 }],
  tugas_pretest: [{ label: "Minggu Ini", nilai: 78 }],
  assessment: [{ label: "Minggu Ini", nilai: 82 }],
  tugas_posttest: [{ label: "Minggu Ini", nilai: 85 }],
  status_risk: "MEDIUM",
  rekomendasi: [
    "Tingkatkan waktu belajar mandiri terutama sebelum assessment.",
    "Perhatikan kehadiran, terutama di akhir minggu.",
  ],
  filter_opsi_mapel: [],
};

/**
 * Data fallback dashboard orang tua saat API belum dapat digunakan.
 */
export const PARENT_DASHBOARD_DUMMY = {
  profil: {
    nisn: "0051234567",
    nama: "Nadya Putri Ramadhani",
    kelas: "XI IPA 1",
  },
  absensi: [],
  study_time: [],
  tugas_pretest: [],
  assessment: [],
  tugas_posttest: [],
  komparasi: {
    kehadiran: {},
    study_time: {},
    pretest: {},
    assessment: {},
    posttest: {},
  },
  status_risk: "MEDIUM",
  rekomendasi: [],
  filter_opsi_mapel: [],
};
