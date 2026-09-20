import { FiUser } from "react-icons/fi";
import useCurrentUser from "../../hooks/useCurrentUser";

/**
 * Menampilkan identitas user yang sedang login pada header dashboard.
 */
function DashboardHeader() {
  const { user } = useCurrentUser();

  return (
    <header className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h1 className="mb-2">Dashboard</h1>
      </div>

      <div className="d-flex align-items-center gap-2">
        <div className="text-end">
          <p className="mb-0 fw-semibold">
            {user?.email || "User"}
          </p>

          <small className="text-secondary">
            {user?.role || "-"}
          </small>
        </div>

        <FiUser className="fs-3" />
      </div>
    </header>
  );
}

export default DashboardHeader;
