import { useEffect, useState } from "react";

import {
  getMapel,
  getSchoolAnalytics,
  getStudentDetailRisk,
} from "../services/api";

import {
  filterValidMapel,
  getTeacherMapel,
  getVisibleMapelOptions,
} from "../utils/academic";

import { getRiskPriority } from "../utils/risk";
import { getRoleDashboardConfig } from "../utils/dashboardRole";

/**
 * Mengambil opsi mapel beserta risiko per mapel sesuai role pengguna.
 * Hook ini memusatkan logika yang sebelumnya berada langsung di
 * useStudentDetail.
 */
function useStudentRiskMapel({ nisn, currentUser }) {
  const [mapelOptions, setMapelOptions] = useState([]);
  const [riskMapelOptions, setRiskMapelOptions] = useState([]);
  const [overallRisk, setOverallRisk] = useState(null);
  const [selectedMapel, setSelectedMapel] = useState("");
  const [loading, setLoading] = useState(true);

  const role = String(currentUser?.role || "").toUpperCase();
  const isAdmin = role === "ADMIN";
  const isGuru = role === "GURU";
  const teacherSubject = getTeacherMapel(currentUser);
  const roleDashboard = getRoleDashboardConfig(role);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil daftar mapel yang tersedia untuk role aktif.
     */
    const loadMapelOptions = async () => {
      setLoading(true);
      setSelectedMapel("");

      if (!nisn || !role) {
        setMapelOptions([]);
        setRiskMapelOptions([]);
        setOverallRisk(null);
        setLoading(false);
        return;
      }

      try {
        let mapelList = [];

        if (isAdmin) {
          const result = await getMapel();
          mapelList = filterValidMapel(result?.results);
        } else if (isGuru) {
          const result = await getSchoolAnalytics({});
          mapelList = getVisibleMapelOptions(
            result?.data?.filter_options?.mapel,
            {
              isAdmin,
              isGuru,
              teacherMapel: teacherSubject,
            }
          );
        } else if (roleDashboard) {
          const result = await roleDashboard.fetchDashboard(nisn, "");
          mapelList = filterValidMapel(
            roleDashboard.normalizeDashboard(result)?.filter_opsi_mapel
          );
        }

        if (!isMounted) return;

        setMapelOptions(mapelList);

        /**
         * Mengambil risiko tiap mapel secara paralel agar loading lebih cepat.
         */
        const riskResults = await Promise.all(
          mapelList.map(async (mapel) => {
            try {
              let statusRisk = "LOW";

              if (isAdmin || isGuru) {
                const detail = await getStudentDetailRisk({
                  nisn,
                  mapel_id: mapel.id,
                });

                statusRisk =
                  detail?.data?.analisis_ews?.status_risiko || "LOW";
              } else if (roleDashboard) {
                const result = await roleDashboard.fetchDashboard(
                  nisn,
                  mapel.id
                );
                statusRisk =
                  roleDashboard.normalizeDashboard(result)?.status_risk ||
                  "LOW";
              }

              return {
                id: mapel.id,
                nama_mapel: mapel.nama_mapel,
                status_risiko: statusRisk,
              };
            } catch (error) {
              console.error(
                `Gagal mengambil risiko ${mapel.nama_mapel}:`,
                error.response?.data || error.message
              );
              return null;
            }
          })
        );

        if (!isMounted) return;

        const sortedRiskMapel = riskResults
          .filter(Boolean)
          .sort(
            (a, b) =>
              getRiskPriority(a.status_risiko) -
              getRiskPriority(b.status_risiko)
          );

        setRiskMapelOptions(sortedRiskMapel);

        if (sortedRiskMapel.length > 0) {
          setSelectedMapel(String(sortedRiskMapel[0].id));
        }

        const hasHighRisk = sortedRiskMapel.some(
          (item) => getRiskPriority(item.status_risiko) === 1
        );

        const hasMediumRisk = sortedRiskMapel.some(
          (item) => getRiskPriority(item.status_risiko) === 2
        );

        setOverallRisk(
          hasHighRisk
            ? "HIGH"
            : hasMediumRisk
              ? "MEDIUM"
              : sortedRiskMapel.length
                ? "LOW"
                : null
        );
      } catch (error) {
        console.error(
          "Gagal mengambil mapel dan risiko:",
          error.response?.data || error.message
        );

        if (!isMounted) return;

        setMapelOptions([]);
        setRiskMapelOptions([]);
        setOverallRisk(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMapelOptions();

    return () => {
      isMounted = false;
    };
  }, [nisn, role, isAdmin, isGuru, teacherSubject, roleDashboard]);

  return {
    mapelOptions,
    riskMapelOptions,
    overallRisk,
    selectedMapel,
    setSelectedMapel,
    loading,
  };
}

export default useStudentRiskMapel;
