import { useEffect, useState } from "react";

import {
  getStudentDetailRisk,
  getMapel,
  getStudentScores,
  getStudentPrediction,
  deleteStudent,
} from "../services/api";

function useStudentDetail(nisn) {
  const [student, setStudent] = useState(null);

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

  // =========================
  // MAPEL + RISIKO PER MAPEL
  // =========================

  useEffect(() => {
    const fetchMapelAndRisk = async () => {
      if (!nisn) {
        return;
      }

      try {
        const result = await getMapel();

        const mapelList = (
          result.results || []
        ).filter(
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
                .toLowerCase() !==
                "string"
            )
        );

        setMapelOptions(mapelList);

        // =========================
        // CEK RISIKO SETIAP MAPEL
        // =========================

        const riskResults =
          await Promise.all(
            mapelList.map(
              async (mapel) => {
                try {
                  const detail =
                    await getStudentDetailRisk({
                      nisn,
                      mapel_id:
                        mapel.id,
                    });

                  return {
                    id: mapel.id,
                    nama_mapel:
                      mapel.nama_mapel,
                    status_risiko:
                      detail?.data
                        ?.analisis_ews
                        ?.status_risiko ||
                      "LOW",
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

        // =========================
        // TENTUKAN RISIKO TERTINGGI
        // =========================

        const hasHigh =
          validRiskResults.some(
            (item) =>
              String(
                item.status_risiko
              ).toUpperCase() ===
                "HIGH" ||
              String(
                item.status_risiko
              ).toUpperCase() ===
                "TINGGI"
          );

        const hasMedium =
          validRiskResults.some(
            (item) =>
              String(
                item.status_risiko
              ).toUpperCase() ===
                "MEDIUM" ||
              String(
                item.status_risiko
              ).toUpperCase() ===
                "SEDANG"
          );

        let highestRisk = "LOW";

        if (hasHigh) {
          highestRisk = "HIGH";
        } else if (hasMedium) {
          highestRisk = "MEDIUM";
        }

        setOverallRisk(
          highestRisk
        );

        // =========================
        // HANYA TAMPILKAN
        // HIGH / MEDIUM
        // =========================

        const filteredRiskMapel =
          validRiskResults
            .filter((item) => {
              const status =
                String(
                  item.status_risiko || ""
                ).toUpperCase();

              return (
                status === "HIGH" ||
                status === "TINGGI" ||
                status === "MEDIUM" ||
                status === "SEDANG" ||
                status === "LOW" ||
                status === "RENDAH"
              );
            })
            .sort((a, b) => {
              const priority = {
                HIGH: 1,
                TINGGI: 1,
                MEDIUM: 2,
                SEDANG: 2,
              };

              const aPriority =
                priority[
                  String(
                    a.status_risiko
                  ).toUpperCase()
                ] || 99;

              const bPriority =
                priority[
                  String(
                    b.status_risiko
                  ).toUpperCase()
                ] || 99;

              return (
                aPriority -
                bPriority
              );
            });

        setRiskMapelOptions(
          filteredRiskMapel
        );

        // =========================
        // OTOMATIS PILIH MAPEL
        // =========================

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
          // Semua LOW
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
  }, [nisn]);

  // =========================
  // DETAIL SISWA
  // =========================

  useEffect(() => {
    const fetchStudentDetail = async () => {
      if (!nisn) {
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const result =
          await getStudentDetailRisk({
            nisn,
            mapel_id:
              selectedMapel,
          });

        if (!result.success) {
          setError(true);
          return;
        }

        let finalStudent =
          result.data;

        // =========================
        // BELUM ADA MAPEL TERPILIH
        // =========================
        // Semua mapel LOW
        // → gunakan overallRisk
        // =========================

        if (!selectedMapel) {
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

    // Jangan request sampai
    // proses mapel selesai menentukan
    // kondisi awal.
    if (
      nisn &&
      mapelOptions.length > 0
    ) {
      fetchStudentDetail();
    }
  }, [
    nisn,
    selectedMapel,
    mapelOptions.length,
    overallRisk,
  ]);

  // =========================
  // CARI MINGGU TERBARU
  // =========================

  useEffect(() => {
    const fetchLatestWeek = async () => {
      if (
        !nisn ||
        !selectedMapel
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
          result.data || [];

        console.log(
          "HASIL GET NILAI:",
          result
        );

        console.log(
          "DATA SCORES:",
          scores
        );

        console.log(
          "WEEKS:",
          scores.map(
            (item) =>
              item.minggu_ke
          )
        );

        if (
          scores.length === 0
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
                !Number.isNaN(week)
            );

        const latest =
          weeks.length > 0
            ? Math.max(...weeks)
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
  ]);

  // =========================
// AMBIL REKOMENDASI OTOMATIS
// =========================

useEffect(() => {
  const fetchRecommendation = async () => {
    // Belum ada mapel atau minggu terbaru
    if (!nisn || !selectedMapel || !latestWeek) {
      setRecommendation(null);
      return;
    }

    setRecommendationLoading(true);

    try {
      console.log(
        "REKOMENDASI OTOMATIS"
      );

      console.log(
        "NISN:",
        nisn
      );

      console.log(
        "MAPEL:",
        selectedMapel
      );

      console.log(
        "MINGGU:",
        latestWeek
      );

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

      if (result.success) {
        setRecommendation(
          result.data?.recommendation ||
            null
        );
      } else {
        setRecommendation(null);
      }

    } catch (error) {
      console.error(
        "Gagal mengambil rekomendasi AI:",
        error.response?.data ||
          error.message
      );

      setRecommendation(null);

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
]);

  // =========================
  // DELETE SISWA
  // =========================

  const handleDeleteStudent =
    async () => {
      const confirmed =
        window.confirm(
          `Yakin ingin menghapus siswa ${
            student?.profil_siswa
              ?.nama_siswa || ""
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
          result.success
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

  // =========================
  // RETURN
  // =========================

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
  };
}

export default useStudentDetail;