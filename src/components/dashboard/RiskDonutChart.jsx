import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import useDashboardData, { riskColors } from "../../hooks/useDashboardData";

function RiskDonutChart() {
  const { riskData = [] } = useDashboardData();

  return (
    <div className="col-md-4">
      <div className="dashboard-box dashboard-chart-box">

        <h6 className="mb-1">
          🍩 Donut Chart: Proporsi Risiko
        </h6>

        <p className="small mb-2">
          Distribusi tingkat risiko siswa
        </p>

        {/* Donut Chart */}
        <div className="risk-chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
              >
                {riskData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={riskColors[entry.name] || '#8884d8'}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Keterangan / Legend Jumlah Siswa */}
        <div className="d-flex justify-content-around align-items-center mt-2 pt-2 border-top">
          {riskData.map((item) => (
            <div key={item.name} className="text-center px-1">
              {/* Label & Indicator Warna */}
              <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: riskColors[item.name] || '#8884d8'
                  }}
                />
                <span className="small text-muted fw-medium" style={{ fontSize: '0.8rem' }}>
                  {item.name}
                </span>
              </div>

              {/* Jumlah Siswa */}
              <div className="fw-bold">
                {item.value} <span className="fw-normal text-muted" style={{ fontSize: '0.75rem' }}>siswa</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default RiskDonutChart;