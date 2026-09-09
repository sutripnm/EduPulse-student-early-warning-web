// Komponen generik: tabel + form tambah/edit sederhana untuk item
// {id, name}. Semua teks yang beda antara "Mata Pelajaran" dan "Kelas"
// dikirim lewat props, jadi komponen ini dipakai 2x di AcademicSettingsPage
// tanpa duplikasi JSX.
function AcademicCrudCard({
  icon,
  title,
  description,
  addButtonLabel,
  submitLabel,
  addFormTitle,
  editFormTitle,
  inputLabel,
  inputPlaceholder,
  columnLabel,
  crud,
}) {
  const {
    items,
    showForm,
    name,
    setName,
    editingId,
    openAddForm,
    cancelForm,
    handleSubmit,
    openEditForm,
    handleDelete,
  } = crud;

  const inputId = `${title.toLowerCase().replace(/\s+/g, "-")}-name`;

  return (
    <section className="academic-settings-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">
            {icon} {title}
          </h5>
          <p className="text-secondary mb-0">{description}</p>
        </div>

        <button type="button" className="btn btn-primary" onClick={openAddForm}>
          {addButtonLabel}
        </button>
      </div>

      {showForm && (
        <div className="academic-form-box mb-4">
          <h6 className="fw-bold mb-3">
            {editingId ? editFormTitle : addFormTitle}
          </h6>

          <form onSubmit={handleSubmit}>
            <label htmlFor={inputId} className="form-label fw-semibold">
              {inputLabel}
            </label>

            <input
              type="text"
              id={inputId}
              className="form-control"
              placeholder={inputPlaceholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <div className="d-flex gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={cancelForm}
              >
                Batal
              </button>

              <button type="submit" className="btn btn-primary">
                {editingId ? "Simpan Perubahan" : submitLabel}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>No</th>
              <th>{columnLabel}</th>
              <th style={{ width: "180px" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <span className="fw-semibold">{item.name}</span>
                </td>
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AcademicCrudCard;
