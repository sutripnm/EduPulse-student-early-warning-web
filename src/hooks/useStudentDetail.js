import { useEffect, useState } from "react";
import {
  getMapel,
  getStudentDetailRisk,
} from "../services/api";

function useStudentDetail(nisn) {
  const [student, setStudent] = useState(null);

  const [mapelOptions, setMapelOptions] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // =========================
  // Ambil daftar mata pelajaran
  // =========================

  useEffect(() => {
    const fetchMapel = async () => {
      try {
        const result = await getMapel();

        setMapelOptions(result.results || []);
      } catch (error) {
        console.error(
          "Gagal mengambil daftar mata pelajaran:",
          error.response?.data || error.message
        );
      }
    };

    fetchMapel();
  }, []);

  // =========================
  // Ambil detail siswa
  // =========================

  useEffect(() => {
    const fetchStudent = async () => {
      if (!nisn) {
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const result = await getStudentDetailRisk({
          nisn,
          mapel_id: selectedMapel,
        });

        if (result.success) {
          setStudent(result.data);
        } else {
          setStudent(null);
          setError(true);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil detail siswa:",
          error.response?.data || error.message
        );

        setStudent(null);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [nisn, selectedMapel]);

  return {
    student,

    mapelOptions,
    selectedMapel,
    setSelectedMapel,

    loading,
    error,
  };
}

export default useStudentDetail;