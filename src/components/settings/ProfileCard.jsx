import { BsPersonFill } from "react-icons/bs";

/** Komponen atau fungsi ProfileCard yang menangani bagian UI terkait. */
function ProfileCard({ user }) {
  // Gabung first_name + last_name jadi satu nama utuh buat ditampilkan.
  // filter(Boolean) biar gak ada spasi ganda kalau salah satunya kosong.
  const fullName = [
    user?.first_name,
    user?.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="settings-card mb-4">
      <div className="mb-4">
        <h5 className="fw-bold mb-1">
          <BsPersonFill className="me-2" />
          Profil Pengguna
        </h5>

        <p className="text-secondary mb-0">
          Informasi akun pengguna yang sedang login.
        </p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label
            htmlFor="profile-name"
            className="form-label fw-semibold"
          >
            Nama
          </label>

          <input
            type="text"
            id="profile-name"
            className="form-control"
            value={fullName || "-"}
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label
            htmlFor="profile-email"
            className="form-label fw-semibold"
          >
            Email
          </label>

          <input
            type="email"
            id="profile-email"
            className="form-control"
            value={user?.email || "-"}
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label
            htmlFor="profile-role"
            className="form-label fw-semibold"
          >
            Role
          </label>

          <input
            type="text"
            id="profile-role"
            className="form-control"
            value={user?.role || "-"}
            readOnly
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
