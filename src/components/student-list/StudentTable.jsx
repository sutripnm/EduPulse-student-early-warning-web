import { Link } from "react-router-dom";
import RiskBadge from "../common/RiskBadge";

// Tabel utama daftar siswa (kolom kiri StudentListPage). Data siswa,
// nomor halaman, dan total siswa semua datang dari hook useStudentList
// lewat props — komponen ini cuma menampilkan.
function StudentTable({
  students,
  page,
  totalStudents,
}) {
  // Hitung "menampilkan X–Y dari Z siswa" berdasarkan halaman aktif.
  // 10 = jumlah data per halaman (samakan dengan page size di
  // useStudentList kalau nanti diubah).
  const rangeStart = students.length > 0 ? (page - 1) * 10 + 1 : 0;
  const rangeEnd = Math.min(page * 10, totalStudents);

  return (
    <section className="student-table-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-1">
            Data Siswa
          </h5>

          <small className="text-secondary">
            Menampilkan{" "}
            {rangeStart}
            –
            {rangeEnd}{" "}
            dari {totalStudents} siswa
          </small>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>NISN</th>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Gender</th>
              <th>Presensi</th>
              <th>Nilai</th>
              <th>Status Risiko</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-secondary"
                >
                  Tidak ada data siswa.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.nisn}>
                  <td>
                    {student.nisn}
                  </td>

                  <td>
                    <span className="fw-semibold">
                      {student.nama_siswa || "-"}
                    </span>
                  </td>

                  <td>
                    {student.kelas || "-"}
                  </td>

                  <td>
                    {student.gender || "-"}
                  </td>

                  <td>
                    {student.presensi || "-"}
                  </td>

                  <td>
                    {student.nilai ?? "-"}
                  </td>

                  <td>
                    <RiskBadge
                      status={
                        student.status_risiko
                      }
                    />
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StudentTable;
