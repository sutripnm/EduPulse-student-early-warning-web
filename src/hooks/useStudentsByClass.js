import { useEffect, useState } from "react";
import { getStudents } from "../services/api";

/**
 * Mengambil daftar siswa berdasarkan kelas terpilih.
 * Dipakai bersama oleh form nilai dan form absensi.
 */
function useStudentsByClass(classId) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil siswa dari endpoint academic/siswa.
     */
    const fetchStudents = async () => {
      if (!classId) {
        setStudents([]);
        setLoading(false);
        setError(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const result = await getStudents({
          limit: 100,
          offset: 0,
          kelas_id: classId,
        });

        if (!isMounted) return;

        setStudents(result?.results || []);
      } catch (error) {
        console.error(
          "Gagal mengambil siswa berdasarkan kelas:",
          error.response?.data || error.message
        );

        if (!isMounted) return;

        setStudents([]);
        setError(true);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStudents();

    return () => {
      isMounted = false;
    };
  }, [classId]);

  return { students, loading, error };
}

export default useStudentsByClass;
