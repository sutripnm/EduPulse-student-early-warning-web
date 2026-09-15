function HighRiskSidebar({ students }) {
  return (
    <section className="risk-student-card">
      <div className="mb-3">
        <h5 className="fw-bold mb-1">
          Daftar Siswa Berisiko Tinggi
        </h5>

        <small className="text-secondary">
          10 siswa dengan status risiko tinggi
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
  {students.map((student) => (
    <tr key={student.nisn}>
      <td>
        <span className="fw-semibold">
          {student.nama_siswa}
        </span>
      </td>

      <td>
        {student.kelas || "-"}
      </td>

      <td>
        <span className="risk-badge risk-high">
          {student.status_risiko}
        </span>
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