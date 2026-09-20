import { BsGraphUp } from "react-icons/bs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/** Komponen atau fungsi PerformanceTrendChart yang menangani bagian UI terkait. */
function PerformanceTrendChart({ data }) {
  // Ambil warna garis chart langsung dari CSS variable tema (theme.css),
  // biar warnanya ikut berubah kalau tema/palet warna diubah, tanpa
  // perlu hardcode hex code di sini.
  const successColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--edupulse-success")
    .trim();

  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--edupulse-primary")
    .trim();

  return (
    <div className="dashboard-box performance-trend-box">
      <h6 className="mb-1">
        <BsGraphUp className="me-2" />
        Tren Performa & Presensi
      </h6>

      <p className="small mb-3">
        Grafik rata-rata per bulan
      </p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="rata_rata_nilai"
              name="Performa"
              stroke={successColor}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="rata_rata_presensi"
              name="Presensi"
              stroke={primaryColor}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PerformanceTrendChart;
