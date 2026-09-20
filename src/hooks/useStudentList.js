import { useEffect, useState } from "react";

import {
  getStudentRiskSummary,
  getSchoolAnalytics,
  getHighRiskStudents,
} from "../services/api";

import { filterValidKelas } from "../utils/academic";

/**
 * Mengelola daftar siswa, filter, pagination, dan daftar siswa berisiko tinggi.
 */
function useStudentList() {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const [kelasOptions, setKelasOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [highRiskStudents, setHighRiskStudents] = useState([]);

  // Jumlah siswa yang ditampilkan setiap halaman.
  const pageSize = 10;

  /**
   * Menghitung jumlah halaman berdasarkan jumlah seluruh siswa.
   */
  const totalPages = Math.max(
    1,
    Math.ceil(totalStudents / pageSize)
  );

  /**
   * Berpindah ke halaman tertentu.
   * Nilai halaman dibatasi agar tidak melebihi halaman pertama/terakhir.
   */
  const goToPage = (nextPage) => {
    const targetPage = Math.min(
      Math.max(1, Number(nextPage)),
      totalPages
    );

    setPage(targetPage);
  };

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil daftar siswa sesuai filter dan halaman aktif.
     */
    const fetchStudents = async () => {
      setLoading(true);
      setError(false);

      try {
        const result = await getStudentRiskSummary({
          page,
          page_size: pageSize,
          search: search.trim(),
          kelas_id: classFilter,
          risk_status: riskFilter,
        });

        if (!isMounted) return;

        setStudents(result?.results || []);
        setTotalStudents(result?.count || 0);
      } catch (requestError) {
        console.error(
          "Gagal mengambil daftar siswa:",
          requestError.response?.data || requestError.message
        );

        if (!isMounted) return;

        setError(true);
        setStudents([]);
        setTotalStudents(0);
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
  }, [page, search, classFilter, riskFilter]);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil daftar kelas yang tersedia untuk filter siswa.
     */
    const fetchClasses = async () => {
      try {
        const result = await getSchoolAnalytics({});
        const classes = result?.data?.filter_options?.kelas || [];

        if (!isMounted) return;

        setKelasOptions(filterValidKelas(classes));
      } catch (requestError) {
        console.error(
          "Gagal mengambil kelas untuk filter:",
          requestError.response?.data || requestError.message
        );

        if (isMounted) {
          setKelasOptions([]);
        }
      }
    };

    fetchClasses();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil maksimal 10 siswa berisiko tinggi.
     */
    const fetchHighRisk = async () => {
      try {
        const result = await getHighRiskStudents({
          page: 1,
          page_size: 10,
          kelas_id: classFilter,
          search: search.trim(),
        });

        if (!isMounted) return;

        setHighRiskStudents(result?.results || []);
      } catch (requestError) {
        console.error(
          "Gagal mengambil siswa risiko tinggi:",
          requestError.response?.data || requestError.message
        );

        if (isMounted) {
          setHighRiskStudents([]);
        }
      }
    };

    fetchHighRisk();

    return () => {
      isMounted = false;
    };
  }, [classFilter, search]);

  /**
   * Mengubah pencarian dan kembali ke halaman pertama.
   */
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  /**
   * Mengubah filter kelas dan kembali ke halaman pertama.
   */
  const handleClassChange = (value) => {
    setClassFilter(value);
    setPage(1);
  };

  /**
   * Mengubah filter risiko dan kembali ke halaman pertama.
   */
  const handleRiskChange = (value) => {
    setRiskFilter(value);
    setPage(1);
  };

  return {
    students,
    totalStudents,
    loading,
    error,

    search,
    setSearch,

    classFilter,
    setClassFilter,

    riskFilter,
    setRiskFilter,

    kelasOptions,

    page,
    pageSize,
    totalPages,
    goToPage,

    highRiskStudents,

    handleSearchChange,
    handleClassChange,
    handleRiskChange,
  };
}

export default useStudentList;