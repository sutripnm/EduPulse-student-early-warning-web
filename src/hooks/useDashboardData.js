import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getSchoolAnalytics,
} from "../services/api";

import useCurrentUser from "./useCurrentUser";
import {
  filterValidKelas,
  getTeacherMapel,
  getVisibleMapelOptions,
} from "../utils/academic";

/**
 * Mengubah data insight kelas dari API menjadi bentuk yang dipakai komponen.
 */
function mapClassInsights(items = []) {
  return items.map((item) => ({
    className: item.nama_kelas,
    count: item.jumlah_siswa,
  }));
}

/**
 * Mengelola seluruh data dashboard admin/guru, termasuk filter dan analytics.
 */
function useDashboardData() {
  const { user: currentUser, loading: userLoading } = useCurrentUser();

  const [dashboardData, setDashboardData] = useState(null);
  const [schoolAnalyticsData, setSchoolAnalyticsData] = useState(null);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedMapel, setSelectedMapel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const role = String(currentUser?.role || "").toUpperCase();
  const isGuru = role === "GURU";
  const isAdmin = role === "ADMIN";
  const guruMapel = getTeacherMapel(currentUser);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil analytics, menyiapkan opsi filter, lalu mengambil ringkasan dashboard.
     */
    const fetchDashboard = async () => {
      if (userLoading || !currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const analyticsResult = await getSchoolAnalytics({
          kelas_id: selectedKelas,
          mapel_id: selectedMapel,
        });

        const analyticsData = analyticsResult?.data || {};
        const filterOptions = analyticsData?.filter_options || {};
        const visibleMapelOptions = getVisibleMapelOptions(
          filterOptions.mapel,
          {
            isAdmin,
            isGuru,
            teacherMapel: guruMapel,
          }
        );

        if (!isMounted) return;

        setSchoolAnalyticsData(analyticsData);
        setKelasOptions(filterValidKelas(filterOptions.kelas));
        setMapelOptions(visibleMapelOptions);

        let activeMapelId = selectedMapel;

        // Guru otomatis memakai mapel yang ditetapkan jika belum memilih filter.
        if (
          isGuru &&
          !selectedMapel &&
          visibleMapelOptions.length > 0
        ) {
          activeMapelId = String(visibleMapelOptions[0].id);
          setSelectedMapel(activeMapelId);
        }

        const summaryResult = await getDashboardSummary({
          kelas_id: selectedKelas,
          mapel_id: activeMapelId,
        });

        if (!isMounted) return;

        if (summaryResult?.success) {
          setDashboardData(summaryResult.data);
        }
      } catch (requestError) {
        console.error(
          "Gagal mengambil dashboard:",
          requestError.response?.data || requestError.message
        );

        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, [
    userLoading,
    currentUser,
    selectedKelas,
    selectedMapel,
    isGuru,
    isAdmin,
    guruMapel,
  ]);

  const riskByClassData =
    schoolAnalyticsData?.perbandingan_risiko_kelas || [];

  const riskFactorData =
    schoolAnalyticsData?.faktor_utama_risiko?.map((item) => ({
      name: item.faktor,
      value: item.percentage,
    })) || [];

  const riskData = [
    {
      name: "Rendah",
      value: dashboardData?.proporsi_risiko?.rendah?.percentage || 0,
    },
    {
      name: "Sedang",
      value: dashboardData?.proporsi_risiko?.sedang?.percentage || 0,
    },
    {
      name: "Tinggi",
      value: dashboardData?.proporsi_risiko?.tinggi?.percentage || 0,
    },
  ];

  const topRiskStudents = dashboardData?.top_intervensi || [];

  const topHighRiskClasses = mapClassInsights(
    dashboardData?.insight_kelas?.high_risk_terbanyak
  );

  const topLowRiskClasses = mapClassInsights(
    dashboardData?.insight_kelas?.low_risk_terbanyak
  );

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
    currentUser,
    isGuru,
    isAdmin,
    loading: loading || userLoading,
    error,
  };
}

export default useDashboardData;
