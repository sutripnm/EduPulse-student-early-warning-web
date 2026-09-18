import { useEffect, useState } from "react";
import {
  getDashboardSummary,
  getSchoolAnalytics,
} from "../services/api";

function useDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);
  const [schoolAnalyticsData, setSchoolAnalyticsData] =
    useState(null);

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
        // ANALYTICS
        // =========================

        const analyticsResult =
          await getSchoolAnalytics({
            kelas_id: selectedKelas,
            mapel_id: selectedMapel,
          });

        if (analyticsResult.success) {
          setSchoolAnalyticsData(
            analyticsResult.data
          );

          // =========================
          // FILTER KELAS
          // =========================

          const kelasOptions =
            analyticsResult.data?.filter_options
              ?.kelas || [];

          setKelasOptions(
            kelasOptions.filter(
              (kelas) =>
                kelas &&
                kelas.id &&
                kelas.nama_kelas &&
                kelas.nama_kelas
                  .trim()
                  .toLowerCase() !== "string"
            )
          );

          // =========================
          // FILTER MAPEL
          // =========================

          const mapelOptions =
            analyticsResult.data?.filter_options
              ?.mapel || [];

          setMapelOptions(
            mapelOptions.filter(
              (mapel) =>
                mapel &&
                mapel.id &&
                mapel.nama_mapel &&
                mapel.nama_mapel
                  .trim()
                  .toLowerCase() !== "string" &&
                (
                  !mapel.kode_mapel ||
                  mapel.kode_mapel
                    .trim()
                    .toLowerCase() !== "string"
                )
            )
          );
        }

        // =========================
        // SUMMARY
        // =========================

        const summaryResult =
          await getDashboardSummary({
            kelas_id: selectedKelas,
            mapel_id: selectedMapel,
          });

        if (summaryResult.success) {
          setDashboardData(
            summaryResult.data
          );
        }
      } catch (error) {
        console.error(
          "Gagal mengambil dashboard:",
          error.response?.data ||
            error.message
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [selectedKelas, selectedMapel]);

  // =========================
  // ANALYTICS
  // =========================

  const riskByClassData =
    schoolAnalyticsData
      ?.perbandingan_risiko_kelas || [];

  const riskFactorData =
    schoolAnalyticsData
      ?.faktor_utama_risiko
      ?.map((item) => ({
        name: item.faktor,
        value: item.percentage,
      })) || [];

  // =========================
  // RISK DONUT
  // =========================

  const riskData = [
    {
      name: "Rendah",
      value:
        dashboardData
          ?.proporsi_risiko
          ?.rendah
          ?.percentage || 0,
    },
    {
      name: "Sedang",
      value:
        dashboardData
          ?.proporsi_risiko
          ?.sedang
          ?.percentage || 0,
    },
    {
      name: "Tinggi",
      value:
        dashboardData
          ?.proporsi_risiko
          ?.tinggi
          ?.percentage || 0,
    },
  ];

  // =========================
  // TOP INTERVENTION
  // =========================

  const topRiskStudents =
    dashboardData?.top_intervensi || [];

  // =========================
  // INSIGHT KELAS
  // =========================

  const topHighRiskClasses =
    dashboardData
      ?.insight_kelas
      ?.high_risk_terbanyak
      ?.map((item) => ({
        className: item.nama_kelas,
        count: item.jumlah_siswa,
      })) || [];

  const topLowRiskClasses =
    dashboardData
      ?.insight_kelas
      ?.low_risk_terbanyak
      ?.map((item) => ({
        className: item.nama_kelas,
        count: item.jumlah_siswa,
      })) || [];

  return {
    // =========================
    // RAW DATA
    // =========================

    dashboardData,
    schoolAnalyticsData,

    // =========================
    // ANALYTICS DATA
    // =========================

    riskByClassData,
    riskFactorData,
    riskData,

    // =========================
    // INTERVENTION
    // =========================

    topRiskStudents,

    // =========================
    // INSIGHT KELAS
    // =========================

    topHighRiskClasses,
    topLowRiskClasses,

    // =========================
    // FILTER OPTIONS
    // =========================

    kelasOptions,
    mapelOptions,

    // =========================
    // SELECTED FILTER
    // =========================

    selectedKelas,
    setSelectedKelas,

    selectedMapel,
    setSelectedMapel,

    // =========================
    // STATE
    // =========================

    loading,
    error,
  };
}

export default useDashboardData;