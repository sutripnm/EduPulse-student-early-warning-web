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
import useAcademicResource from "./useAcademicResource";

/**
 * Menyatukan operasi CRUD mata pelajaran dan kelas.
 * Kedua resource memakai hook CRUD generik agar tidak ada pola fetch ulang
 * yang ditulis dua kali.
 */
function useAcademicSettings() {
  const subjects = useAcademicResource({
    load: getMapel,
    create: createMapel,
    update: updateMapel,
    remove: deleteMapel,
  });

  const classes = useAcademicResource({
    load: getKelas,
    create: createKelas,
    update: updateKelas,
    remove: deleteKelas,
  });

  return {
    subjects: subjects.items,
    classes: classes.items,
    loadingSubjects: subjects.loading,
    loadingClasses: classes.loading,
    error: subjects.error || classes.error,
    handleCreateMapel: subjects.createItem,
    handleUpdateMapel: subjects.updateItem,
    handleDeleteMapel: subjects.removeItem,
    handleCreateKelas: classes.createItem,
    handleUpdateKelas: classes.updateItem,
    handleDeleteKelas: classes.removeItem,
  };
}

export default useAcademicSettings;
