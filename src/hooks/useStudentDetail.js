import { useEffect, useState } from "react";
import {
  getStudentDetailRisk,
  getMapel,
} from "../services/api";

function useStudentDetail(nisn) {
  const [student, setStudent] = useState(null);

  const [mapelOptions, setMapelOptions] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* =========================
     Ambil daftar mapel
     ========================= */

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

  /* =========================
     Ambil detail siswa
     ========================= */

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      setError(false);

      try {
        const result = await getStudentDetailRisk({
          nisn,
          mapel_id: selectedMapel,
        });

        setStudent(result.data || null);
      } catch (error) {
        console.error(
          "Gagal mengambil detail siswa:",
          error.response?.data || error.message
        );

        setError(true);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    if (nisn) {
      fetchStudent();
    }
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