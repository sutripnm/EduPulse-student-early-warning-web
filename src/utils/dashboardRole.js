import {
  getParentDashboard,
  getStudentDashboard,
} from "../services/api";
import {
  normalizeParentDashboard,
  normalizeStudentDashboard,
} from "./dashboardNormalize";

const STUDENT_DASHBOARD_CONFIG = {
  fetchDashboard: getStudentDashboard,
  normalizeDashboard: normalizeStudentDashboard,
};

const PARENT_DASHBOARD_CONFIG = {
  fetchDashboard: getParentDashboard,
  normalizeDashboard: normalizeParentDashboard,
};

/**
 * Mengembalikan fetcher dan normalizer dashboard berdasarkan role siswa.
 * Config dibuat sekali agar aman dipakai sebagai dependency useEffect.
 */
export function getRoleDashboardConfig(role) {
  if (role === "SISWA") {
    return STUDENT_DASHBOARD_CONFIG;
  }

  if (role === "ORANGTUA" || role === "ORANG_TUA") {
    return PARENT_DASHBOARD_CONFIG;
  }

  return null;
}
