import React, { useState } from 'react';
import './SalesChart.css';

const SalesChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  // Mock data for last 30 days
  const salesData = [
    { day: 1, sales: 45, revenue: 2250 },
    { day: 2, sales: 52, revenue: 2600 },
    { day: 3, sales: 38, revenue: 1900 },
    { day: 4, sales: 65, revenue: 3250 },
    { day: 5, sales: 48, revenue: 2400 },
    { day: 6, sales: 72, revenue: 3600 },
    { day: 7, sales: 85, revenue: 4250 },
    { day: 8, sales: 58, revenue: 2900 },
    { day: 9, sales: 62, revenue: 3100 },
    { day: 10, sales: 55, revenue: 2750 },
    { day: 11, sales: 70, revenue: 3500 },
    { day: 12, sales: 68, revenue: 3400 },
    { day: 13, sales: 75, revenue: 3750 },
    { day: 14, sales: 90, revenue: 4500 },
    { day: 15, sales: 82, revenue: 4100 },
    { day: 16, sales: 78, revenue: 3900 },
    { day: 17, sales: 65, revenue: 3250 },
    { day: 18, sales: 72, revenue: 3600 },
    { day: 19, sales: 68, revenue: 3400 },
    { day: 20, sales: 85, revenue: 4250 },
    { day: 21, sales: 95, revenue: 4750 },
    { day: 22, sales: 88, revenue: 4400 },
    { day: 23, sales: 92, revenue: 4600 },
    { day: 24, sales: 80, revenue: 4000 },
    { day: 25, sales: 75, revenue: 3750 },
    { day: 26, sales: 82, revenue: 4100 },
    { day: 27, sales: 78, revenue: 3900 },
    { day: 28, sales: 88, revenue: 4400 },
    { day: 29, sales: 95, revenue: 4750 },
    { day: 30, sales: 100, revenue: 5000 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const avgSales = (totalSales / salesData.length).toFixed(1);

  const periods = [
    { id: '7days', label: '7 Days' },
    { id: '30days', label: '30 Days' },
    { id: '90days', label: '90 Days' },
  ];

  return (
    <div className="sales-chart-container">
      <div className="chart-header">
        <div className="chart-title-section">
          <h2 className="chart-title">
            📈 Sales Overview
          </h2>
          <p className="chart-subtitle">
            Track your sales performance over time
          </p>
        </div>
        
        <div className="chart-period-selector">
          {periods.map(period => (
            <button
              key={period.id}
              className={`period-btn ${selectedPeriod === period.id ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period.id)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Stats */}
      <div className="chart-stats">
        <div className="chart-stat-item">
          <span className="stat-label">Total Sales</span>
          <strong className="stat-value">{totalSales}</strong>
        </div>
        <div className="chart-stat-divider"></div>
        <div className="chart-stat-item">
          <span className="stat-label">Revenue</span>
          <strong className="stat-value">${totalRevenue.toLocaleString()}</strong>
        </div>
        <div className="chart-stat-divider"></div>
        <div className="chart-stat-item">
          <span className="stat-label">Avg/Day</span>
          <strong className="stat-value">{avgSales}</strong>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="chart-visualization">
        <div className="chart-y-axis">
          <span className="y-axis-label">{maxSales}</span>
          <span className="y-axis-label">{Math.round(maxSales * 0.75)}</span>
          <span className="y-axis-label">{Math.round(maxSales * 0.5)}</span>
          <span className="y-axis-label">{Math.round(maxSales * 0.25)}</span>
          <span className="y-axis-label">0</span>
        </div>

        <div className="chart-area">
          {/* Grid Lines */}
          <div className="chart-grid">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="grid-line"></div>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="chart-bars">
            {salesData.map((data, index) => {
              const height = (data.sales / maxSales) * 100;
              return (
                <div
                  key={data.day}
                  className="bar-wrapper"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <div className="bar-tooltip">
                    <strong>${data.revenue}</strong>
                    <span>{data.sales} sales</span>
                    <small>Day {data.day}</small>
                  </div>
                  <div
                    className="bar"
                    style={{ height: `${height}%` }}
                  >
                    <div className="bar-fill"></div>
                  </div>
                  {index % 5 === 0 && (
                    <span className="bar-label">{data.day}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' }}></div>
          <span>Daily Sales</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon">📊</div>
          <span>Higher bars indicate better performance</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
