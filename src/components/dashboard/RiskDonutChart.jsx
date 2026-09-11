import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { riskColors } from "../../utils/dashboardColors";

function RiskDonutChart({ data }) {
  return (
    <div className="dashboard-box risk-donut-box">
      <h5>🍩 Donut Chart: Proporsi Risiko</h5>
      <p className="small">Distribusi tingkat risiko siswa</p>

      <div className="risk-donut-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
              activeShape={false}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={riskColors[entry.name]}
                  className="risk-donut-cell"
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="risk-donut-detail">
        {data.map((item) => (
          <div
            key={item.name}
            className="risk-donut-detail-item"
          >
            <span
              className="risk-donut-dot"
              style={{
                backgroundColor: riskColors[item.name],
              }}
            />

            <span className="risk-donut-label">
              {item.name}
            </span>

            <span className="risk-donut-value">
              {item.value}
            </span>

            <span className="risk-donut-percentage">
              ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiskDonutChart;