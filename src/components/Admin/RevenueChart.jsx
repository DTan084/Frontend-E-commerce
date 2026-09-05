import React, { useState } from 'react';
import { BarChart3, TrendingUp, CreditCard, Sparkles } from 'lucide-react';
import './RevenueChart.css';

const RevenueChart = () => {
  const [period, setPeriod] = useState('12months');

  // Mock data for 12 months in VND
  const monthlyData12 = [
    { month: 'T1', revenue: 140000000 },
    { month: 'T2', revenue: 165000000 },
    { month: 'T3', revenue: 190000000 },
    { month: 'T4', revenue: 175000000 },
    { month: 'T5', revenue: 210000000 },
    { month: 'T6', revenue: 245000000 },
    { month: 'T7', revenue: 230000000 },
    { month: 'T8', revenue: 270000000 },
    { month: 'T9', revenue: 290000000 },
    { month: 'T10', revenue: 310000000 },
    { month: 'T11', revenue: 340000000 },
    { month: 'T12', revenue: 380000000 },
  ];

  const monthlyData6 = monthlyData12.slice(6);
  const currentData = period === '6months' ? monthlyData6 : monthlyData12;

  const maxRevenue = Math.max(...currentData.map((d) => d.revenue));
  const totalRevenue = currentData.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / currentData.length);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatMillions = (price) => {
    return `${(price / 1000000).toFixed(0)} tr`;
  };

  return (
    <div className="admin-revenue-chart-card">
      {/* Header */}
      <div className="revenue-chart-head">
        <div className="revenue-chart-head-left">
          <div className="chart-title-icon-wrap">
            <BarChart3 size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="revenue-chart-title">Biểu đồ Tăng trưởng Doanh thu & GMV</h2>
            <p className="revenue-chart-subtitle">Tổng giá trị giao dịch mã nguồn toàn nền tảng</p>
          </div>
        </div>

        <div className="revenue-chart-period-tabs">
          <button
            type="button"
            className={`period-tab-btn ${period === '6months' ? 'active' : ''}`}
            onClick={() => setPeriod('6months')}
          >
            6 Tháng gần nhất
          </button>
          <button
            type="button"
            className={`period-tab-btn ${period === '12months' ? 'active' : ''}`}
            onClick={() => setPeriod('12months')}
          >
            12 Tháng qua
          </button>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="revenue-chart-summary-bar">
        <div className="summary-pill-item">
          <CreditCard size={16} className="text-primary" />
          <div className="summary-pill-text">
            <span className="summary-pill-lbl">Tổng GMV kỳ này:</span>
            <strong className="summary-pill-val text-primary">{formatVND(totalRevenue)}</strong>
          </div>
        </div>

        <div className="summary-pill-divider"></div>

        <div className="summary-pill-item">
          <TrendingUp size={16} className="text-emerald" />
          <div className="summary-pill-text">
            <span className="summary-pill-lbl">Trung bình / tháng:</span>
            <strong className="summary-pill-val">{formatVND(avgRevenue)}</strong>
          </div>
        </div>

        <div className="summary-pill-divider"></div>

        <div className="summary-pill-item">
          <Sparkles size={16} className="text-amber" />
          <div className="summary-pill-text">
            <span className="summary-pill-lbl">Tháng đỉnh điểm:</span>
            <strong className="summary-pill-val">{formatVND(maxRevenue)}</strong>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="chart-canvas-wrapper">
        <div className="chart-y-axis-labels">
          {[4, 3, 2, 1, 0].map((step) => {
            const val = (maxRevenue * step) / 4;
            return (
              <span key={step} className="y-axis-label-item">
                {formatMillions(val)}
              </span>
            );
          })}
        </div>

        <div className="chart-bars-track">
          {currentData.map((item, idx) => {
            const heightPercent = Math.max(10, Math.round((item.revenue / maxRevenue) * 100));
            return (
              <div key={idx} className="admin-bar-col">
                <div className="admin-bar-container">
                  <div
                    className="admin-bar-fill"
                    style={{ height: `${heightPercent}%` }}
                    data-tooltip={`${item.month}: ${formatVND(item.revenue)}`}
                  ></div>
                </div>
                <span className="admin-x-axis-lbl">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Note */}
      <div className="chart-footer-legend">
        <div className="legend-indicator">
          <span className="legend-box indigo"></span>
          <span>Doanh thu toàn sàn (VND)</span>
        </div>
        <span className="chart-hover-hint">Di chuột vào từng cột để xem giá trị chi tiết</span>
      </div>
    </div>
  );
};

export default RevenueChart;
