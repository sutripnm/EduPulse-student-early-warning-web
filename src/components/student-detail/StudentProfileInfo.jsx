function StudentProfileInfo({ student }) {
  return (
    <section className="student-profile-card mb-4">
      <div className="student-section-title">
        <span>👤</span>
        <h6>Informasi Siswa</h6>
      </div>

      <div className="student-profile-grid">
        <div className="student-info-item">
          <small>Nama Siswa</small>
          <strong>{student.nama}</strong>
        </div>

        <div className="student-info-item">
          <small>NISN</small>
          <strong>{student.nisn}</strong>
        </div>

        <div className="student-info-item">
          <small>Kelas</small>
          <strong>
            {student.kelas?.nama_kelas || "-"}
          </strong>
        </div>

        <div className="student-info-item">
          <small>Gender</small>
          <strong>{student.gender || "-"}</strong>
        </div>

      </div>
    </section>
  );
}

export default StudentProfileInfo;