import { useEffect, useState } from "react";

import {
  deleteStudent,
  getStudentDetailRisk,
} from "../services/api";

import {
} from "../utils/dashboardNormalize";

import useCurrentUser from "./useCurrentUser";
import useStudentRecommendation from "./useStudentRecommendation";
import useStudentRiskMapel from "./useStudentRiskMapel";
import { getRoleDashboardConfig } from "../utils/dashboardRole";

/**
 * Mengelola seluruh kebutuhan halaman detail siswa:
 * profil, risiko per mapel, rekomendasi, dan aksi hapus siswa.
 */
function useStudentDetail(nisn) {
  const { user: currentUser, loading: userLoading } = useCurrentUser();

  const {
    mapelOptions,
    riskMapelOptions,
    overallRisk,
    selectedMapel,
    setSelectedMapel,
  } = useStudentRiskMapel({
    nisn,
    currentUser,
  });

  const role = String(currentUser?.role || "").toUpperCase();
  const isAdmin = role === "ADMIN";
  const isGuru = role === "GURU";
  const canUseRecommendation = isAdmin || isGuru;

  const {
    latestWeek,
    recommendation,
    recommendationLoading,
  } = useStudentRecommendation({
    nisn,
    mapelId: selectedMapel,
    enabled: canUseRecommendation,
  });

  const [student, setStudent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil detail siswa sesuai role dan mapel yang aktif.
     */
    const fetchStudentDetail = async () => {
      if (userLoading || !nisn || !role) {
        return;
      }

      setLoading(true);
      setError(false);

      try {
        let finalStudent = null;

        if (isAdmin || isGuru) {
          const result = await getStudentDetailRisk({
            nisn,
            mapel_id: selectedMapel,
          });

          if (!result?.success) {
            throw new Error(
              result?.message || "Detail siswa tidak tersedia."
            );
          }

          finalStudent = result.data;

          // Saat belum ada mapel aktif, tampilkan risiko keseluruhan.
          if (!selectedMapel) {
            finalStudent = {
              ...result.data,
              analisis_ews: {
                ...result.data?.analisis_ews,
                status_risiko:
                  overallRisk ||
                  result.data?.analisis_ews?.status_risiko,
              },
            };
          }
        } else {
          const roleDashboard = getRoleDashboardConfig(role);

          if (roleDashboard) {
            const result = await roleDashboard.fetchDashboard(
              nisn,
              selectedMapel
            );
            const profile = result?.data?.profil || {};
            const normalized = roleDashboard.normalizeDashboard(result);

            finalStudent = {
              profil_siswa: {
                nisn: profile.nisn,
                nama_siswa: profile.nama || profile.nama_siswa,
                kelas: profile.kelas,
              },
              analisis_ews: {
                status_risiko:
                  result?.data?.status_risk ??
                  normalized?.status_risk,
              },
              metrik_kinerja: {},
            };
          }
        }

        if (!finalStudent) {
          throw new Error("Detail siswa tidak tersedia.");
        }

        if (isMounted) {
          setStudent(finalStudent);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil detail siswa:",
          error.response?.data || error.message
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

    fetchStudentDetail();

    return () => {
      isMounted = false;
    };
  }, [
    nisn,
    role,
    selectedMapel,
    overallRisk,
    isAdmin,
    isGuru,
    userLoading,
  ]);

  /**
   * Menghapus siswa setelah Admin mengonfirmasi tindakan.
   */
  const handleDeleteStudent = async () => {
    if (!isAdmin) {
      return;
    }

    const confirmed = window.confirm(
      `Yakin ingin menghapus siswa ${
        student?.profil_siswa?.nama_siswa || ""
      }?`
    );

    if (!confirmed) {
      return;
    }

    setDeleteLoading(true);

    try {
      const result = await deleteStudent(nisn);

      if (result?.success) {
        alert(result.message || "Siswa berhasil dihapus.");
        window.location.href = "/daftar-siswa";
        return;
      }

      alert(result?.message || "Gagal menghapus siswa.");
    } catch (error) {
      console.error(
        "Gagal menghapus siswa:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Gagal menghapus siswa."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

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
