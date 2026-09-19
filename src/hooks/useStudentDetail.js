import { useEffect, useState } from "react";

import {
  getCurrentUser,
  getStudentDetailRisk,
  getMapel,
  getSchoolAnalytics,
  getStudentDashboard,
  getParentDashboard,
  getStudentScores,
  getStudentPrediction,
  deleteStudent,
} from "../services/api";

import {
  normalizeStudentDashboard,
  normalizeParentDashboard,
} from "../utils/dashboardNormalize";

import teacherMapel from "../data/teacherMapel";

function useStudentDetail(nisn) {
  const [student, setStudent] =
    useState(null);

  const [mapelOptions, setMapelOptions] =
    useState([]);

  const [riskMapelOptions, setRiskMapelOptions] =
    useState([]);

  const [selectedMapel, setSelectedMapel] =
    useState("");

  const [overallRisk, setOverallRisk] =
    useState(null);

  const [latestWeek, setLatestWeek] =
    useState(null);

  const [recommendation, setRecommendation] =
    useState(null);

  const [recommendationLoading, setRecommendationLoading] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const [currentUser, setCurrentUser] =
    useState(null);

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
          "USER DETAIL:",
          user
        );

        console.log(
          "ROLE DETAIL:",
          user?.role
        );

        setCurrentUser(user);
      } catch (error) {
        console.error(
          "Gagal mengambil user:",
          error.response?.data ||
            error.message
        );

        setCurrentUser(null);
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

  const isAdmin =
    role === "ADMIN";

  const isGuru =
    role === "GURU";

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
  // MAPEL + RISIKO PER MAPEL
  // =========================================================

  useEffect(() => {
    const fetchMapelAndRisk =
      async () => {
        if (
          !nisn ||
          !currentUser?.role
        ) {
          return;
        }

        try {
          let mapelList = [];

          // =====================================================
          // ADMIN
          // =====================================================

          if (isAdmin) {
            const result =
              await getMapel();

            mapelList =
              (
                result?.results ||
                []
              ).filter(
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
          }

          // =====================================================
          // GURU
          // =====================================================
          // Endpoint /academic/mapel sebelumnya 403 untuk Guru.
          // Karena dashboard analytics bisa diakses Guru,
          // ambil daftar mapel dari filter_options.mapel.
          // =====================================================

          else if (isGuru) {
            const result =
              await getSchoolAnalytics({});

            const analyticsData =
              result?.data || {};

            const allMapel =
              (
                analyticsData
                  ?.filter_options
                  ?.mapel || []
              ).filter(
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

            mapelList =
              allMapel.filter(
                (mapel) => {
                  const kode =
                    String(
                      mapel.kode_mapel ||
                        mapel.kode ||
                        mapel.code ||
                        ""
                    )
                      .trim()
                      .toUpperCase();

                  const nama =
                    String(
                      mapel.nama_mapel ||
                        ""
                    )
                      .trim()
                      .toLowerCase();

                  const cocokKode =
                    guruMapelCode &&
                    kode ===
                      guruMapelCode
                        .trim()
                        .toUpperCase();

                  const cocokNama =
                    guruMapelName &&
                    nama ===
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

          // =====================================================
          // SISWA
          // =====================================================

          else if (
            role === "SISWA"
          ) {
            const result =
              await getStudentDashboard(
                nisn,
                ""
              );

            const normalized =
              normalizeStudentDashboard(
                result
              );

            mapelList =
              normalized
                ?.filter_opsi_mapel ||
              [];
          }

          // =====================================================
          // ORANG TUA
          // =====================================================

          else if (
            role === "ORANGTUA" ||
            role === "ORANG_TUA"
          ) {
            const result =
              await getParentDashboard(
                nisn,
                ""
              );

            const normalized =
              normalizeParentDashboard(
                result
              );

            mapelList =
              normalized
                ?.filter_opsi_mapel ||
              [];
          }

          else {
            setMapelOptions([]);
            setRiskMapelOptions([]);
            return;
          }

          // =====================================================
          // BERSIHKAN MAPEL
          // =====================================================

          mapelList =
            mapelList.filter(
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
            "MAPEL DETAIL:",
            mapelList
          );

          setMapelOptions(
            mapelList
          );

          // =====================================================
          // CEK RISIKO MASING-MASING MAPEL
          // =====================================================

          const riskResults =
            await Promise.all(
              mapelList.map(
                async (mapel) => {
                  try {
                    let statusRisk =
                      "LOW";

                    // -----------------------------------------
                    // ADMIN / GURU
                    // -----------------------------------------

                    if (
                      isAdmin ||
                      isGuru
                    ) {
                      const detail =
                        await getStudentDetailRisk({
                          nisn,
                          mapel_id:
                            mapel.id,
                        });

                      statusRisk =
                        detail?.data
                          ?.analisis_ews
                          ?.status_risiko ||
                        "LOW";
                    }

                    // -----------------------------------------
                    // SISWA
                    // -----------------------------------------

                    else if (
                      role ===
                      "SISWA"
                    ) {
                      const result =
                        await getStudentDashboard(
                          nisn,
                          mapel.id
                        );

                      const normalized =
                        normalizeStudentDashboard(
                          result
                        );

                      statusRisk =
                        normalized.status_risk ||
                        "LOW";
                    }

                    // -----------------------------------------
                    // ORANG TUA
                    // -----------------------------------------

                    else if (
                      role ===
                        "ORANGTUA" ||
                      role ===
                        "ORANG_TUA"
                    ) {
                      const result =
                        await getParentDashboard(
                          nisn,
                          mapel.id
                        );

                      const normalized =
                        normalizeParentDashboard(
                          result
                        );

                      statusRisk =
                        normalized.status_risk ||
                        "LOW";
                    }

                    return {
                      id:
                        mapel.id,

                      nama_mapel:
                        mapel.nama_mapel,

                      status_risiko:
                        statusRisk,
                    };
                  } catch (error) {
                    console.error(
                      `Gagal mengambil risiko ${mapel.nama_mapel}:`,
                      error.response
                        ?.data ||
                        error.message
                    );

                    return null;
                  }
                }
              )
            );

          const validRiskResults =
            riskResults.filter(
              Boolean
            );

          console.log(
            "RISIKO PER MAPEL:",
            validRiskResults
          );

          // =====================================================
          // RISIKO TERTINGGI
          // HIGH > MEDIUM > LOW
          // =====================================================

          const hasHigh =
            validRiskResults.some(
              (item) => {
                const status =
                  String(
                    item.status_risiko ||
                      ""
                  ).toUpperCase();

                return (
                  status ===
                    "HIGH" ||
                  status ===
                    "TINGGI"
                );
              }
            );

          const hasMedium =
            validRiskResults.some(
              (item) => {
                const status =
                  String(
                    item.status_risiko ||
                      ""
                  ).toUpperCase();

                return (
                  status ===
                    "MEDIUM" ||
                  status ===
                    "SEDANG"
                );
              }
            );

          let highestRisk =
            "LOW";

          if (hasHigh) {
            highestRisk =
              "HIGH";
          } else if (
            hasMedium
          ) {
            highestRisk =
              "MEDIUM";
          }

          setOverallRisk(
            highestRisk
          );

          // =====================================================
          // URUTKAN MAPEL
          // HIGH → MEDIUM → LOW
          // =====================================================

          const priority = {
            HIGH: 1,
            TINGGI: 1,
            MEDIUM: 2,
            SEDANG: 2,
            LOW: 3,
            RENDAH: 3,
          };

          const filteredRiskMapel =
            [...validRiskResults].sort(
              (a, b) => {
                const aPriority =
                  priority[
                    String(
                      a.status_risiko ||
                        ""
                    ).toUpperCase()
                  ] || 99;

                const bPriority =
                  priority[
                    String(
                      b.status_risiko ||
                        ""
                    ).toUpperCase()
                  ] || 99;

                return (
                  aPriority -
                  bPriority
                );
              }
            );

          setRiskMapelOptions(
            filteredRiskMapel
          );

          // =====================================================
          // OTOMATIS PILIH MAPEL
          // =====================================================
          // Guru hanya punya satu mapel,
          // jadi otomatis memilih mapel tersebut.
          //
          // Admin juga otomatis memilih mapel
          // dengan risiko tertinggi.
          // =====================================================

          if (
            filteredRiskMapel.length >
            0
          ) {
            setSelectedMapel(
              String(
                filteredRiskMapel[0].id
              )
            );
          } else {
            setSelectedMapel("");
          }
        } catch (error) {
          console.error(
            "Gagal mengambil mapel dan risiko:",
            error.response?.data ||
              error.message
          );

          setMapelOptions([]);
          setRiskMapelOptions([]);
          setOverallRisk(null);
        }
      };

    fetchMapelAndRisk();
  }, [
    nisn,
    currentUser?.role,
    isAdmin,
    isGuru,
    guruMapelCode,
    guruMapelName,
  ]);

  // =========================================================
  // DETAIL SISWA
  // =========================================================

  useEffect(() => {
    const fetchStudentDetail =
      async () => {
        if (
          !nisn ||
          !currentUser?.role
        ) {
          return;
        }

        setLoading(true);
        setError(false);

        try {
          let finalStudent = null;

          // ===================================================
          // ADMIN / GURU
          // ===================================================

          if (
            isAdmin ||
            isGuru
          ) {
            const result =
              await getStudentDetailRisk({
                nisn,
                mapel_id:
                  selectedMapel,
              });

            if (
              !result?.success
            ) {
              setError(true);
              return;
            }

            finalStudent =
              result.data;

            // Kalau belum ada mapel,
            // pakai overall risk.
            if (
              !selectedMapel
            ) {
              finalStudent = {
                ...result.data,

                analisis_ews: {
                  ...result.data
                    ?.analisis_ews,

                  status_risiko:
                    overallRisk ||
                    result.data
                      ?.analisis_ews
                      ?.status_risiko,
                },
              };
            }
          }

          // ===================================================
          // SISWA
          // ===================================================

          else if (
            role === "SISWA"
          ) {
            const result =
              await getStudentDashboard(
                nisn,
                selectedMapel
              );

            finalStudent = {
              profil_siswa:
                {
                  nisn:
                    result?.data
                      ?.profil?.nisn,
                  nama_siswa:
                    result?.data
                      ?.profil
                      ?.nama ||
                    result?.data
                      ?.profil
                      ?.nama_siswa,
                  kelas:
                    result?.data
                      ?.profil
                      ?.kelas,
                },

              analisis_ews: {
                status_risiko:
                  result?.data
                    ?.status_risk,
              },

              metrik_kinerja: {},
            };
          }

          // ===================================================
          // ORANG TUA
          // ===================================================

          else if (
            role ===
              "ORANGTUA" ||
            role ===
              "ORANG_TUA"
          ) {
            const result =
              await getParentDashboard(
                nisn,
                selectedMapel
              );

            finalStudent = {
              profil_siswa:
                {
                  nisn:
                    result?.data
                      ?.profil?.nisn,
                  nama_siswa:
                    result?.data
                      ?.profil
                      ?.nama ||
                    result?.data
                      ?.profil
                      ?.nama_siswa,
                  kelas:
                    result?.data
                      ?.profil
                      ?.kelas,
                },

              analisis_ews: {
                status_risiko:
                  result?.data
                    ?.status_risk,
              },

              metrik_kinerja: {},
            };
          }

          if (!finalStudent) {
            setError(true);
            return;
          }

          setStudent(
            finalStudent
          );
        } catch (error) {
          console.error(
            "Gagal mengambil detail siswa:",
            error.response?.data ||
              error.message
          );

          setError(true);
        } finally {
          setLoading(false);
        }
      };

    fetchStudentDetail();
  }, [
    nisn,
    currentUser?.role,
    selectedMapel,
    overallRisk,
    isAdmin,
    isGuru,
  ]);

  // =========================================================
  // CARI MINGGU TERBARU
  // =========================================================

  useEffect(() => {
    const fetchLatestWeek =
      async () => {
        if (
          !nisn ||
          !selectedMapel
        ) {
          setLatestWeek(null);
          setRecommendation(null);
          return;
        }

        // Rekomendasi AI hanya untuk
        // Admin dan Guru.
        if (
          !isAdmin &&
          !isGuru
        ) {
          setLatestWeek(null);
          setRecommendation(null);
          return;
        }

        try {
          const result =
            await getStudentScores({
              nisn,
              mapel_id:
                selectedMapel,
            });

          const scores =
            result?.data || [];

          if (
            scores.length ===
            0
          ) {
            setLatestWeek(null);
            return;
          }

          const weeks =
            scores
              .map((item) =>
                Number(
                  item.minggu_ke
                )
              )
              .filter(
                (week) =>
                  !Number.isNaN(
                    week
                  )
              );

          const latest =
            weeks.length > 0
              ? Math.max(
                  ...weeks
                )
              : null;

          setLatestWeek(
            latest
          );

          console.log(
            "MINGGU TERBARU:",
            latest
          );
        } catch (error) {
          console.error(
            "Gagal mengambil nilai siswa:",
            error.response?.data ||
              error.message
          );

          setLatestWeek(null);
        }
      };

    fetchLatestWeek();
  }, [
    nisn,
    selectedMapel,
    isAdmin,
    isGuru,
  ]);

  // =========================================================
  // REKOMENDASI OTOMATIS
  // =========================================================

  useEffect(() => {
    const fetchRecommendation =
      async () => {
        if (
          !nisn ||
          !selectedMapel ||
          !latestWeek
        ) {
          setRecommendation(null);
          return;
        }

        if (
          !isAdmin &&
          !isGuru
        ) {
          setRecommendation(null);
          return;
        }

        setRecommendationLoading(
          true
        );

        try {
          const result =
            await getStudentPrediction({
              nisn,
              mapel_id:
                selectedMapel,
              minggu_ke:
                latestWeek,
            });

          console.log(
            "HASIL REKOMENDASI:",
            result
          );

          if (
            result?.success
          ) {
            setRecommendation(
              result.data
                ?.recommendation ||
                null
            );
          } else {
            setRecommendation(
              null
            );
          }
        } catch (error) {
          console.error(
            "Gagal mengambil rekomendasi AI:",
            error.response?.data ||
              error.message
          );

          setRecommendation(
            null
          );
        } finally {
          setRecommendationLoading(
            false
          );
        }
      };

    fetchRecommendation();
  }, [
    nisn,
    selectedMapel,
    latestWeek,
    isAdmin,
    isGuru,
  ]);

  // =========================================================
  // DELETE SISWA
  // =========================================================

  const handleDeleteStudent =
    async () => {
      // Guru tidak boleh menghapus siswa.
      if (!isAdmin) {
        console.warn(
          "Role ini tidak memiliki izin menghapus siswa."
        );
        return;
      }

      const confirmed =
        window.confirm(
          `Yakin ingin menghapus siswa ${
            student?.profil_siswa
              ?.nama_siswa ||
            ""
          }?`
        );

      if (!confirmed) {
        return;
      }

      setDeleteLoading(
        true
      );

      try {
        const result =
          await deleteStudent(
            nisn
          );

        console.log(
          "HASIL DELETE SISWA:",
          result
        );

        if (
          result?.success
        ) {
          alert(
            result.message ||
              "Siswa berhasil dihapus."
          );

          window.location.href =
            "/daftar-siswa";
        } else {
          alert(
            result.message ||
              "Gagal menghapus siswa."
          );
        }
      } catch (error) {
        console.error(
          "Gagal menghapus siswa:",
          error.response?.data ||
            error.message
        );

        alert(
          error.response?.data
            ?.message ||
            "Gagal menghapus siswa."
        );
      } finally {
        setDeleteLoading(
          false
        );
      }
    };

  // =========================================================
  // RETURN
  // =========================================================

  return {
    student,

    mapelOptions,
    riskMapelOptions,
    overallRisk,

    selectedMapel,
    setSelectedMapel,

    latestWeek,

    recommendation,
    recommendationLoading,

    handleDeleteStudent,
    deleteLoading,

    loading,
    error,

    currentUser,
    isAdmin,
    isGuru,
  };
}

export default useStudentDetail;