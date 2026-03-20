import React, { useState } from 'react';
import './RevenueChart.css';

const RevenueChart = () => {
  const [period, setPeriod] = useState('12months');

  // Mock data for 12 months
  const monthlyData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 3800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 4600 },
    { month: 'May', revenue: 6200 },
    { month: 'Jun', revenue: 5800 },
    { month: 'Jul', revenue: 7100 },
    { month: 'Aug', revenue: 6800 },
    { month: 'Sep', revenue: 8200 },
    { month: 'Oct', revenue: 9100 },
    { month: 'Nov', revenue: 8800 },
    { month: 'Dec', revenue: 10200 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = (totalRevenue / monthlyData.length).toFixed(0);

  return (
    <div className="revenue-chart-container">
      {/* Header */}
      <div className="chart-header">
        <div className="header-left">
          <h2 className="chart-title">📊 Revenue Overview</h2>
          <p className="chart-subtitle">Last 12 months performance</p>
        </div>
        
        <div className="chart-controls">
          <button 
            className={`period-btn ${period === '6months' ? 'active' : ''}`}
            onClick={() => setPeriod('6months')}
          >
            6 Months
          </button>
          <button 
            className={`period-btn ${period === '12months' ? 'active' : ''}`}
            onClick={() => setPeriod('12months')}
          >
            12 Months
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="chart-summary">
        <div className="summary-item">
          <span className="summary-icon">💵</span>
          <div className="summary-content">
            <strong className="summary-value">${totalRevenue.toLocaleString()}</strong>
            <span className="summary-label">Total Revenue</span>
          </div>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="summary-item">
          <span className="summary-icon">📈</span>
          <div className="summary-content">
            <strong className="summary-value">${avgRevenue}</strong>
            <span className="summary-label">Avg / Month</span>
          </div>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="summary-item">
          <span className="summary-icon">🎯</span>
          <div className="summary-content">
            <strong className="summary-value">${maxRevenue.toLocaleString()}</strong>
            <span className="summary-label">Highest</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-area">
        {/* Y-axis labels */}
        <div className="y-axis">
          {[5, 4, 3, 2, 1, 0].map((tick) => (
            <div key={tick} className="y-axis-label">
              ${(maxRevenue * tick / 5 / 1000).toFixed(0)}k
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="chart-bars">
          {monthlyData.map((data, index) => {
            const height = (data.revenue / maxRevenue) * 100;
            return (
              <div 
                key={data.month} 
                className="bar-wrapper"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="bar-container">
                  <div 
                    className="bar"
                    style={{ height: `${height}%` }}
                    data-tooltip={`$${data.revenue.toLocaleString()}`}
                  >
                    <div className="bar-fill"></div>
                  </div>
                </div>
                <span className="x-axis-label">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color revenue"></span>
          <span className="legend-label">Revenue</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">📊</span>
          <span className="legend-text">Hover over bars to see exact values</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
