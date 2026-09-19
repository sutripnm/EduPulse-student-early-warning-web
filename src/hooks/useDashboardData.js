import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getSchoolAnalytics,
  getCurrentUser,
} from "../services/api";

import teacherMapel from "../data/teacherMapel";

function useDashboardData() {
  const [dashboardData, setDashboardData] =
    useState(null);

  const [schoolAnalyticsData, setSchoolAnalyticsData] =
    useState(null);

  const [kelasOptions, setKelasOptions] =
    useState([]);

  const [mapelOptions, setMapelOptions] =
    useState([]);

  const [selectedKelas, setSelectedKelas] =
    useState("");

  const [selectedMapel, setSelectedMapel] =
    useState("");

  const [currentUser, setCurrentUser] =
    useState(null);

  const [userLoading, setUserLoading] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  // =========================================================
  // AMBIL USER YANG SEDANG LOGIN
  // =========================================================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result =
          await getCurrentUser();

        const user =
          result?.data || result;

        console.log(
          "USER LOGIN:",
          user
        );

        console.log(
          "ROLE USER:",
          user?.role
        );

        console.log(
          "EMAIL USER:",
          user?.email
        );

        setCurrentUser(user);
      } catch (error) {
        console.error(
          "Gagal mengambil user:",
          error.response?.data ||
            error.message
        );

        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // =========================================================
  // ROLE
  // =========================================================

  const isGuru =
    currentUser?.role === "GURU";

  const isAdmin =
    currentUser?.role === "ADMIN";

  // Kode mapel yang dimiliki guru
  const teacherMapelCode =
    isGuru
      ? teacherMapel[
          currentUser?.email
        ]
      : null;

  // =========================================================
  // DASHBOARD + ANALYTICS
  // =========================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      // Jangan request sebelum user diketahui
      if (
        userLoading ||
        !currentUser
      ) {
        return;
      }

      setLoading(true);
      setError(false);

      try {
        // =====================================================
        // ANALYTICS
        // =====================================================

        const analyticsResult =
          await getSchoolAnalytics({
            kelas_id:
              selectedKelas,
            mapel_id:
              selectedMapel,
          });

        let visibleMapelOptions = [];

        if (
          analyticsResult.success
        ) {
          setSchoolAnalyticsData(
            analyticsResult.data
          );

          // =========================
          // KELAS
          // =========================

          setKelasOptions(
            analyticsResult.data
              ?.filter_options
              ?.kelas || []
          );

          // =========================
          // MAPEL
          // =========================

          const allMapelOptions =
            (
              analyticsResult.data
                ?.filter_options
                ?.mapel || []
            ).filter(
              (mapel) =>
                mapel &&
                mapel.id &&
                mapel.nama_mapel &&
                mapel.nama_mapel
                  .trim()
                  .toLowerCase() !==
                  "string" &&
                (
                  !mapel.kode_mapel ||
                  mapel.kode_mapel
                    .trim()
                    .toLowerCase() !==
                    "string"
                )
            );

          // ===================================================
          // ADMIN
          // → SEMUA MAPEL
          // ===================================================

          if (isAdmin) {
            visibleMapelOptions =
              allMapelOptions;
          }

          // ===================================================
          // GURU
          // → HANYA MAPEL YANG DIA AJAR
          // ===================================================

          if (isGuru) {
            visibleMapelOptions =
              allMapelOptions.filter(
                (mapel) =>
                  String(
                    mapel.kode_mapel ||
                      ""
                  ).toUpperCase() ===
                  String(
                    teacherMapelCode ||
                      ""
                  ).toUpperCase()
              );
          }

          console.log(
            "SEMUA MAPEL:",
            allMapelOptions
          );

          console.log(
            "KODE MAPEL GURU:",
            teacherMapelCode
          );

          console.log(
            "MAPEL YANG DITAMPILKAN:",
            visibleMapelOptions
          );

          setMapelOptions(
            visibleMapelOptions
          );
        }

        // =====================================================
        // TENTUKAN MAPEL YANG AKTIF
        // =====================================================

        let activeMapelId =
          selectedMapel;

        // Guru belum punya selectedMapel
        // → otomatis gunakan mapel miliknya
        if (
          isGuru &&
          !selectedMapel &&
          visibleMapelOptions.length > 0
        ) {
          activeMapelId =
            String(
              visibleMapelOptions[0].id
            );

          setSelectedMapel(
            activeMapelId
          );
        }

        // =====================================================
        // SUMMARY
        // =====================================================

        const summaryResult =
          await getDashboardSummary({
            kelas_id:
              selectedKelas,
            mapel_id:
              activeMapelId,
          });

        if (
          summaryResult.success
        ) {
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
  }, [
    userLoading,
    currentUser,
    selectedKelas,
    selectedMapel,
    isGuru,
    isAdmin,
    teacherMapelCode,
  ]);

  // =========================================================
  // ANALYTICS
  // =========================================================

  const riskByClassData =
    schoolAnalyticsData
      ?.perbandingan_risiko_kelas ||
    [];

  const riskFactorData =
    schoolAnalyticsData
      ?.faktor_utama_risiko
      ?.map((item) => ({
        name: item.faktor,
        value: item.percentage,
      })) || [];

  // =========================================================
  // RISK DONUT
  // =========================================================

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

  // =========================================================
  // TOP INTERVENTION
  // =========================================================

  const topRiskStudents =
    dashboardData
      ?.top_intervensi || [];

  // =========================================================
  // INSIGHT KELAS - HIGH
  // =========================================================

  const topHighRiskClasses =
    dashboardData
      ?.insight_kelas
      ?.high_risk_terbanyak
      ?.map(
        (item) => ({
          className:
            item.nama_kelas,

          count:
            item.jumlah_siswa,
        })
      ) || [];

  // =========================================================
  // INSIGHT KELAS - LOW
  // =========================================================

  const topLowRiskClasses =
    dashboardData
      ?.insight_kelas
      ?.low_risk_terbanyak
      ?.map(
        (item) => ({
          className:
            item.nama_kelas,

          count:
            item.jumlah_siswa,
        })
      ) || [];

  // =========================================================
  // RETURN
  // =========================================================

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

    loading,
    error,
  };
}

export default useDashboardData;