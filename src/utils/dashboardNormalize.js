// Ambil nilai terakhir dari sebuah list data mingguan (dipakai di
// dashboard siswa untuk kartu ringkasan "minggu ini").
export function lastValue(list, key) {
  if (!list || list.length === 0) return "-";
  return list[list.length - 1][key] ?? "-";
}

// =========================
// HELPER
// =========================
function normalizeMapelOptions(list) {
  return (list || []).filter(
    (mapel) =>
      mapel &&
      mapel.id &&
      mapel.nama_mapel &&
      mapel.nama_mapel.trim().toLowerCase() !== "string" &&
      (
        !mapel.kode_mapel ||
        mapel.kode_mapel.trim().toLowerCase() !== "string"
      )
  );
}


/**
 * API dashboard siswa mengembalikan struktur:
 * {
 *   success, message,
 *   data: {
 *     profil: { nisn, nama_siswa, kelas },
 *     mapel_aktif: { id, nama_mapel },
 *     filter_opsi_mapel: [{ id, nama_mapel }],
 *     ringkasan_mingguan: {
 *       minggu_ke, study_time_jam,
 *       presensi_harian: [{ hari, status }],
 *       nilai: { tugas_1_pretest, tugas_2_posttest, assessment }
 *     },
 *     analisis_ews: { status_risiko, label_risiko_display, rekomendasi }
 *   }
 * }
 *
 * Fungsi ini "menerjemahkan" bentuk di atas ke struktur yang dipakai
 * komponen (profil.nama, absensi_harian, study_time, tugas_pretest,
 * assessment, tugas_posttest, status_risk, rekomendasi), supaya JSX
 * halamannya tidak perlu diubah walau nama field API berbeda.
 */

// =========================
// DASHBOARD SISWA
// =========================
export function normalizeStudentDashboard(rawResult) {
  const d = rawResult?.data || rawResult;
  const mingguan = d?.ringkasan_mingguan || {};
  const nilai = mingguan?.nilai || {};
  const ews = d?.analisis_ews || {};
  const mingguLabel = `Minggu ${mingguan?.minggu_ke ?? "Ini"}`;

 return {
  profil: {
    nisn: d?.profil?.nisn,
    nama: d?.profil?.nama_siswa,
    kelas: d?.profil?.kelas,
  },

  filter_opsi_mapel: normalizeMapelOptions(
    d?.filter_opsi_mapel
  ),

  mapel_aktif: d?.mapel_aktif || null,

  absensi_harian: mingguan?.presensi_harian || [],

  study_time: [
    {
      label: mingguLabel,
      jam: mingguan?.study_time_jam ?? "-",
    },
  ],

  tugas_pretest: [
    {
      label: mingguLabel,
      nilai: nilai?.tugas_1_pretest ?? "-",
    },
  ],

  assessment: [
    {
      label: mingguLabel,
      nilai: nilai?.assessment ?? "-",
    },
  ],

  tugas_posttest: [
    {
      label: mingguLabel,
      nilai: nilai?.tugas_2_posttest ?? "-",
    },
  ],

  status_risk: ews?.status_risiko,

  rekomendasi: ews?.rekomendasi || [],
};
}

/**
 * Backend saat ini (bug sementara) mengirim rekomendasi_orangtua
 * sebagai STRING yang bentuknya mirip dict Python, contoh:
 * "{'guru': '...', 'siswa': '...', 'orangtua': 'Apresiasi pencapaian belajar anak.'}"
 * bukan object JSON asli. Fungsi ini coba "menarik" nilai key 'orangtua'
 * dari string itu pakai regex. Kalau formatnya berubah / sudah diperbaiki
 * backend jadi object asli, fungsi ini otomatis fallback aman.
 */
export function extractOrangtuaText(item) {
  if (item && typeof item === "object" && item.orangtua) {
    return item.orangtua;
  }

  if (typeof item !== "string") return String(item ?? "");

  const match = item.match(/'orangtua':\s*'([^']*)'/);
  if (match) return match[1];

  return item; // fallback: tampilkan string aslinya kalau gagal di-parse
}

/**
 * API dashboard orang tua mengembalikan struktur:
 * {
 *   data: {
 *     profil: { nisn, nama_siswa, kelas },
 *     mapel_aktif, filter_opsi_mapel,
 *     grafik_mingguan: [
 *       { minggu_ke, label, presensi_persen, study_time_jam,
 *         nilai: { pretest, assessment, posttest } }
 *     ],
 *     komparasi_bulanan: {
 *       kehadiran: { sekarang, bulan_lalu, selisih, tren },
 *       study_time: {...}, pretest: {...}, assessment: {...}, posttest: {...}
 *     },
 *     analisis_ews: { status_risiko, label_risiko_display, rekomendasi_orangtua }
 *   }
 * }
 *
 * Fungsi ini menerjemahkan ke struktur yang dipakai komponen di bawah.
 */
export function normalizeParentDashboard(rawResult) {
  const d = rawResult?.data || rawResult;
  const grafik = d?.grafik_mingguan || [];
  const komparasi = d?.komparasi_bulanan || {};
  const ews = d?.analisis_ews || {};

return {
  profil: {
    nisn: d?.profil?.nisn,
    nama: d?.profil?.nama_siswa,
    kelas: d?.profil?.kelas,
  },

  filter_opsi_mapel: normalizeMapelOptions(
    d?.filter_opsi_mapel
  ),

  mapel_aktif: d?.mapel_aktif || null,

  absensi: grafik.map((m) => ({
    label: m.label,
    persen: m.presensi_persen,
  })),

  study_time: grafik.map((m) => ({
    label: m.label,
    jam: m.study_time_jam,
  })),

  tugas_pretest: grafik.map((m) => ({
    label: m.label,
    nilai: m.nilai?.pretest,
  })),

  assessment: grafik.map((m) => ({
    label: m.label,
    nilai: m.nilai?.assessment,
  })),

  tugas_posttest: grafik.map((m) => ({
    label: m.label,
    nilai: m.nilai?.posttest,
  })),

  komparasi: {
    kehadiran: komparasi?.kehadiran || {},
    study_time: komparasi?.study_time || {},
    pretest: komparasi?.pretest || {},
    assessment: komparasi?.assessment || {},
    posttest: komparasi?.posttest || {},
  },

  status_risk: ews?.status_risiko,

  rekomendasi: (
    ews?.rekomendasi_orangtua || []
  ).map(extractOrangtuaText),
};
}
