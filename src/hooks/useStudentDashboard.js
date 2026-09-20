import { useParams } from "react-router-dom";
import { getStudentDashboard } from "../services/api";
import { normalizeStudentDashboard } from "../utils/dashboardNormalize";
import useDashboardByStudent from "./useDashboardByStudent";
import { STUDENT_DASHBOARD_DUMMY } from "../data/dashboardDummy";

/**
 * Menyiapkan dashboard siswa, termasuk pemilihan mapel berdasarkan risiko.
 */
function useStudentDashboard() {
  const { nisn } = useParams();

  const studentNisn =
    nisn || localStorage.getItem("nisn");

  return useDashboardByStudent({
    studentNisn,
    fetchDashboard: getStudentDashboard,
    normalizeDashboard: normalizeStudentDashboard,
    dummyDashboard: STUDENT_DASHBOARD_DUMMY,
    errorLabel: "dashboard siswa",
  });
}

export default useStudentDashboard;
