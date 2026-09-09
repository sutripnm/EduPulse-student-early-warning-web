import { useEffect, useState } from "react";
import { getStudentByNisn } from "../services/api";

function useStudentDetail(nisn) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const result = await getStudentByNisn(nisn);
        setStudent(result.data || result);
      } catch (error) {
        console.error("Gagal mengambil detail siswa:", error.response?.data || error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [nisn]);

  return { student, loading, error };
}

export default useStudentDetail;
