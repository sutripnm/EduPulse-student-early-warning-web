import { Link } from "react-router-dom";

function StudentFilterBar({
  search,
  setSearch,
  classFilter,
  setClassFilter,
  riskFilter,
  setRiskFilter,
  kelasOptions,
}) {
  return (
    <section className="student-filter mb-4">
      <div className="row g-3 align-items-end">

        {/* Search */}
        <div className="col-lg-5">
          <label htmlFor="search" className="form-label fw-semibold">
            Cari Siswa
          </label>

          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Cari berdasarkan nama atau NIS..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* Filter Kelas */}
        <div className="col-lg-2">
          <label htmlFor="class" className="form-label fw-semibold">
            Kelas
          </label>

          <select
            id="class"
            className="form-select"
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
          >
            <option value="">Semua Kelas</option>

            {kelasOptions.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.nama_kelas}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Risiko */}
        <div className="col-lg-2">
          <label htmlFor="risk" className="form-label fw-semibold">
            Status Risiko
          </label>

          <select
            id="risk"
            className="form-select"
            value={riskFilter}
            onChange={(event) => setRiskFilter(event.target.value)}
          >
            <option value="">Semua Risiko</option>
            <option value="2">Tinggi</option>
            <option value="1">Sedang</option>
            <option value="0">Rendah</option>
          </select>
        </div>

        {/* Tambah Siswa */}
        <div className="col-lg-3">
          <Link to="/tambah-siswa" className="btn btn-dark w-100">
            + Tambah Siswa
          </Link>
        </div>

      </div>
    </section>
  );
}

export default StudentFilterBar;