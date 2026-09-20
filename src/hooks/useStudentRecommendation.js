import { useEffect, useState } from "react";
import {
  getStudentPrediction,
  getStudentScores,
} from "../services/api";

/**
 * Mengambil minggu terbaru dari nilai siswa dan rekomendasi prediksi untuk
 * minggu tersebut dalam satu alur async.
 */
function useStudentRecommendation({
  nisn,
  mapelId,
  enabled = true,
}) {
  const [latestWeek, setLatestWeek] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil nilai terbaru lalu meminta rekomendasi untuk minggu terakhir.
     */
    const fetchRecommendation = async () => {
      if (!enabled || !nisn || !mapelId) {
        setLatestWeek(null);
        setRecommendation(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const scoreResult = await getStudentScores({
          nisn,
          mapel_id: mapelId,
        });

        const scores = scoreResult?.data || [];
        const weeks = scores
          .map((item) => Number(item.minggu_ke))
          .filter((week) => !Number.isNaN(week));

        const latest = weeks.length > 0 ? Math.max(...weeks) : null;

        if (!isMounted) return;

        setLatestWeek(latest);

        if (!latest) {
          setRecommendation(null);
          return;
        }

        const predictionResult = await getStudentPrediction({
          nisn,
          mapel_id: mapelId,
          minggu_ke: latest,
        });

        if (!isMounted) return;

        setRecommendation(
          predictionResult?.success
            ? predictionResult.data?.recommendation || null
            : null
        );
      } catch (error) {
        console.error(
          "Gagal mengambil rekomendasi siswa:",
          error.response?.data || error.message
        );

        if (!isMounted) return;

        setLatestWeek(null);
        setRecommendation(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecommendation();

    return () => {
      isMounted = false;
    };
  }, [nisn, mapelId, enabled]);

  return {
    latestWeek,
    recommendation,
    recommendationLoading: loading,
  };
}

export default useStudentRecommendation;
