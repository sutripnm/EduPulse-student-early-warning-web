import { useEffect, useState } from "react";
import {
  getDashboardSummary,
  getSchoolAnalytics,
} from "../services/api";

function useDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);
  const [schoolAnalyticsData, setSchoolAnalyticsData] = useState(null);

  const [kelasOptions, setKelasOptions] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);

  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedMapel, setSelectedMapel] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(false);

      try {
        // =========================
        // Analytics
        // =========================

        const analyticsResult = await getSchoolAnalytics({
          kelas_id: selectedKelas,
          mapel_id: selectedMapel,
        });

        if (analyticsResult.success) {
          setSchoolAnalyticsData(analyticsResult.data);

          // Filter options berasal dari analytics
          setKelasOptions(
            analyticsResult.data?.filter_options?.kelas || []
          );

          setMapelOptions(
            analyticsResult.data?.filter_options?.mapel || []
          );
        }

        // =========================
        // Summary
        // =========================

        const summaryResult = await getDashboardSummary({
          kelas_id: selectedKelas,
          mapel_id: selectedMapel,
        });

        if (summaryResult.success) {
          setDashboardData(summaryResult.data);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil dashboard:",
          error.response?.data || error.message
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [selectedKelas, selectedMapel]);

  // =========================
  // Analytics
  // =========================

  const riskByClassData =
    schoolAnalyticsData?.perbandingan_risiko_kelas || [];

  const riskFactorData =
    schoolAnalyticsData?.faktor_utama_risiko?.map((item) => ({
      name: item.faktor,
      value: item.percentage,
    })) || [];

  // =========================
  // Risk Donut
  // =========================

  const riskData = [
    {
      name: "Rendah",
      value:
        dashboardData?.proporsi_risiko?.rendah?.percentage || 0,
    },
    {
      name: "Sedang",
      value:
        dashboardData?.proporsi_risiko?.sedang?.percentage || 0,
    },
    {
      name: "Tinggi",
      value:
        dashboardData?.proporsi_risiko?.tinggi?.percentage || 0,
    },
  ];

  // =========================
  // Top Intervention
  // =========================

  const topRiskStudents =
    dashboardData?.top_intervensi || [];

  // =========================
  // Insight Kelas
  // =========================

  const topHighRiskClasses =
    dashboardData?.insight_kelas?.high_risk_terbanyak?.map(
      (item) => ({
        className: item.nama_kelas,
        count: item.jumlah_siswa,
      })
    ) || [];

  const topLowRiskClasses =
    dashboardData?.insight_kelas?.low_risk_terbanyak?.map(
      (item) => ({
        className: item.nama_kelas,
        count: item.jumlah_siswa,
      })
    ) || [];

  return {
    dashboardData,
    schoolAnalyticsData,

    riskByClassData,
    riskFactorData,
    riskData,

    topRiskStudents,
    topHighRiskClasses,
    topLowRiskClasses,

    kelasOptions,
    mapelOptions,

    selectedKelas,
    setSelectedKelas,

    selectedMapel,
    setSelectedMapel,

    loading,
    error,
  };
}

export default useDashboardData;