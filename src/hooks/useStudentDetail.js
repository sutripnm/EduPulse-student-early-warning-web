import { useEffect, useState } from "react";
import {
  getStudentDetailRisk,
  getMapel,
  getStudentScores,
  getStudentPrediction,
  getStudentRiskSummary,
} from "../services/api";

function useStudentDetail(nisn) {
  const [student, setStudent] = useState(null);

  const [mapelOptions, setMapelOptions] = useState([]);
  const [selectedMapel, setSelectedMapel] =
    useState("");

  const [latestWeek, setLatestWeek] =
    useState(null);

  const [recommendation, setRecommendation] =
    useState(null);

  const [recommendationLoading, setRecommendationLoading] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);
  
  const [riskSummary, setRiskSummary] = useState(null);

  useEffect(() => {
  const fetchRiskSummary = async () => {
    if (!nisn) return;

    try {
      const result = await getStudentRiskSummary({
        page: 1,
        page_size: 10,
        search: nisn,
      });

      const studentRisk = result.results?.find(
        (item) => item.nisn === nisn
      );

      setRiskSummary(studentRisk || null);
    } catch (error) {
      console.error(
        "Gagal mengambil status risiko siswa:",
        error.response?.data || error.message
      );
    }
  };

  fetchRiskSummary();
}, [nisn]);

  // =========================
  // MAPEL
  // =========================

  useEffect(() => {
    const fetchMapel = async () => {
      try {
        const result = await getMapel();

        setMapelOptions(
          result.results || []
        );
      } catch (error) {
        console.error(
          "Gagal mengambil mata pelajaran:",
          error.response?.data ||
            error.message
        );
      }
    };

    fetchMapel();
  }, []);

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
            mapel_id: selectedMapel,
          });

        if (result.success) {
          setStudent(result.data);
        } else {
          setError(true);
        }
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
  }, [nisn, selectedMapel]);

  // =========================
  // CARI MINGGU TERBARU
  // =========================

  useEffect(() => {
    const fetchLatestWeek = async () => {
      // Belum pilih mapel
      if (!nisn || !selectedMapel) {
        setLatestWeek(null);
        setRecommendation(null);
        return;
      }

      try {
        const result =
          await getStudentScores({
            nisn,
            mapel_id: selectedMapel,
          });

        const scores = result.data || [];

        console.log("HASIL GET NILAI:", result);
        console.log("DATA SCORES:", scores);
        console.log(
          "WEEKS:",
          scores.map((item) => item.minggu_ke)
        );

        if (scores.length === 0) {
          setLatestWeek(null);
          return;
        }

        const weeks = scores
          .map((item) =>
            Number(item.minggu_ke)
          )
          .filter(
            (week) => !Number.isNaN(week)
          );

        const latest =
          weeks.length > 0
            ? Math.max(...weeks)
            : null;

        setLatestWeek(latest);

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
  }, [nisn, selectedMapel]);

  // =========================
  // GENERATE REKOMENDASI
  // =========================

// =========================
// GENERATE REKOMENDASI
// =========================

const handleGenerateRecommendation = async () => {
  console.log("=== GENERATE REKOMENDASI ===");
  console.log("NISN:", nisn);
  console.log("MAPEL:", selectedMapel);
  console.log("LATEST WEEK:", latestWeek);

  if (!selectedMapel) {
    console.log("STOP: belum memilih mapel");
    return;
  }

  if (!latestWeek) {
    setRecommendation({
      guru:
        "Belum tersedia data penilaian untuk mata pelajaran ini.",
    });

    console.log("STOP: latestWeek tidak tersedia");
    return;
  }

  setRecommendationLoading(true);

  try {
    const result = await getStudentPrediction({
      nisn,
      mapel_id: selectedMapel,
      minggu_ke: latestWeek,
    });

    console.log("HASIL DETAIL PREDIKSI:", result);

    if (result.success) {
      console.log(
        "REKOMENDASI GURU:",
        result.data?.recommendation?.guru
      );

      setRecommendation(
        result.data?.recommendation || null
      );
    }
  } catch (error) {
    console.error(
      "Gagal mengambil rekomendasi AI:",
      error.response?.data || error.message
    );

    setRecommendation({
      guru: "Rekomendasi AI gagal diambil.",
    });
  } finally {
    setRecommendationLoading(false);
  }
};

  return {
    student,

    riskSummary,

    mapelOptions,
    selectedMapel,
    setSelectedMapel,

    latestWeek,

    recommendation,
    handleGenerateRecommendation,
    recommendationLoading,

    loading,
    error,
  };
}

export default useStudentDetail;