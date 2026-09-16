function HighRiskSidebar({ students }) {
  return (
    <section className="risk-student-card">
      <div className="mb-3">
        <h5 className="fw-bold mb-1">
          Daftar Siswa Berisiko Tinggi
        </h5>

        <small className="text-secondary">
          Siswa dengan status risiko tinggi
        </small>
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Status Risiko</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-secondary py-3"
                >
                  Tidak ada siswa berisiko tinggi.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.nisn}>
                  <td>
                    <span className="fw-semibold">
                      {student.nama ||
                        student.nama_siswa ||
                        "-"}
                    </span>
                  </td>

                  <td>
                    {typeof student.kelas === "object"
                      ? student.kelas?.nama_kelas || "-"
                      : student.kelas || "-"}
                  </td>

                  <td>
                    <span className="badge text-bg-danger">
                      {student.status_risk ||
                        student.status_risiko ||
                        "Tinggi"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HighRiskSidebar;