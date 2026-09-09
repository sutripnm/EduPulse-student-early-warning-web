import classOptions from "../../data/classOptions";

function AddStudentForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {/* NIS */}
      <div className="mb-3">
        <label htmlFor="nis" className="form-label">
          NIS
        </label>
        <input
          type="text"
          id="nis"
          name="nis"
          className="form-control"
          value={formData.nis}
          onChange={onChange}
          placeholder="Masukkan NIS"
        />
      </div>

      {/* Nama */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nama Siswa
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={onChange}
          placeholder="Masukkan nama siswa"
        />
      </div>

      {/* Tahun Masuk */}
      <div className="mb-3">
        <label htmlFor="entryYear" className="form-label">
          Tahun Masuk
        </label>
        <input
          type="number"
          id="entryYear"
          name="entryYear"
          className="form-control"
          value={formData.entryYear}
          onChange={onChange}
          placeholder="Contoh: 2026"
        />
      </div>

      {/* Kelas */}
      <div className="mb-3">
        <label htmlFor="className" className="form-label">
          Pilih Kelas
        </label>
        <select
          id="className"
          name="className"
          className="form-select"
          value={formData.className}
          onChange={onChange}
        >
          <option value="">Pilih kelas</option>
          {classOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          className="form-select"
          value={formData.gender}
          onChange={onChange}
        >
          <option value="">Pilih gender</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      {/* Orang Tua */}
      <div className="mb-4">
        <label htmlFor="parent" className="form-label">
          Orang Tua
        </label>
        <input
          type="text"
          id="parent"
          name="parent"
          className="form-control"
          value={formData.parent}
          onChange={onChange}
          placeholder="Nama orang tua"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
}

export default AddStudentForm;
