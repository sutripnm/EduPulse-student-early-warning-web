import { Link } from "react-router-dom";
import RiskBadge from "../common/RiskBadge";

/**
 * Menampilkan tabel daftar siswa.
 *
 * Desktop:
 * Menampilkan seluruh informasi siswa.
 *
 * Mobile:
 * Hanya menampilkan informasi utama agar tabel tetap nyaman
 * dibaca pada layar kecil.
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
      {/* =================================================
          HEADER
          ================================================= */}
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

      {/* =================================================
          TABLE WRAPPER
          ================================================= */}
      <div className="student-table-wrapper">
        <table className="table student-data-table align-middle mb-0">
          <thead>
            <tr>
              {/* NISN - desktop only */}
              <th className="student-col-nisn">
                NISN
              </th>

              {/* Nama siswa */}
              <th className="student-col-name">
                Nama Siswa
              </th>

              {/* Kelas */}
              <th className="student-col-class">
                Kelas
              </th>

              {/* Gender - desktop only */}
              <th className="student-col-gender">
                Gender
              </th>

              {/* Presensi - desktop only */}
              <th className="student-col-presensi">
                Presensi
              </th>

              {/* Nilai */}
              <th className="student-col-score">
                Nilai
              </th>

              {/* Risiko */}
              <th className="student-col-risk">
                <span className="desktop-risk-title">
                  Status Risiko
                </span>

                <span className="mobile-risk-title">
                  Risiko
                </span>
              </th>

              {/* Aksi */}
              <th className="student-col-action">
                Aksi
              </th>
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
                  {/* ================================
                      NISN
                      ================================ */}
                  <td className="student-col-nisn">
                    {student.nisn || "-"}
                  </td>

                  {/* ================================
                      NAMA
                      ================================ */}
                  <td className="student-col-name">
                    <span
                      className="student-name"
                      title={student.nama_siswa || "-"}
                    >
                      {student.nama_siswa || "-"}
                    </span>
                  </td>

                  {/* ================================
                      KELAS
                      ================================ */}
                  <td className="student-col-class">
                    <span
                      className="student-class"
                      title={student.kelas || "-"}
                    >
                      {student.kelas || "-"}
                    </span>
                  </td>

                  {/* ================================
                      GENDER
                      ================================ */}
                  <td className="student-col-gender">
                    {student.gender || "-"}
                  </td>

                  {/* ================================
                      PRESENSI
                      ================================ */}
                  <td className="student-col-presensi">
                    {student.presensi || "-"}
                  </td>

                  {/* ================================
                      NILAI
                      ================================ */}
                  <td className="student-col-score">
                    {student.nilai ?? "-"}
                  </td>

                  {/* ================================
                      RISIKO
                      ================================ */}
                  <td className="student-col-risk">
                    <div className="student-risk-wrapper">
                      <RiskBadge
                        status={student.status_risiko}
                      />
                    </div>
                  </td>

                  {/* ================================
                      AKSI
                      ================================ */}
                  <td className="student-col-action">
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