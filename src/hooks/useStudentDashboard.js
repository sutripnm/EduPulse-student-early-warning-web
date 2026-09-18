import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentDashboard } from "../services/api";
import { normalizeStudentDashboard } from "../utils/dashboardNormalize";
import defaultMapelOptions from "../data/defaultMapelOptions";

// Data contoh, dipakai sementara kalau API belum bisa diakses,
// biar tampilan tetap kelihatan lengkap
const DUMMY_DASHBOARD = {
  profil: { nisn: "0051234567", nama: "Nadya Putri Ramadhani", kelas: "XI IPA 1" },
  absensi_harian: [
    { hari: "Senin", status: "Hadir" },
    { hari: "Selasa", status: "Hadir" },
    { hari: "Rabu", status: "Izin" },
    { hari: "Kamis", status: "Hadir" },
    { hari: "Jumat", status: "Alpha" },
  ],
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

function useStudentDashboard() {
  // NISN diambil dari URL (/dashboard-siswa/:nisn); kalau halaman ini
  // diakses tanpa parameter (siswa login sendiri), fallback ke NISN
  // yang tersimpan di localStorage saat login.
  const { nisn } = useParams();
  const studentNisn = nisn || localStorage.getItem("nisn");

  const [selectedMapel, setSelectedMapel] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDummy, setIsDummy] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      try {
        const result = await getStudentDashboard(studentNisn, selectedMapel);
        const normalized = normalizeStudentDashboard(result);

        setDashboard(normalized);
        setIsDummy(false);

        // Set filter mapel default ke mapel_aktif dari API,
        // hanya kalau user belum pilih apa-apa sendiri
        if (!selectedMapel && normalized.mapel_aktif?.id) {
          setSelectedMapel(String(normalized.mapel_aktif.id));
        }
      } catch (error) {
        console.error("Gagal mengambil dashboard siswa, pakai data contoh:", error);

        setDashboard(DUMMY_DASHBOARD);
        setIsDummy(true);
      } finally {
        setLoading(false);
      }
    };

    if (studentNisn) {
      fetchDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentNisn, selectedMapel]);

  const mapelOptions =
    dashboard?.filter_opsi_mapel?.length > 0
      ? dashboard.filter_opsi_mapel.map((mapel) => ({
          id: mapel.id,
          nama: mapel.nama_mapel,
        }))
      : defaultMapelOptions;

  return {
    studentNisn,
    selectedMapel,
    setSelectedMapel,
    dashboard,
    loading,
    isDummy,
    mapelOptions,
  };
}

export default useStudentDashboard;
