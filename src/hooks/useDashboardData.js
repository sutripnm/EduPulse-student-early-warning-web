import { useEffect, useState } from "react";
import {
  getDashboardSummary,
  getSchoolAnalytics,
  getMapel,
  getKelas,
} from "../services/api";

export const riskColors = {
  Rendah: "#22a06b",
  Sedang: "#f5b82e",
  Tinggi: "#dc3545",
};

export const riskFactorColors = ["#6840d9", "#f5b82e", "#22a06b"];

function useDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);
  const [schoolAnalyticsData, setSchoolAnalyticsData] = useState(null);

  const [mapelOptions, setMapelOptions] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState("");

  const [kelasOptions, setKelasOptions] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboardSummary();
        if (result.success) setDashboardData(result.data);

        // Fetch mapel options
        const mapelResult = await getMapel();
        setMapelOptions(mapelResult.results || []);
        
        // Fetch kelas options
        const kelasResult = await getKelas();
        setKelasOptions(kelasResult.results || []);

        const analyticsResult = await getSchoolAnalytics({
          angkatan: result?.data?.summary?.angkatan || "",
          mapel_id: selectedMapel,
          kelas_id: selectedKelas,
        });
        if (analyticsResult.success) setSchoolAnalyticsData(analyticsResult.data);
      } catch (error) {
        console.error("Gagal mengambil dashboard:", error);
      }
    };

    fetchDashboard();
  }, [selectedMapel, selectedKelas]);

  const riskByClassData = schoolAnalyticsData?.perbandingan_risiko_kelas || [];

  const riskFactorData =
    schoolAnalyticsData?.faktor_utama_risiko?.map((item) => ({
      name: item.faktor,
      value: item.percentage,
    })) || [];

  const riskData = [
    { name: "Rendah", value: dashboardData?.proporsi_risiko?.rendah?.percentage || 0 },
    { name: "Sedang", value: dashboardData?.proporsi_risiko?.sedang?.percentage || 0 },
    { name: "Tinggi", value: dashboardData?.proporsi_risiko?.tinggi?.percentage || 0 },
  ];

  const topRiskStudents =
    dashboardData?.top_intervensi || [];

  const topHighRiskClasses =
    dashboardData?.insight_kelas?.high_risk_terbanyak?.map((item) => ({
      className: item.nama_kelas,
      count: item.jumlah_siswa,
    })) || [];

  const topLowRiskClasses =
    dashboardData?.insight_kelas?.low_risk_terbanyak?.map((item) => ({
      className: item.nama_kelas,
      count: item.jumlah_siswa,
    })) || [];

  return {
    dashboardData,
    riskByClassData,
    riskFactorData,
    riskData,
    topRiskStudents,
    topHighRiskClasses,
    topLowRiskClasses,

    mapelOptions,
    selectedMapel,
    setSelectedMapel,

    kelasOptions,
    selectedKelas,
    setSelectedKelas,
  };
}

export default useDashboardData;