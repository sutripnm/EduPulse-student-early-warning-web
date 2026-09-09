import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PerformanceTrendChart({ data }) {
  return (
    <div className="dashboard-box dashboard-chart-box">
      <h6 className="mb-1">📊 Tren Performa & Presensi</h6>
      <p className="small mb-3">Grafik rata-rata per bulan</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line dataKey="rata_rata_nilai" />
            <Line dataKey="rata_rata_presensi" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="d-flex gap-3 small mt-2">
        <span>
          <strong>●</strong> Performa
        </span>
        <span>
          <strong>●</strong> Presensi
        </span>
      </div>
    </div>
  );
}

export default PerformanceTrendChart;
