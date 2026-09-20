import { useParams } from "react-router-dom";
import { getParentDashboard } from "../services/api";
import { normalizeParentDashboard } from "../utils/dashboardNormalize";
import useDashboardByStudent from "./useDashboardByStudent";
import { PARENT_DASHBOARD_DUMMY } from "../data/dashboardDummy";

/**
 * Menyiapkan dashboard orang tua, termasuk pemilihan mapel berdasarkan risiko.
 */
function useParentDashboard() {
  const { nisn } = useParams();

  const studentNisn =
    nisn || localStorage.getItem("nisn");

  return useDashboardByStudent({
    studentNisn,
    fetchDashboard: getParentDashboard,
    normalizeDashboard: normalizeParentDashboard,
    dummyDashboard: PARENT_DASHBOARD_DUMMY,
    errorLabel: "dashboard orang tua",
  });
}

export default useParentDashboard;
