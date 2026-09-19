import { useEffect, useState } from "react";

import {
  getStudentRiskSummary,
  getSchoolAnalytics,
  getHighRiskStudents,
} from "../services/api";

function useStudentList() {
  const [students, setStudents] =
    useState([]);

  const [totalStudents, setTotalStudents] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [classFilter, setClassFilter] =
    useState("");

  const [riskFilter, setRiskFilter] =
    useState("");

  const [kelasOptions, setKelasOptions] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [highRiskStudents, setHighRiskStudents] =
    useState([]);

  const pageSize = 10;

  // =========================================================
  // DAFTAR SISWA
  // =========================================================

  useEffect(() => {
    const fetchStudents =
      async () => {
        setLoading(true);
        setError(false);

        try {
          console.log(
            "=== FILTER DAFTAR SISWA ==="
          );

          console.log(
            "Search:",
            search
          );

          console.log(
            "Kelas ID:",
            classFilter
          );

          console.log(
            "Risk:",
            riskFilter
          );

          const result =
            await getStudentRiskSummary({
              page,
              page_size:
                pageSize,
              search:
                search.trim(),
              kelas_id:
                classFilter,
              risk_status:
                riskFilter,
            });

          console.log(
            "HASIL SISWA:",
            result.results
          );

          setStudents(
            result.results || []
          );

          setTotalStudents(
            result.count || 0
          );

        } catch (error) {
          console.error(
            "Gagal mengambil daftar siswa:",
            error.response
              ?.data ||
              error.message
          );

          setError(true);

          setStudents([]);
          setTotalStudents(0);

        } finally {
          setLoading(false);
        }
      };

    fetchStudents();

  }, [
    page,
    search,
    classFilter,
    riskFilter,
  ]);

  // =========================================================
  // KELAS
  // =========================================================

  useEffect(() => {
    const fetchClasses =
      async () => {
        try {
          const result =
            await getSchoolAnalytics({});

          const classes =
            result?.data
              ?.filter_options
              ?.kelas || [];

          const cleanedClasses =
            classes.filter(
              (kelas) =>
                kelas &&
                kelas.id &&
                kelas.nama_kelas &&
                String(
                  kelas.nama_kelas
                )
                  .trim()
                  .toLowerCase() !==
                  "string"
            );

          console.log(
            "KELAS FILTER DAFTAR SISWA:",
            cleanedClasses
          );

          setKelasOptions(
            cleanedClasses
          );

        } catch (error) {
          console.error(
            "Gagal mengambil kelas untuk filter:",
            error.response
              ?.data ||
              error.message
          );

          setKelasOptions([]);
        }
      };

    fetchClasses();

  }, []);

  // =========================================================
  // HIGH RISK
  // =========================================================

  useEffect(() => {
    const fetchHighRisk =
      async () => {
        try {
          const result =
            await getHighRiskStudents({
              page: 1,
              page_size: 10,
              kelas_id:
                classFilter,
              search:
                search.trim(),
            });

          setHighRiskStudents(
            result.results || []
          );

        } catch (error) {
          console.error(
            "Gagal mengambil siswa risiko tinggi:",
            error.response
              ?.data ||
              error.message
          );

          setHighRiskStudents([]);
        }
      };

    fetchHighRisk();

  }, [
    classFilter,
    search,
  ]);

  // =========================================================
  // RESET PAGE
  // =========================================================

  useEffect(() => {
    setPage(1);
  }, [
    search,
    classFilter,
    riskFilter,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages =
    Math.ceil(
      totalStudents /
        pageSize
    );

  const goToPage = (
    newPage
  ) => {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    setPage(newPage);
  };

  // =========================================================
  // RETURN
  // =========================================================

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
    totalPages,
    goToPage,

    highRiskStudents,
  };
}

export default useStudentList;