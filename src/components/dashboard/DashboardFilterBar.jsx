/** Komponen atau fungsi DashboardFilterBar yang menangani bagian UI terkait. */
function DashboardFilterBar({
  kelasOptions,
  mapelOptions,
  selectedKelas,
  selectedMapel,
  onKelasChange,
  onMapelChange,
}) {
  return (
    <section className="dashboard-filter-bar mb-4">
      <div>
        <label className="form-label">
          Kelas
        </label>

        <select
          className="form-select"
          value={selectedKelas}
          onChange={(e) => onKelasChange(e.target.value)}
        >
          <option value="">
            Semua Kelas
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

      <div>
        <label className="form-label">
          Mata Pelajaran
        </label>

        <select
          className="form-select"
          value={selectedMapel}
          onChange={(e) =>
            onMapelChange(e.target.value)
          }
        >
          {mapelOptions.length === 0 ? (
            <option value="">
              Mapel tidak tersedia
            </option>
          ) : mapelOptions.length === 1 ? (
            <option
              value={mapelOptions[0].id}
            >
              {mapelOptions[0].nama_mapel}
            </option>
          ) : (
            <>
              <option value="">
                Semua Mata Pelajaran
              </option>

              {mapelOptions.map(
                (mapel) => (
                  <option
                    key={mapel.id}
                    value={mapel.id}
                  >
                    {mapel.nama_mapel}
                  </option>
                )
              )}
            </>
          )}
        </select>
      </div>
    </section>
  );
}

export default DashboardFilterBar;
