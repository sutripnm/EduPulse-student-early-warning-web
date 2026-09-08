import { useEffect, useState } from "react";
import { getDashboardSummary, getSchoolAnalytics } from "../services/api";

export const riskColors = {
  Rendah: "#22a06b",
  Sedang: "#f5b82e",
  Tinggi: "#dc3545",
};

export const riskFactorColors = ["#6840d9", "#f5b82e", "#22a06b"];

const topHighRiskClasses = [
  { className: "XI IPA 1", count: 8 },
  { className: "XII IPS 1", count: 6 },
  { className: "X IPA 2", count: 5 },
  { className: "XI IPA 2", count: 4 },
  { className: "XII IPA 1", count: 3 },
];

const topLowRiskClasses = [
  { className: "XII IPA 1", count: 30 },
  { className: "XII IPS 1", count: 28 },
  { className: "XI IPA 1", count: 25 },
  { className: "X IPA 1", count: 24 },
  { className: "XI IPS 1", count: 22 },
];

function useDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);
  const [schoolAnalyticsData, setSchoolAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboardSummary();
        if (result.success) setDashboardData(result.data);

        const analyticsResult = await getSchoolAnalytics({
          angkatan: result?.data?.summary?.angkatan || "",
        });
        if (analyticsResult.success) setSchoolAnalyticsData(analyticsResult.data);
      } catch (error) {
        console.error("Gagal mengambil dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

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

  const topRiskStudents = dashboardData?.top_intervensi || [];

  return {
    dashboardData,
    riskByClassData,
    riskFactorData,
    riskData,
    topRiskStudents,
    topHighRiskClasses,
    topLowRiskClasses,
  };
}

export default useDashboardData;