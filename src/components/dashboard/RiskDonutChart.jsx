import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { riskColors } from "../../utils/dashboardColors";

function RiskDonutChart({ data }) {
  return (
    <div className="dashboard-box dashboard-chart-box">
      <h6 className="mb-1">🍩 Donut Chart: Proporsi Risiko</h6>
      <p className="small mb-2">Distribusi tingkat risiko siswa</p>

      <div className="risk-chart-container">
        <ResponsiveContainer width="100%" height={258}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={riskColors[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RiskDonutChart;
