# 🛍️ CodeMart — Frontend E-commerce Demo (Mock-Only)

Một dự án frontend mô phỏng sàn thương mại điện tử, tập trung vào UI flow và tổ chức code theo hướng dễ mở rộng.

## Project Snapshot (dành cho HR)

- **Vai trò:** Frontend Developer (cá nhân)
- **Phạm vi:** React SPA, mock data 100%, không tích hợp backend thật
- **Mục tiêu:** Demo năng lực xây dựng giao diện, quản lý state, routing và quy trình làm việc với CI/CD
- **Trạng thái:** Có thể chạy demo end-to-end ở mức frontend

## Điểm kỹ thuật nổi bật

- Xây dựng luồng người dùng chính: trang chủ, sản phẩm, giỏ hàng, checkout, dashboard.
- Quản lý state bằng **Context API** (`AuthContext`, `CartContext`).
- Tổ chức mock data + mock store để mô phỏng dữ liệu runtime qua localStorage.
- Chuẩn hóa chất lượng code với:
  - Husky + lint-staged (pre-commit)
  - CI pipeline (lint, format check, test, build)
  - Auto deploy GitHub Pages.

## Tech Stack

- React 19
- React Router 6
- Context API
- localStorage + mock services
- ESLint, Prettier, Husky, GitHub Actions

## Cấu trúc dữ liệu mock

- **Static mock data:** `src/data/mock*.js`
- **Mock runtime store:** `src/services/mockStore.js`
- **Storage keys:** `src/constants/storageKeys.js`

## Chạy local

1. Cài dependencies
2. Tạo `.env` từ `.env.example`
3. Chạy app ở môi trường dev

### Environment (mock-only)

```env
REACT_APP_NAME=CodeMart
REACT_APP_DESCRIPTION=Marketplace for Source Code & Website Services
REACT_APP_VERSION=1.0.0

REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_CHAT=false

REACT_APP_USE_MOCK_BACKEND=true
REACT_APP_USE_MOCK_CART=true

REACT_APP_DEBUG_MODE=false
```

## Scripts

- `npm start` — chạy local
- `npm test` — chạy test
- `npm run test:ci` — test một lần cho CI
- `npm run build` — build production
- `npm run lint` — kiểm tra lint
- `npm run lint:fix` — tự sửa lint có thể fix
- `npm run format` — format code
- `npm run format:check` — kiểm tra format

## CI/CD & Deployment

- **CI quality:** `.github/workflows/ci.yml`
- **Deploy Pages:** `.github/workflows/deploy-pages.yml`
- Deploy tự động khi push vào `main/master` và CI pass.

Thiết lập 1 lần trên GitHub:

1. Vào **Settings** → **Pages**.
2. Chọn **Source = GitHub Actions**.
3. Push code lên `main/master`.

## Lưu ý phạm vi

- Dự án này tập trung vào **frontend** và **mock data**.
- Chưa tích hợp backend/API production.
