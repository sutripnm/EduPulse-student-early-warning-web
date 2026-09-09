import { useEffect, useState } from "react";
import { getStudents } from "../services/api";

function useStudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("Semua");
  const [riskFilter, setRiskFilter] = useState("Semua");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getStudents();
        setStudents(result.results);
      } catch (error) {
        console.error("Gagal mengambil daftar siswa:", error.response?.data || error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.nama.toLowerCase().includes(search.toLowerCase()) ||
      student.nisn.includes(search);

    const matchesClass =
      classFilter === "Semua" || student.kelas?.nama_kelas === classFilter;

    const matchesRisk = riskFilter === "Semua" || student.status_risk === riskFilter;

    return matchesSearch && matchesClass && matchesRisk;
  });

  const highRiskStudents = students.filter(
    (student) => student.status_risk === "HIGH"
  );

  return {
    loading,
    error,
    search,
    setSearch,
    classFilter,
    setClassFilter,
    riskFilter,
    setRiskFilter,
    filteredStudents,
    highRiskStudents,
  };
}

export default useStudentList;
