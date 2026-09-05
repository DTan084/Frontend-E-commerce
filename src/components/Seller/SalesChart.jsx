import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import './SalesChart.css';

const SalesChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  // Mock data for last 30 days in VND
  const salesData = [
    { day: 1, sales: 2, revenue: 3000000 },
    { day: 2, sales: 4, revenue: 5600000 },
    { day: 3, sales: 1, revenue: 1500000 },
    { day: 4, sales: 5, revenue: 7500000 },
    { day: 5, sales: 3, revenue: 4200000 },
    { day: 6, sales: 6, revenue: 9000000 },
    { day: 7, sales: 7, revenue: 11500000 },
    { day: 8, sales: 4, revenue: 6000000 },
    { day: 9, sales: 5, revenue: 7800000 },
    { day: 10, sales: 3, revenue: 4500000 },
    { day: 11, sales: 6, revenue: 8900000 },
    { day: 12, sales: 5, revenue: 7200000 },
    { day: 13, sales: 6, revenue: 9400000 },
    { day: 14, sales: 8, revenue: 12500000 },
    { day: 15, sales: 7, revenue: 10800000 },
    { day: 16, sales: 6, revenue: 9200000 },
    { day: 17, sales: 4, revenue: 5800000 },
    { day: 18, sales: 5, revenue: 7500000 },
    { day: 19, sales: 6, revenue: 9100000 },
    { day: 20, sales: 7, revenue: 11000000 },
    { day: 21, sales: 9, revenue: 14200000 },
    { day: 22, sales: 8, revenue: 12600000 },
    { day: 23, sales: 7, revenue: 11300000 },
    { day: 24, sales: 6, revenue: 9600000 },
    { day: 25, sales: 5, revenue: 8000000 },
    { day: 26, sales: 7, revenue: 11000000 },
    { day: 27, sales: 6, revenue: 9400000 },
    { day: 28, sales: 8, revenue: 12800000 },
    { day: 29, sales: 9, revenue: 14500000 },
    { day: 30, sales: 10, revenue: 16000000 },
  ];

  const maxRevenue = Math.max(...salesData.map((d) => d.revenue));
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const avgSalesPerDay = (totalSales / salesData.length).toFixed(1);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const periods = [
    { id: '7days', label: '7 ngày qua' },
    { id: '30days', label: '30 ngày qua' },
    { id: '90days', label: '90 ngày qua' },
  ];

  return (
    <div className="sales-chart-card-modern">
      <div className="sales-chart-head">
        <div className="chart-title-area">
          <div className="chart-head-icon-wrap">
            <BarChart3 size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="sales-chart-title">Biểu đồ doanh thu & tăng trưởng</h2>
            <p className="sales-chart-subtitle">
              Theo dõi biến động doanh số và lượt tải mã nguồn theo thời gian thực
            </p>
          </div>
        </div>

        <div className="chart-period-tabs">
          {periods.map((period) => (
            <button
              key={period.id}
              type="button"
              className={`btn-period-tab ${selectedPeriod === period.id ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period.id)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Strip */}
      <div className="chart-summary-metrics">
        <div className="summary-metric-box">
          <span className="summary-lbl">Tổng lượt bán</span>
          <strong className="summary-val">{totalSales} lượt</strong>
        </div>
        <div className="summary-metric-divider"></div>
        <div className="summary-metric-box">
          <span className="summary-lbl">Tổng doanh thu kỳ</span>
          <strong className="summary-val text-primary">{formatVND(totalRevenue)}</strong>
        </div>
        <div className="summary-metric-divider"></div>
        <div className="summary-metric-box">
          <span className="summary-lbl">Trung bình/ngày</span>
          <strong className="summary-val">{avgSalesPerDay} đơn/ngày</strong>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="chart-bars-viewport">
        <div className="chart-y-legend">
          <span>{formatVND(maxRevenue)}</span>
          <span>{formatVND(maxRevenue * 0.75)}</span>
          <span>{formatVND(maxRevenue * 0.5)}</span>
          <span>{formatVND(maxRevenue * 0.25)}</span>
          <span>0 ₫</span>
        </div>

        <div className="chart-canvas-area">
          {/* Background Grid Lines */}
          <div className="chart-grid-backdrop">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="canvas-grid-line"></div>
            ))}
          </div>

          {/* Dynamic Interactive Bars */}
          <div className="chart-interactive-bars">
            {salesData.map((data, index) => {
              const heightPercent = (data.revenue / maxRevenue) * 100;
              return (
                <div key={data.day} className="chart-col-wrapper">
                  <div className="bar-floating-tooltip">
                    <strong>{formatVND(data.revenue)}</strong>
                    <span>{data.sales} đơn hàng</span>
                    <small>Ngày {data.day}</small>
                  </div>
                  <div className="bar-pillar-track">
                    <div className="bar-pillar-fill" style={{ height: `${heightPercent}%` }}></div>
                  </div>
                  {index % 5 === 0 && <span className="bar-day-label">N{data.day}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart Footer Note */}
      <div className="chart-footer-strip">
        <div className="chart-legend-indicator">
          <div className="legend-sample-pill"></div>
          <span>Doanh thu thực nhận sau phí sàn 20%</span>
        </div>
        <span className="chart-live-badge">Dữ liệu cập nhật trực tiếp</span>
      </div>
    </div>
  );
};

export default SalesChart;
