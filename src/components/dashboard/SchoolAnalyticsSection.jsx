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

function SchoolAnalyticsSection({ riskByClassData, riskFactorData }) {
  return (
    <section className="mt-5">
      <h5 className="mb-3">LAPORAN ANALITIS & STATISTIK SEKOLAH</h5>

      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-primary rounded-pill">Filter Kelas</button>
        <button className="btn btn-primary rounded-pill">Filter Mapel</button>
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
                    fill="#dc3545"
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
