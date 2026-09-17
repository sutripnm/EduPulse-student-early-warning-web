function AddStudentForm({
  formData,
  onChange,
  onSubmit,
  kelasOptions,
  loading,
}) {
  return (
    <form onSubmit={onSubmit}>
      {/* NISN */}
      <div className="mb-3">
        <label
          htmlFor="nisn"
          className="form-label"
        >
          NISN
        </label>

        <input
          type="text"
          id="nisn"
          name="nisn"
          className="form-control"
          value={formData.nisn}
          onChange={onChange}
          placeholder="Masukkan NISN"
          required
        />
      </div>

      {/* Nama */}
      <div className="mb-3">
        <label
          htmlFor="nama"
          className="form-label"
        >
          Nama Siswa
        </label>

        <input
          type="text"
          id="nama"
          name="nama"
          className="form-control"
          value={formData.nama}
          onChange={onChange}
          placeholder="Masukkan nama siswa"
          required
        />
      </div>

      {/* Kelas */}
      <div className="mb-3">
        <label
          htmlFor="kelas_id"
          className="form-label"
        >
          Pilih Kelas
        </label>

        <select
          id="kelas_id"
          name="kelas_id"
          className="form-select"
          value={formData.kelas_id}
          onChange={onChange}
          required
        >
          <option value="">
            Pilih kelas
          </option>

          {kelasOptions.map((kelas) => (
            <option
              key={kelas.id}
              value={kelas.id}
            >
              {kelas.nama_kelas}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label
          htmlFor="gender"
          className="form-label"
        >
          Gender
        </label>

        <select
          id="gender"
          name="gender"
          className="form-select"
          value={formData.gender}
          onChange={onChange}
          required
        >
          <option value="">
            Pilih gender
          </option>

          <option value="L">
            Laki-laki
          </option>

          <option value="P">
            Perempuan
          </option>
        </select>
      </div>

      {/* Orang Tua */}
      <div className="mb-3">
        <label
          htmlFor="first_name_orang_tua"
          className="form-label"
        >
          Nama Depan Orang Tua
        </label>

        <input
          type="text"
          id="first_name_orang_tua"
          name="first_name_orang_tua"
          className="form-control"
          value={
            formData.first_name_orang_tua
          }
          onChange={onChange}
          placeholder="Contoh: Budi"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="last_name_orang_tua"
          className="form-label"
        >
          Nama Belakang Orang Tua
        </label>

        <input
          type="text"
          id="last_name_orang_tua"
          name="last_name_orang_tua"
          className="form-control"
          value={
            formData.last_name_orang_tua
          }
          onChange={onChange}
          placeholder="Contoh: Santoso"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading
          ? "Menyimpan..."
          : "Tambah Siswa"}
      </button>
    </form>
  );
}

export default AddStudentForm;