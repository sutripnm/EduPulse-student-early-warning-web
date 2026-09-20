import { useEffect, useState } from "react";
import {
  getTahunAjaran,
  getSemester,
} from "../services/api";
import useCurrentUser from "./useCurrentUser";

/**
 * Mengambil user, tahun ajaran, dan semester untuk halaman pengaturan.
 */
function useSettings() {
  const { user, loading: userLoading } = useCurrentUser();

  const [tahunAjaran, setTahunAjaran] = useState([]);
  const [semester, setSemester] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil data tahun ajaran dan semester secara paralel.
     */
    const fetchSettings = async () => {
      if (userLoading) return;

      setLoading(true);
      setError(false);

      try {
        const [tahunAjaranResult, semesterResult] = await Promise.all([
          getTahunAjaran(),
          getSemester(),
        ]);

        if (!isMounted) return;

        if (tahunAjaranResult.success) {
          setTahunAjaran(tahunAjaranResult.results || []);
        }

        if (semesterResult.success) {
          setSemester(semesterResult.results || []);
        }
      } catch (requestError) {
        console.error(
          "Gagal mengambil data pengaturan:",
          requestError.response?.data || requestError.message
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

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, [userLoading]);

  const activeTahunAjaran =
    tahunAjaran.find((item) => item.is_aktif) || null;

  const activeSemester =
    semester.find((item) => item.is_aktif) || null;

  return {
    user,
    tahunAjaran,
    activeTahunAjaran,
    semester,
    activeSemester,
    loading: loading || userLoading,
    error,
  };
}

export default useSettings;
