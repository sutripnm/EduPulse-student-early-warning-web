import { useEffect, useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import { getSchoolAnalytics } from "../services/api";
import {
  filterValidKelas,
  getTeacherMapel,
  getVisibleMapelOptions,
} from "../utils/academic";

/**
 * Menyediakan kelas dan mapel untuk form akademik.
 * Request analytics + current user dibuat satu kali sehingga form nilai dan
 * form absensi bisa memakai sumber filter yang sama.
 */
function useTeachingFilters() {
  const { user: currentUser, loading: userLoading } = useCurrentUser();

  const [kelasOptions, setKelasOptions] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const role = String(currentUser?.role || "").toUpperCase();
  const isGuru = role === "GURU";
  const isAdmin = role === "ADMIN";

  const guruMapel = useMemo(
    () => getTeacherMapel(currentUser),
    [currentUser]
  );

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil opsi kelas dan mapel dari dashboard analytics.
     */
    const fetchFilters = async () => {
      if (userLoading) return;

      if (!currentUser) {
        setKelasOptions([]);
        setMapelOptions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const result = await getSchoolAnalytics({});
        const data = result?.data || {};
        const filterOptions = data?.filter_options || {};

        if (!isMounted) return;

        setKelasOptions(filterValidKelas(filterOptions.kelas));

        setMapelOptions(
          getVisibleMapelOptions(filterOptions.mapel, {
            isAdmin,
            isGuru,
            teacherMapel: guruMapel,
          })
        );
      } catch (error) {
        console.error(
          "Gagal mengambil filter akademik:",
          error.response?.data || error.message
        );

        if (!isMounted) return;

        setKelasOptions([]);
        setMapelOptions([]);
        setError(true);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFilters();

    return () => {
      isMounted = false;
    };
  }, [currentUser, userLoading, isAdmin, isGuru, guruMapel]);

  return {
    currentUser,
    userLoading,
    role,
    isGuru,
    isAdmin,
    guruMapel,
    kelasOptions,
    mapelOptions,
    loading,
    error,
  };
}

export default useTeachingFilters;
