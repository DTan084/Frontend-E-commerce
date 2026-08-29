import React from 'react';
import { Code2, Download, Users, Star } from 'lucide-react';
import './StatsBar.css';

const StatsBar = () => {
  const stats = [
    {
      icon: Code2,
      value: '10,000+',
      label: 'Mã nguồn cao cấp',
      color: '#4f46e5',
      bg: 'rgba(79, 70, 229, 0.1)',
    },
    {
      icon: Download,
      value: '50,000+',
      label: 'Lượt tải & Giao dịch',
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.1)',
    },
    {
      icon: Users,
      value: '25,000+',
      label: 'Lập trình viên tin dùng',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Đánh giá chất lượng',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-bar-grid">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="stats-bar-card">
                <div
                  className="stats-bar-icon"
                  style={{ backgroundColor: stat.bg, color: stat.color }}
                >
                  <IconComponent size={26} />
                </div>
                <div className="stats-bar-content">
                  <div className="stats-bar-value">{stat.value}</div>
                  <div className="stats-bar-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
