import { useEffect, useState } from "react";
import {
  getMapel,
  createMapel,
  updateMapel,
  deleteMapel,
  getKelas,
  createKelas,
  updateKelas,
  deleteKelas,
} from "../services/api";

function useAcademicSettings() {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loadingSubjects, setLoadingSubjects] =
    useState(true);

  const [loadingClasses, setLoadingClasses] =
    useState(true);

  const [error, setError] = useState(false);

  // =========================
  // GET MAPEL
  // =========================

  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true);

const result = await getMapel();

const cleanSubjects = (result.results || []).filter(
  (item) =>
    item.kode_mapel !== "string" &&
    item.nama_mapel !== "string"
);

setSubjects(cleanSubjects);
    } catch (error) {
      console.error(
        "Gagal mengambil mata pelajaran:",
        error.response?.data || error.message
      );

      setError(true);
    } finally {
      setLoadingSubjects(false);
    }
  };

  // =========================
  // GET KELAS
  // =========================

  const fetchClasses = async () => {
    try {
      setLoadingClasses(true);

      const result = await getKelas();

      setClasses(result.results || []);
    } catch (error) {
      console.error(
        "Gagal mengambil kelas:",
        error.response?.data || error.message
      );

      setError(true);
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, []);

  // =========================
  // CREATE MAPEL
  // =========================

  const handleCreateMapel = async (data) => {
    const result = await createMapel(data);

    await fetchSubjects();

    return result;
  };

  // =========================
  // UPDATE MAPEL
  // =========================

  const handleUpdateMapel = async (id, data) => {
    const result = await updateMapel(id, data);

    await fetchSubjects();

    return result;
  };

  // =========================
  // DELETE MAPEL
  // =========================

  const handleDeleteMapel = async (id) => {
    const result = await deleteMapel(id);

    await fetchSubjects();

    return result;
  };

  // =========================
  // CREATE KELAS
  // =========================

  const handleCreateKelas = async (data) => {
    const result = await createKelas(data);

    await fetchClasses();

    return result;
  };

  // =========================
  // UPDATE KELAS
  // =========================

  const handleUpdateKelas = async (id, data) => {
    const result = await updateKelas(id, data);

    await fetchClasses();

    return result;
  };

  // =========================
  // DELETE KELAS
  // =========================

  const handleDeleteKelas = async (id) => {
    const result = await deleteKelas(id);

    await fetchClasses();

    return result;
  };

  return {
    subjects,
    classes,

    loadingSubjects,
    loadingClasses,

    error,

    handleCreateMapel,
    handleUpdateMapel,
    handleDeleteMapel,

    handleCreateKelas,
    handleUpdateKelas,
    handleDeleteKelas,
  };
}

export default useAcademicSettings;