import { BsBarChartFill, BsBullseye } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { riskFactorColors } from "../../utils/dashboardColors";

/**
 * Menampilkan bagian analisis dan statistik sekolah.
 *
 * Bagian ini terdiri dari:
 * 1. Perbandingan jumlah siswa berdasarkan risiko per kelas.
 * 2. Faktor utama yang berkontribusi terhadap risiko siswa.
 */
function SchoolAnalyticsSection({
  riskByClassData,
  riskFactorData,
}) {
  return (
    <section className="school-analytics-section mt-5">
      <h5 className="mb-3">
        LAPORAN ANALITIS & STATISTIK SEKOLAH
      </h5>

      <div className="row g-3">
        {/* =====================================================
            PERBANDINGAN RISIKO PER KELAS
            ===================================================== */}
        <div className="col-12 col-lg-6">
          <div className="dashboard-box analytics-box">
            <div className="analytics-header">
              <h6 className="mb-1">
                <BsBarChartFill className="me-2" />
                Perbandingan Risiko per Kelas
              </h6>

              <p className="small mb-0">
                Jumlah siswa berdasarkan tingkat risiko
              </p>
            </div>

            {/* Container chart dibuat fleksibel terhadap ukuran layar. */}
            <div className="analytics-chart-container risk-class-chart-container">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={riskByClassData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="nama_kelas"
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="jumlah_high_risk"
                    name="Risiko Tinggi"
                    fill="var(--edupulse-danger)"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="jumlah_medium_risk"
                    name="Risiko Sedang"
                    fill="var(--edupulse-warning)"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="jumlah_low_risk"
                    name="Risiko Rendah"
                    fill="var(--edupulse-success)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend dibuat manual agar lebih mudah dikontrol */}
            <div className="risk-class-legend">
              <div className="risk-class-legend-item">
                <span
                  className="risk-class-legend-dot"
                  style={{
                    backgroundColor:
                      "var(--edupulse-danger)",
                  }}
                />
                <span>Risiko Tinggi</span>
              </div>

              <div className="risk-class-legend-item">
                <span
                  className="risk-class-legend-dot"
                  style={{
                    backgroundColor:
                      "var(--edupulse-warning)",
                  }}
                />
                <span>Risiko Sedang</span>
              </div>

              <div className="risk-class-legend-item">
                <span
                  className="risk-class-legend-dot"
                  style={{
                    backgroundColor:
                      "var(--edupulse-success)",
                  }}
                />
                <span>Risiko Rendah</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FAKTOR UTAMA RISIKO
            ===================================================== */}
        <div className="col-12 col-lg-6">
          <div className="dashboard-box analytics-box risk-factor-box">
            <div className="analytics-header">
              <h6 className="mb-1">
                <BsBullseye className="me-2" />
                Faktor Utama Risiko
              </h6>

              <p className="small mb-0">
                Faktor yang paling berkontribusi terhadap risiko siswa
              </p>
            </div>

            {/* Chart dan legend dipisahkan agar tidak bertabrakan. */}
            <div className="risk-factor-content">
              <div className="risk-factor-chart-container">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={riskFactorData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="42%"
                      outerRadius="68%"
                      paddingAngle={2}
                    >
                      {riskFactorData.map((entry, index) => (
                        <Cell
                          key={`${entry.name}-${index}`}
                          fill={riskFactorColors[index]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* =================================================
                  CUSTOM LEGEND
                  ================================================= */}
              <div className="risk-factor-legend">
                {riskFactorData.map((entry, index) => (
                  <div
                    key={`${entry.name}-${index}`}
                    className="risk-factor-legend-item"
                  >
                    <span
                      className="risk-factor-legend-dot"
                      style={{
                        backgroundColor:
                          riskFactorColors[index],
                      }}
                    />

                    <span className="risk-factor-legend-label">
                      {entry.name}
                    </span>

                    {entry.value !== undefined && (
                      <span className="risk-factor-legend-value">
                        {entry.value}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SchoolAnalyticsSection;