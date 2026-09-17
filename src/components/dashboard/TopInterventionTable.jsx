import { Link } from "react-router-dom";
import { BsClipboardCheck } from "react-icons/bs";

function getRiskBadgeClass(statusRisk) {
  const status = String(statusRisk || "").toUpperCase();

  if (status === "HIGH" || status === "TINGGI") {
    return "risk-badge risk-high";
  }

  if (status === "MEDIUM" || status === "SEDANG") {
    return "risk-badge risk-medium";
  }

  if (status === "LOW" || status === "RENDAH") {
    return "risk-badge risk-low";
  }

  return "risk-badge";
}

function getRiskLabel(statusRisk) {
  const status = String(statusRisk || "").toUpperCase();

  if (status === "HIGH" || status === "TINGGI") {
    return "HIGH";
  }

  if (status === "MEDIUM" || status === "SEDANG") {
    return "MEDIUM";
  }

  if (status === "LOW" || status === "RENDAH") {
    return "LOW";
  }

  return statusRisk || "-";
}

function TopInterventionTable({ students }) {
  return (
    <section className="mt-3">
      <h6>
        <BsClipboardCheck className="me-2" />
        Top 5 Siswa Membutuhkan Intervensi
      </h6>

      <div className="dashboard-table table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Nilai</th>
              <th>Kehadiran</th>
              <th>Status Risk</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.nisn}>
                <td>
                  <span className="fw-semibold">
                    {student.nama || "-"}
                  </span>
                </td>

                <td>
                  {student.kelas || "-"}
                </td>

                <td>
                  {student.nilai ?? "-"}
                </td>

                <td>
                  {student.kehadiran ?? "-"}%
                </td>

                <td>
                  <span
                    className={getRiskBadgeClass(
                      student.status_risk
                    )}
                  >
                    {getRiskLabel(
                      student.status_risk
                    )}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/detail-siswa/${student.nisn}`}
                    className="btn btn-sm btn-outline-dark"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TopInterventionTable;