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
  // USER LOGIN
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

  const role = String(
    currentUser?.role || ""
  ).toUpperCase();

  const isGuru =
    role === "GURU";

  const isAdmin =
    role === "ADMIN";

  // =========================================================
  // MAPEL GURU
  // =========================================================

  const guruMapel =
    isGuru
      ? teacherMapel[
          currentUser?.email
        ]
      : null;

  const guruMapelCode =
    guruMapel?.kode || "";

  const guruMapelName =
    guruMapel?.nama || "";

  // =========================================================
  // DASHBOARD + ANALYTICS
  // =========================================================

  useEffect(() => {
    const fetchDashboard = async () => {
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
          const analyticsData =
            analyticsResult.data;

          setSchoolAnalyticsData(
            analyticsData
          );

          // ===================================================
          // FILTER KELAS
          // ===================================================

          const rawKelasOptions =
            analyticsData
              ?.filter_options
              ?.kelas || [];

          const cleanedKelasOptions =
            rawKelasOptions.filter(
              (kelas) =>
                kelas &&
                kelas.id &&
                kelas.nama_kelas &&
                String(
                  kelas.nama_kelas
                )
                  .trim()
                  .toLowerCase() !==
                  "string"
            );

          setKelasOptions(
            cleanedKelasOptions
          );

          // ===================================================
          // FILTER MAPEL
          // ===================================================

          const rawMapelOptions =
            analyticsData
              ?.filter_options
              ?.mapel || [];

          const cleanedMapelOptions =
            rawMapelOptions.filter(
              (mapel) =>
                mapel &&
                mapel.id &&
                mapel.nama_mapel &&
                String(
                  mapel.nama_mapel
                )
                  .trim()
                  .toLowerCase() !==
                  "string"
            );

          console.log(
            "SEMUA MAPEL DARI API:",
            cleanedMapelOptions
          );

          // ===================================================
          // ADMIN
          // ===================================================

          if (isAdmin) {
            visibleMapelOptions =
              cleanedMapelOptions;
          }

          // ===================================================
          // GURU
          // ===================================================

          if (isGuru) {
            visibleMapelOptions =
              cleanedMapelOptions.filter(
                (mapel) => {
                  const kodeMapel =
                    String(
                      mapel.kode_mapel ||
                        mapel.kode ||
                        mapel.code ||
                        ""
                    )
                      .trim()
                      .toUpperCase();

                  const namaMapel =
                    String(
                      mapel.nama_mapel ||
                        ""
                    )
                      .trim()
                      .toLowerCase();

                  const cocokKode =
                    guruMapelCode &&
                    kodeMapel ===
                      guruMapelCode
                        .trim()
                        .toUpperCase();

                  const cocokNama =
                    guruMapelName &&
                    namaMapel ===
                      guruMapelName
                        .trim()
                        .toLowerCase();

                  return (
                    cocokKode ||
                    cocokNama
                  );
                }
              );
          }

          console.log(
            "MAPEL GURU:",
            guruMapel
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
        // TENTUKAN MAPEL AKTIF
        // =====================================================

        let activeMapelId =
          selectedMapel;

        // Guru:
        // kalau belum memilih mapel,
        // otomatis pilih mapel miliknya.
        if (
          isGuru &&
          !selectedMapel &&
          visibleMapelOptions.length >
            0
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
    guruMapelCode,
    guruMapelName,
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