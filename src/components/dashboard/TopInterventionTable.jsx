import { BsClipboardCheck } from "react-icons/bs";

// status_risk di sini bernilai "Tinggi" / "Sedang" (bukan "HIGH"/"MEDIUM"
// seperti di StudentListPage), jadi badge-nya dibuat manual di sini,
// bukan pakai components/common/RiskBadge.
function getRiskBadgeClass(statusRisk) {
  return statusRisk === "Tinggi" ? "risk-badge risk-high" : "risk-badge risk-medium";
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
                  <span className="fw-semibold">{student.nama}</span>
                </td>
                <td>{student.kelas}</td>
                <td>{student.nilai}</td>
                <td>{student.kehadiran}%</td>
                <td>
                  <span className={getRiskBadgeClass(student.status_risk)}>
                    {student.status_risk}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-dark">
                    Detail
                  </button>
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
