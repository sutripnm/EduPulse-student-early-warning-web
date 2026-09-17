import { BsPieChartFill } from "react-icons/bs";
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
      <h5>
        <BsPieChartFill className="me-2" />
        Donut Chart: Proporsi Risiko
      </h5>

      <p className="small">
        Distribusi tingkat risiko siswa
      </p>

      <div className="risk-donut-chart-container">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={3}
              isAnimationActive
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={riskColors[entry.name]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RiskDonutChart;