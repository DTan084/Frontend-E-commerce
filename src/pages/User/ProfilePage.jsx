import React, { useState } from 'react';
import './UserPages.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: 'User Name',
    email: 'user@example.com',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cập nhật thông tin thành công!');
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Thông tin tài khoản</h1>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="3" />
          </div>

          <button type="submit" className="btn-primary">
            Cập nhật thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
