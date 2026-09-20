import { Link } from "react-router-dom";
import RiskBadge from "../common/RiskBadge";

/**
 * Menampilkan tabel daftar siswa.
 *
 * Pada desktop seluruh informasi siswa ditampilkan.
 * Pada mobile beberapa kolom sekunder disembunyikan melalui CSS
 * agar tabel tetap nyaman dibaca pada layar kecil.
 */
function StudentTable({
  students,
  page,
  totalStudents,
  pageSize = 10,
}) {
  // Menghitung nomor data pertama pada halaman aktif.
  const rangeStart =
    students.length > 0
      ? (page - 1) * pageSize + 1
      : 0;

  // Menghitung nomor data terakhir pada halaman aktif.
  const rangeEnd = Math.min(
    page * pageSize,
    totalStudents
  );

  return (
    <section className="student-table-card">
      {/* Header tabel */}
      <div className="student-table-header mb-3">
        <div>
          <h5 className="fw-bold mb-1">
            Data Siswa
          </h5>

          <small className="text-secondary">
            Menampilkan {rangeStart}–{rangeEnd} dari{" "}
            {totalStudents} siswa
          </small>
        </div>
      </div>

      {/* Wrapper untuk menjaga tabel tetap responsif */}
      <div className="student-table-wrapper">
        <table className="table student-data-table align-middle mb-0">
          <thead>
            <tr>
              <th className="student-col-nisn">NISN</th>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th className="student-col-gender">
                Gender
              </th>
              <th className="student-col-presensi">
                Presensi
              </th>
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
                  <td className="student-col-nisn">
                    {student.nisn}
                  </td>

                  <td>
                    <span className="fw-semibold student-name">
                      {student.nama_siswa || "-"}
                    </span>
                  </td>

                  <td>
                    {student.kelas || "-"}
                  </td>

                  <td className="student-col-gender">
                    {student.gender || "-"}
                  </td>

                  <td className="student-col-presensi">
                    {student.presensi || "-"}
                  </td>

                  <td>
                    {student.nilai ?? "-"}
                  </td>

                  <td>
                    <RiskBadge
                      status={student.status_risiko}
                    />
                  </td>

                  <td>
                    <Link
                      to={`/detail-siswa/${student.nisn}`}
                      className="btn btn-sm btn-outline-dark student-detail-button"
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