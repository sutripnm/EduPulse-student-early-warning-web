import useAcademicCrudForm from "../../hooks/useAcademicCrudForm";
import { getFullName } from "../../utils/formatName";

// Kartu CRUD generik, dipakai 2x di AcademicSettingsPage: sekali untuk
// Mata Pelajaran (type="mapel"), sekali untuk Kelas (type="kelas").
// Semua teks yang beda antar keduanya dikirim lewat props, biar JSX-nya
// gak perlu duplikat.
function AcademicCrudCard({
  type,
  icon,
  title,
  description,
  addButtonLabel,
  submitLabel,
  addFormTitle,
  editFormTitle,
  items,
  loading,
  onCreate,
  onUpdate,
  onDelete,
}) {
  // State form (buka/tutup, sedang edit item mana) + handler submit/
  // delete, semuanya dari hook useAcademicCrudForm supaya komponen ini
  // tinggal menampilkan.
  const {
    isMapel,
    inputId,
    showForm,
    editingId,
    kodeMapel,
    setKodeMapel,
    nama,
    setNama,
    saving,
    openAddForm,
    openEditForm,
    cancelForm,
    handleSubmit,
    handleDelete,
  } = useAcademicCrudForm({ type, title, onCreate, onUpdate, onDelete });

  return (
    <section className="academic-settings-card h-100">
      {/* =========================
          HEADER
          ========================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">
            {icon} {title}
          </h5>

          <p className="text-secondary mb-0">{description}</p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddForm}
          disabled={saving}
        >
          {addButtonLabel}
        </button>
      </div>

      {/* =========================
          FORM
          ========================= */}

      {showForm && (
        <div className="academic-form-box mb-4">
          <h6 className="fw-bold mb-3">
            {editingId ? editFormTitle : addFormTitle}
          </h6>

          <form onSubmit={handleSubmit}>
            {/* MAPEL */}
            {isMapel && (
              <div className="mb-3">
                <label htmlFor={`${type}-code`} className="form-label fw-semibold">
                  Kode Mata Pelajaran
                </label>

                <input
                  type="text"
                  id={`${type}-code`}
                  className="form-control"
                  placeholder="Contoh: MATH10"
                  value={kodeMapel}
                  onChange={(event) => setKodeMapel(event.target.value)}
                  required
                />
              </div>
            )}

            {/* NAMA */}
            <div className="mb-3">
              <label htmlFor={inputId} className="form-label fw-semibold">
                {isMapel ? "Nama Mata Pelajaran" : "Nama Kelas"}
              </label>

              <input
                type="text"
                id={inputId}
                className="form-control"
                placeholder={isMapel ? "Contoh: Matematika" : "Contoh: XI IPA 3"}
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                required
              />
            </div>

            <div className="d-flex gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={cancelForm}
                disabled={saving}
              >
                Batal
              </button>

              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Menyimpan..." : editingId ? "Simpan Perubahan" : submitLabel}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          TABLE
          ========================= */}

      {loading ? (
        <div className="text-center py-4 text-secondary">Memuat data...</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              {isMapel ? (
                <tr>
                  <th style={{ width: "60px" }}>No</th>
                  <th>Kode</th>
                  <th>Mata Pelajaran</th>
                  <th>Pengajar</th>
                  <th style={{ width: "180px" }}>Aksi</th>
                </tr>
              ) : (
                <tr>
                  <th style={{ width: "60px" }}>No</th>
                  <th>Kelas</th>
                  <th>Wali Kelas</th>
                  <th style={{ width: "180px" }}>Aksi</th>
                </tr>
              )}
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={isMapel ? 5 : 4} className="text-center py-4 text-secondary">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    {isMapel ? (
                      <>
                        <td>{item.kode_mapel || "-"}</td>
                        <td>
                          <span className="fw-semibold">{item.nama_mapel || "-"}</span>
                        </td>
                        <td>{getFullName(item.pengajar)}</td>
                      </>
                    ) : (
                      <>
                        <td>
                          <span className="fw-semibold">{item.nama_kelas || "-"}</span>
                        </td>
                        <td>{getFullName(item.wali_kelas)}</td>
                      </>
                    )}

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => openEditForm(item)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AcademicCrudCard;
