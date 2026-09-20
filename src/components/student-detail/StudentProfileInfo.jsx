import { BsPersonFill } from "react-icons/bs";

/** Komponen atau fungsi StudentProfileInfo yang menangani bagian UI terkait. */
function StudentProfileInfo({ student }) {
  const profile = student?.profil_siswa;

  return (
    <section className="student-profile-card mb-4">
      <div className="student-section-title">
        <span><BsPersonFill /></span>
        <h6>Informasi Siswa</h6>
      </div>

      <div className="student-profile-grid">

        <div className="student-info-item">
          <small>Nama Siswa</small>
          <strong>
            {profile?.nama_siswa || "-"}
          </strong>
        </div>

        <div className="student-info-item">
          <small>NISN</small>
          <strong>
            {profile?.nisn || "-"}
          </strong>
        </div>

        <div className="student-info-item">
          <small>Kelas</small>
          <strong>
            {profile?.kelas || "-"}
          </strong>
        </div>

        <div className="student-info-item">
          <small>Gender</small>
          <strong>
            {profile?.gender || "-"}
          </strong>
        </div>

      </div>
    </section>
  );
}

export default StudentProfileInfo;
