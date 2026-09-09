function HighRiskSidebar({ students }) {
  return (
    <section className="risk-student-card">
      <div className="mb-3">
        <h5 className="fw-bold mb-1">Daftar Siswa Berisiko Tinggi</h5>
        <small className="text-secondary">Siswa dengan status risiko tinggi</small>
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
            {students.map((student) => (
              <tr key={student.nisn}>
                <td>
                  <span className="fw-semibold">{student.nama}</span>
                </td>
                <td>{student.kelas?.nama_kelas}</td>
                <td>
                  <span className="badge text-bg-danger">Tinggi</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HighRiskSidebar;
