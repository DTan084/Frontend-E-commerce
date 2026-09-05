import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Download, ShoppingBag, Star, Sparkles, RotateCcw, Eye } from 'lucide-react';
import './ActivityTimeline.css';

const ActivityTimeline = ({ activities = [] }) => {
  const navigate = useNavigate();

  const defaultActivities =
    activities.length > 0
      ? activities
      : [
          {
            id: 1,
            type: 'download',
            title: 'Tải mã nguồn "E-commerce React + PHP"',
            description: 'Đã tải thành công file ZIP mã nguồn kèm tài liệu (48.5 MB)',
            timestamp: '2 giờ trước',
            icon: Download,
            color: '#059669',
          },
          {
            id: 2,
            type: 'purchase',
            title: 'Mua thành công "Website Tin Tức - Laravel"',
            description: 'Giao dịch thành công qua VietQR - 1.200.000₫',
            timestamp: '1 ngày trước',
            icon: ShoppingBag,
            color: '#4f46e5',
          },
          {
            id: 3,
            type: 'review',
            title: 'Đánh giá 5 sao cho mã nguồn',
            description: 'Đã viết nhận xét đánh giá chất lượng cho tác giả',
            timestamp: '3 ngày trước',
            icon: Star,
            color: '#d97706',
          },
          {
            id: 4,
            type: 'register',
            title: 'Kích hoạt tài khoản thành viên',
            description: 'Chào mừng bạn gia nhập cộng đồng lập trình viên CodeMart!',
            timestamp: '5 ngày trước',
            icon: Sparkles,
            color: '#7c3aed',
          },
        ];

  return (
    <div className="activity-timeline-card-modern">
      <div className="timeline-card-head">
        <div className="timeline-head-title-wrap">
          <History size={18} className="text-purple" />
          <h3 className="timeline-section-title">Nhật ký hoạt động</h3>
        </div>
        <span className="timeline-count-chip">{defaultActivities.length} sự kiện</span>
      </div>

      <div className="timeline-flow-list">
        {defaultActivities.map((activity, index) => {
          const Icon = activity.icon || History;
          const isLast = index === defaultActivities.length - 1;

          return (
            <div key={activity.id} className="timeline-flow-item">
              <div className="timeline-marker-column">
                <div
                  className="timeline-node-icon"
                  style={{
                    color: activity.color,
                    background: `${activity.color}15`,
                    borderColor: `${activity.color}30`,
                  }}
                >
                  <Icon size={14} />
                </div>
                {!isLast && <div className="timeline-connector-line"></div>}
              </div>

              <div className="timeline-bubble-content">
                <div className="bubble-header-row">
                  <h4 className="bubble-event-title">{activity.title}</h4>
                  <span className="bubble-time-text">{activity.timestamp}</span>
                </div>
                <p className="bubble-desc-text">{activity.description}</p>

                {(activity.type === 'download' || activity.type === 'purchase') && (
                  <div className="bubble-action-wrap">
                    <button
                      type="button"
                      className="btn-bubble-quick-action"
                      onClick={() =>
                        activity.type === 'download'
                          ? alert('Đang bắt đầu tải lại mã nguồn!')
                          : navigate('/user/orders')
                      }
                    >
                      {activity.type === 'download' ? (
                        <>
                          <RotateCcw size={12} />
                          <span>Tải lại</span>
                        </>
                      ) : (
                        <>
                          <Eye size={12} />
                          <span>Xem đơn</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
