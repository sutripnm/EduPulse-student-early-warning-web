import { useEffect, useState } from "react";
import { getStudents, getKelas } from "../services/api";

function useStudentList() {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [highRiskStudents, setHighRiskStudents] = useState([]);

  const [kelasOptions, setKelasOptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  // Reset halaman ketika filter berubah
  useEffect(() => {
    setPage(1);
  }, [search, classFilter, riskFilter]);

  /* =========================
     Ambil daftar kelas
     ========================= */

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const result = await getKelas();
        setKelasOptions(result.results || []);
      } catch (error) {
        console.error(
          "Gagal mengambil daftar kelas:",
          error.response?.data || error.message
        );
      }
    };

    fetchKelas();
  }, []);

  /* =========================
     Ambil daftar siswa
     ========================= */

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(false);

      try {
        const offset = (page - 1) * limit;

        console.log("PAGE:", page);
        console.log("OFFSET:", offset);

        const result = await getStudents({
          limit,
          offset,
          search,
          kelas_id: classFilter,
          risk: riskFilter,
        });

        console.log("HASIL PAGE:", result.results);

        setStudents(result.results || []);
        setTotalStudents(result.count || 0);
      } catch (error) {
        console.error(
          "Gagal mengambil daftar siswa:",
          error.response?.data || error.message
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, search, classFilter, riskFilter]);

  /* =========================
     Ambil siswa High Risk
     ========================= */

  useEffect(() => {
    const fetchHighRiskStudents = async () => {
      try {
        const result = await getStudents({
          limit: 5,
          offset: 0,
          risk: "2",
        });

        setHighRiskStudents(result.results || []);
      } catch (error) {
        console.error(
          "Gagal mengambil siswa berisiko tinggi:",
          error.response?.data || error.message
        );
      }
    };

    fetchHighRiskStudents();
  }, []);

  /* =========================
     Pagination
     ========================= */

  const totalPages = Math.ceil(totalStudents / limit);

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  };

  return {
    students,
    totalStudents,
    highRiskStudents,

    kelasOptions,

    loading,
    error,

    search,
    setSearch,

    classFilter,
    setClassFilter,

    riskFilter,
    setRiskFilter,

    page,
    totalPages,
    goToPage,

    limit,
  };
}

export default useStudentList;