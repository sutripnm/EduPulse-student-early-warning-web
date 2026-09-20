import { useEffect, useState } from "react";
import { getRiskPriority } from "../utils/risk";

/**
 * Menyatukan pola dashboard siswa dan orang tua: mengambil mapel, menghitung
 * risiko per mapel, memilih mapel awal, lalu menyediakan dashboard aktif.
 */
function useDashboardByStudent({
  studentNisn,
  fetchDashboard,
  normalizeDashboard,
  dummyDashboard,
  errorLabel,
}) {
  const [selectedMapel, setSelectedMapel] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [riskMapelOptions, setRiskMapelOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [isDummy, setIsDummy] = useState(false);
  const [initialDashboard, setInitialDashboard] = useState(null);
  const [dashboardByMapel, setDashboardByMapel] = useState({});

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil dashboard awal dan dashboard tiap mapel secara paralel.
     * Hasilnya disimpan sebagai cache agar mapel aktif tidak di-fetch dua kali.
     */
    const fetchMapelRisk = async () => {
      setOptionsLoading(true);
      setSelectedMapel("");
      setRiskMapelOptions([]);
      setInitialDashboard(null);
      setDashboardByMapel({});

      if (!studentNisn) {
        setDashboard(null);
        setIsDummy(false);
        setDashboardLoading(false);
        setOptionsLoading(false);
        return;
      }

      try {
        const result = await fetchDashboard(studentNisn, "");
        const normalized = normalizeDashboard(result);
        const mapelList = normalized?.filter_opsi_mapel || [];

        const riskResults = await Promise.all(
          mapelList.map(async (mapel) => {
            try {
              const mapelResult = await fetchDashboard(
                studentNisn,
                mapel.id
              );
              const normalizedMapel = normalizeDashboard(mapelResult);

              return {
                id: String(mapel.id),
                nama_mapel: mapel.nama_mapel,
                status_risiko: normalizedMapel?.status_risk || "LOW",
                dashboard: normalizedMapel,
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

        const sortedRiskOptions = riskResults
          .filter(Boolean)
          .sort(
            (a, b) =>
              getRiskPriority(a.status_risiko) -
              getRiskPriority(b.status_risiko)
          );

        const dashboardCache = Object.fromEntries(
          sortedRiskOptions.map((item) => [item.id, item.dashboard])
        );

        setRiskMapelOptions(
          sortedRiskOptions.map(({ id, nama_mapel, status_risiko }) => ({
            id,
            nama_mapel,
            status_risiko,
          }))
        );
        setDashboardByMapel(dashboardCache);
        setInitialDashboard(normalized);

        if (sortedRiskOptions.length > 0) {
          setSelectedMapel(String(sortedRiskOptions[0].id));
        }

        setIsDummy(false);
      } catch (error) {
        console.error(
          `Gagal mengambil ${errorLabel}:`,
          error.response?.data || error.message
        );

        if (!isMounted) return;

        setRiskMapelOptions([]);
        setSelectedMapel("");
        setInitialDashboard(null);
        setDashboardByMapel({});
        setDashboard(dummyDashboard);
        setIsDummy(true);
        setDashboardLoading(false);
      } finally {
        if (isMounted) {
          setOptionsLoading(false);
        }
      }
    };

    fetchMapelRisk();

    return () => {
      isMounted = false;
    };
  }, [studentNisn, fetchDashboard, normalizeDashboard, errorLabel]);

  useEffect(() => {
    let isMounted = true;

    /**
     * Menentukan dashboard aktif dari cache atau mengambilnya dari API bila
     * belum pernah dimuat.
     */
    const fetchActiveDashboard = async () => {
      if (!studentNisn || optionsLoading) {
        return;
      }

      if (!selectedMapel && initialDashboard) {
        setDashboard(initialDashboard);
        setIsDummy(false);
        setDashboardLoading(false);
        return;
      }

      const cachedDashboard = dashboardByMapel[selectedMapel];

      if (selectedMapel && cachedDashboard) {
        setDashboard(cachedDashboard);
        setIsDummy(false);
        setDashboardLoading(false);
        return;
      }

      setDashboardLoading(true);

      try {
        const result = await fetchDashboard(
          studentNisn,
          selectedMapel
        );

        if (!isMounted) return;

        setDashboard(normalizeDashboard(result));
        setIsDummy(false);
      } catch (error) {
        console.error(
          `Gagal mengambil ${errorLabel}:`,
          error.response?.data || error.message
        );

        if (!isMounted) return;

        setDashboard(dummyDashboard);
        setIsDummy(true);
      } finally {
        if (isMounted) {
          setDashboardLoading(false);
        }
      }
    };

    fetchActiveDashboard();

    return () => {
      isMounted = false;
    };
  }, [
    studentNisn,
    selectedMapel,
    optionsLoading,
    initialDashboard,
    dashboardByMapel,
    fetchDashboard,
    normalizeDashboard,
    dummyDashboard,
    errorLabel,
  ]);

  return {
    studentNisn,
    selectedMapel,
    setSelectedMapel,
    dashboard,
    riskMapelOptions,
    loading: optionsLoading || dashboardLoading,
    isDummy,
  };
}

export default useDashboardByStudent;
