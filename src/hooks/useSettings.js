import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getTahunAjaran,
  getSemester,
} from "../services/api";

function useSettings() {
  const [user, setUser] = useState(null);
  const [tahunAjaran, setTahunAjaran] = useState([]);
  const [semester, setSemester] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(false);

      try {
        const [
          userResult,
          tahunAjaranResult,
          semesterResult,
        ] = await Promise.all([
          getCurrentUser(),
          getTahunAjaran(),
          getSemester(),
        ]);

        if (userResult.success) {
          setUser(userResult.data);
        }

        if (tahunAjaranResult.success) {
          setTahunAjaran(
            tahunAjaranResult.results || []
          );
        }

        if (semesterResult.success) {
          setSemester(
            semesterResult.results || []
          );
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data pengaturan:",
          error.response?.data ||
            error.message
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const activeTahunAjaran =
    tahunAjaran.find(
      (item) => item.is_aktif
    ) || null;

  const activeSemester =
    semester.find(
      (item) => item.is_aktif
    ) || null;

  return {
    user,

    tahunAjaran,
    activeTahunAjaran,

    semester,
    activeSemester,

    loading,
    error,
  };
}

export default useSettings;