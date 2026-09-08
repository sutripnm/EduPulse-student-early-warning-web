import React from "react";
// 1. Import hook useDashboardData
import useDashboardData from "../../hooks/useDashboardData";

function TopInterventionTable() {
  // 2. Extrak topRiskStudents dari hook
  const { topRiskStudents = [] } = useDashboardData();

  return (
    <section className="mt-3">
      <h6>📋 Top 5 Siswa Membutuhkan Intervensi</h6>

      <div className="dashboard-table table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Nilai</th>
              <th>Kehadiran</th>
              <th>Status Risiko</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* 3. Render array topRiskStudents */}
            {topRiskStudents.map((student) => (
              <tr key={student.nisn}>
                <td>
                  <span className="fw-semibold">{student.nama}</span>
                </td>
                <td>{student.kelas}</td>
                <td>{student.nilai}</td>
                <td>{student.kehadiran}%</td>
                <td>
                  <span
                    className={
                      student.status_risk === "HIGH" || student.status_risk === "Tinggi"
                        ? "badge text-bg-danger"
                        : "badge text-bg-warning"
                    }
                  >
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