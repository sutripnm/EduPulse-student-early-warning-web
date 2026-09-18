import { BsBarChartFill, BsBullseye } from "react-icons/bs";
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
}) {
  return (
    <section className="mt-5">
      <h5 className="mb-3">
        LAPORAN ANALITIS & STATISTIK SEKOLAH
      </h5>

      <div className="row g-3">

        {/* =========================
            PERBANDINGAN RISIKO KELAS
            ========================= */}
        <div className="col-lg-6">
          <div className="dashboard-box analytics-box">
            <h6 className="mb-1">
              <BsBarChartFill className="me-2" />
              Perbandingan Risiko per Kelas
            </h6>

            <p className="small mb-3">
              Jumlah siswa berdasarkan tingkat risiko
            </p>

            <div className="analytics-chart-container">
              <ResponsiveContainer
                width="100%"
                height={310}
              >
                <BarChart data={riskByClassData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="nama_kelas" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

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

        {/* =========================
            FAKTOR UTAMA RISIKO
            ========================= */}
        <div className="col-lg-6">
          <div className="dashboard-box analytics-box">
            <h6 className="mb-1">
              <BsBullseye className="me-2" />
              Faktor Utama Risiko
            </h6>

            <p className="small mb-2">
              Faktor yang paling berkontribusi terhadap risiko siswa
            </p>

            <div className="analytics-chart-container risk-factor-chart-container">
              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <PieChart>
                <Pie
                  data={riskFactorData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="47%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {riskFactorData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={riskFactorColors[index]}
                    />
                  ))}
                </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    layout="horizontal"
                    height={70}
                  />
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