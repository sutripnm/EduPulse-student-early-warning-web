import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/add-student-page.css";

function AddStudentPage() {
  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    entryYear: "",
    className: "",
    gender: "",
    parent: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Data siswa:", formData);
  };

  return (
    <main className="add-student-page d-flex">

      <Sidebar />

      <section className="add-student-main flex-grow-1">

        <div className="add-student-container">

          <h1 className="h4 fw-semibold text-center mb-4">
            Tambah Siswa Baru
          </h1>

          <form onSubmit={handleSubmit}>

            {/* NIS */}
            <div className="mb-3">
              <label
                htmlFor="nis"
                className="form-label"
              >
                NIS
              </label>

              <input
                type="text"
                id="nis"
                name="nis"
                className="form-control"
                value={formData.nis}
                onChange={handleChange}
                placeholder="Masukkan NIS"
              />
            </div>

            {/* Nama */}
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label"
              >
                Nama Siswa
              </label>

              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama siswa"
              />
            </div>

            {/* Tahun Masuk */}
            <div className="mb-3">
              <label
                htmlFor="entryYear"
                className="form-label"
              >
                Tahun Masuk
              </label>

              <input
                type="number"
                id="entryYear"
                name="entryYear"
                className="form-control"
                value={formData.entryYear}
                onChange={handleChange}
                placeholder="Contoh: 2026"
              />
            </div>

            {/* Kelas */}
            <div className="mb-3">
              <label
                htmlFor="className"
                className="form-label"
              >
                Pilih Kelas
              </label>

              <select
                id="className"
                name="className"
                className="form-select"
                value={formData.className}
                onChange={handleChange}
              >
                <option value="">
                  Pilih kelas
                </option>

                <option value="X IPA 1">
                  X IPA 1
                </option>

                <option value="X IPA 2">
                  X IPA 2
                </option>

                <option value="XI IPA 1">
                  XI IPA 1
                </option>

                <option value="XI IPA 2">
                  XI IPA 2
                </option>

                <option value="XII IPA 1">
                  XII IPA 1
                </option>

                <option value="XII IPS 1">
                  XII IPS 1
                </option>
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
                onChange={handleChange}
              >
                <option value="">
                  Pilih gender
                </option>

                <option value="Laki-laki">
                  Laki-laki
                </option>

                <option value="Perempuan">
                  Perempuan
                </option>
              </select>
            </div>

            {/* Orang Tua */}
            <div className="mb-4">
              <label
                htmlFor="parent"
                className="form-label"
              >
                Orang Tua
              </label>

              <input
                type="text"
                id="parent"
                name="parent"
                className="form-control"
                value={formData.parent}
                onChange={handleChange}
                placeholder="Nama orang tua"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Submit
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}

export default AddStudentPage;