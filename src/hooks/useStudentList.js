import { useEffect, useState } from "react";
import {
  getStudentRiskSummary,
  getKelas,
  getHighRiskStudents,
} from "../services/api";

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

  const [highRiskStudents, setHighRiskStudents] =
    useState([]);

  const pageSize = 10;

  // =========================
  // Ambil daftar siswa
  // =========================

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(false);

      try {
        const result =
          await getStudentRiskSummary({
            page,
            page_size: pageSize,
            search,
            kelas_id: classFilter,
            risk_status: riskFilter,
          });

        setStudents(result.results || []);
        setTotalStudents(result.count || 0);
      } catch (error) {
        console.error(
          "Gagal mengambil daftar siswa:",
          error.response?.data ||
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

  // =========================
  // Ambil kelas
  // =========================

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await getKelas();

        setKelasOptions(
          result.results || []
        );
      } catch (error) {
        console.error(
          "Gagal mengambil kelas:",
          error.response?.data ||
            error.message
        );
      }
    };

    fetchClasses();
  }, []);

  // =========================
  // Ambil high risk
  // =========================

  useEffect(() => {
    const fetchHighRisk = async () => {
      try {
        const result =
          await getHighRiskStudents({
            page: 1,
            page_size: 10,
          });

        setHighRiskStudents(
          result.results || []
        );
      } catch (error) {
        console.error(
          "Gagal mengambil siswa risiko tinggi:",
          error.response?.data ||
            error.message
        );

        setHighRiskStudents([]);
      }
    };

    fetchHighRisk();
  }, []);

  // =========================
  // Reset page saat filter berubah
  // =========================

  useEffect(() => {
    setPage(1);
  }, [
    search,
    classFilter,
    riskFilter,
  ]);

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    totalStudents / pageSize
  );

  const goToPage = (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    setPage(newPage);
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
    totalPages,
    goToPage,

    highRiskStudents,
  };
}

export default useStudentList;