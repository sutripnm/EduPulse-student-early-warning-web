import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getParentDashboard,
  getStudentRiskSummary,
} from "../services/api";
import { normalizeParentDashboard } from "../utils/dashboardNormalize";

// Data contoh, dipakai sementara kalau API belum bisa diakses,
// biar tampilan tetap kelihatan lengkap
const DUMMY_DASHBOARD = {
  profil: { nisn: "0051234567", nama: "Nadya Putri Ramadhani", kelas: "XI IPA 1" },
  absensi: [
    { label: "Minggu 1", persen: 100 },
    { label: "Minggu 2", persen: 90 },
    { label: "Minggu 3", persen: 80 },
    { label: "Minggu 4", persen: 88 },
  ],
  study_time: [
    { label: "Minggu 1", jam: 8 },
    { label: "Minggu 2", jam: 6.5 },
    { label: "Minggu 3", jam: 9 },
    { label: "Minggu 4", jam: 7 },
  ],
  tugas_pretest: [
    { label: "Minggu 1", nilai: 70 },
    { label: "Minggu 2", nilai: 74 },
    { label: "Minggu 3", nilai: 76 },
    { label: "Minggu 4", nilai: 78 },
  ],
  assessment: [
    { label: "Minggu 1", nilai: 75 },
    { label: "Minggu 2", nilai: 78 },
    { label: "Minggu 3", nilai: 80 },
    { label: "Minggu 4", nilai: 82 },
  ],
  tugas_posttest: [
    { label: "Minggu 1", nilai: 80 },
    { label: "Minggu 2", nilai: 82 },
    { label: "Minggu 3", nilai: 84 },
    { label: "Minggu 4", nilai: 85 },
  ],
  komparasi: {
    kehadiran: { sekarang: 88, bulan_lalu: 82 },
    study_time: { sekarang: 7.6, bulan_lalu: 6 },
    pretest: { sekarang: 74.5, bulan_lalu: 72 },
    assessment: { sekarang: 78.8, bulan_lalu: 76 },
    posttest: { sekarang: 82.8, bulan_lalu: 79 },
  },
  status_risk: "MEDIUM",
  rekomendasi: [
    "Tingkatkan waktu belajar mandiri anak, terutama sebelum assessment.",
    "Dampingi anak agar kehadiran tetap konsisten di akhir minggu.",
  ],
  filter_opsi_mapel: [],
};

function useParentDashboard() {
  // NISN diambil dari URL (/dashboard-ortu/:nisn); fallback ke NISN
  // anak yang tersimpan di localStorage kalau halaman diakses tanpa
  // parameter (misal dari menu, bukan link langsung).
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
        const result = await getParentDashboard(studentNisn, selectedMapel);
        const normalized = normalizeParentDashboard(result);

        let finalDashboard = normalized;

        if (!selectedMapel) {
          const riskResult =
            await getStudentRiskSummary({
              page: 1,
              page_size: 10,
              search: studentNisn,
            });

          const studentRisk =
            riskResult.results?.find(
              (item) => item.nisn === studentNisn
            );

          finalDashboard = {
            ...normalized,

            status_risk:
              studentRisk?.status_risiko ||
              normalized.status_risk,
          };
        }

        setDashboard(finalDashboard);
        setIsDummy(false);

        setDashboard(normalized);
        setIsDummy(false);

        if (!selectedMapel && normalized.mapel_aktif?.id) {
          setSelectedMapel(String(normalized.mapel_aktif.id));
        }
      } catch (error) {
        console.error("Gagal mengambil dashboard ortu, pakai data contoh:", error);

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
    dashboard?.filter_opsi_mapel?.map(
      (mapel) => ({
        id: mapel.id,
        nama: mapel.nama_mapel,
      })
    ) || [];

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

export default useParentDashboard;
