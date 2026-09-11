import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { riskFactorColors } from "../../utils/dashboardColors";

function SchoolAnalyticsSection({
  riskByClassData,
  riskFactorData,
  mapelOptions,
  selectedMapel,
  onMapelChange,
  kelasOptions,
  selectedKelas,
  onKelasChange,
}) {
  return (
    <section className="mt-5">
      <h5 className="mb-3">LAPORAN ANALITIS & STATISTIK SEKOLAH</h5>

    <div className="d-flex gap-2 mb-3">
      <select
        className="form-select"
        value={selectedKelas}
        onChange={(e) => onKelasChange(e.target.value)}
        style={{ maxWidth: "220px" }}
      >
        <option value="">Semua Kelas</option>

        {kelasOptions?.map((kelas) => (
          <option key={kelas.id} value={kelas.id}>
            {kelas.nama_kelas}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        value={selectedMapel}
        onChange={(e) => onMapelChange(e.target.value)}
        style={{ maxWidth: "250px" }}
      >
        <option value="">Semua Mata Pelajaran</option>

        {mapelOptions?.map((mapel) => (
          <option key={mapel.id} value={mapel.id}>
            {mapel.nama_mapel}
          </option>
        ))}
      </select>
    </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <div className="dashboard-box analytics-box">
            <h6 className="mb-1">📊 Perbandingan Risiko per Kelas</h6>
            <p className="small mb-3">Jumlah siswa berdasarkan tingkat risiko</p>

            <div className="analytics-chart-container">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={riskByClassData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nama_kelas" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="jumlah_high_risk"
                    name="Risiko Tinggi"
                    fill="var(--edupulse-danger)"
                  />
                  <Bar
                    dataKey="jumlah_medium_risk"
                    name="Risiko Sedang"
                    fill="var(--edupulse-warning)"
                  />

                  <Bar
                    dataKey="jumlah_low_risk"
                    name="Risiko Rendah"
                    fill="var(--edupulse-success)"
                  />

                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="dashboard-box analytics-box">
            <h6 className="mb-1">🎯 Faktor Utama Risiko ML</h6>
            <p className="small mb-2">
              Faktor yang paling berkontribusi terhadap risiko siswa
            </p>

            <div className="analytics-chart-container">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={riskFactorData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {riskFactorData.map((entry, index) => (
                      <Cell key={entry.name} fill={riskFactorColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SchoolAnalyticsSection;
