# PROJECT_GUIDE

Mục tiêu: hướng dẫn cách chạy và kết nối frontend với backend cho dự án `ecommerce-website`.

**Tóm tắt nhanh**
- Backend: `backend` (Express + TypeScript + MongoDB). API base: `/api` (ví dụ: `/api/user/register`).
- Frontend: `frontend` (Vite + React + TypeScript). Dev server mặc định của Vite (5173).

**Yêu cầu môi trường**
- Node.js (v18+ recommended)
- npm hoặc pnpm
- MongoDB connection string (sử dụng Atlas hoặc local)

**Biến môi trường (backend/.env)**
- `DB` — MongoDB connection string
- `JWT_SECRET` — secret cho access token
- `JWT_REFRESH_SECRET` — secret cho refresh token
- `PORT` — (tùy chọn) port server (mặc định 3000)

## Chạy project (phát triển)

1) Backend

```bash
cd backend
npm install
# chạy dev (nodemon hoặc tsx)
npm run dev
```

Kiểm tra: truy cập http://localhost:3000/ → trả về `API Working` nếu server chạy.

2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Mở trình duyệt tại http://localhost:5173 (mặc định). Nếu cần đổi port, cấu hình trong `vite`.

## Cách kết nối Frontend ⇄ Backend

Hai cách chính:

1. Gọi API trực tiếp bằng URL đầy đủ (ví dụ `http://localhost:3000/api/...`) — đã có `cors()` trên backend nên cho phép gọi từ trình duyệt.

2. (Khuyến nghị trong dev) Dùng proxy trên Vite để tránh CORS và giữ cùng origin. Thêm cấu hình trong `frontend/vite.config.ts`:

```ts
// thêm vào export default defineConfig({ ... })
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, '/api')
    }
  }
}

// Sau đó từ frontend bạn có thể gọi `/api/user/register` mà không cần host/port.
```

### API quan trọng hiện có
- POST `/api/user/register` — đăng ký
  - Payload expected (backend hiện tại): `{ firstName, lastName, email, password, confirmPassword }`
- POST `/api/user/login` — login (hiện trả mock `{ success: true, message: "login" }`)

Lưu ý: frontend hiện tại dùng dữ liệu mock trong `src/contexts/AuthContext.tsx`. Để tích hợp thật, thay hàm `register`/`login` bằng gọi API (ví dụ `fetch` hoặc `axios`).

## Ví dụ thay `register` trong `AuthContext` (gợi ý)

1) Tách `fullName` thành `firstName` / `lastName`:

```ts
const [firstName, lastName] = data.fullName.trim().split(/\s+/).reduce(
  (acc, cur, idx, arr) => {
    if (idx === arr.length - 1) acc[1] = (acc[1] ? acc[1] + ' ' : '') + cur;
    else acc[0] = (acc[0] ? acc[0] + ' ' : '') + cur;
    return acc;
  }, ['', ''] as [string, string]
);

const payload = {
  firstName: firstName || data.fullName,
  lastName: lastName || '',
  email: data.email,
  password: data.password,
  confirmPassword: data.password,
};

const res = await fetch('/api/user/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
const json = await res.json();
```

2) Ví dụ `login`:

```ts
const res = await fetch('/api/user/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const json = await res.json();
```

Nếu không dùng proxy, thay `'/api/...'` bằng `'http://localhost:3000/api/...'`.

## Bảo mật & Lưu token
- Sau khi nhận `accessToken`/`refreshToken` từ backend: lưu `accessToken` tạm thời trong memory hoặc `httpOnly` cookie (khuyến nghị dùng cookie từ server), tránh localStorage cho token dài hạn nếu có rủi ro XSS.

## Cập nhật nhanh `vite.config.ts`

Mở [frontend/vite.config.ts](frontend/vite.config.ts) và thêm khối `server.proxy` như ví dụ ở trên.

## Triển khai (tóm tắt)
- Backend: build TypeScript (`npm run build`) → deploy node app (hoặc container). Đặt biến môi trường `DB`, `JWT_SECRET`, `JWT_REFRESH_SECRET`.
- Frontend: build Vite (`npm run build`) → host static (Netlify / Vercel / gh-pages / S3).
- Nếu frontend và backend cùng domain khi deploy, update `API_BASE` tương ứng hoặc dùng relative `/api` paths.

## Kiểm tra & xử lý lỗi thường gặp
- Lỗi kết nối DB: kiểm tra `DB` trong `.env` và xem logs kết nối MongoDB.
- CORS error: backend đã bật `cors()`; nếu vẫn lỗi, kiểm tra header `Origin` và proxy config.
- 404 API: kiểm tra route sử dụng đúng `/api/...` và backend đang lắng nghe port đúng.
- Lỗi payload: kiểm tra fields gửi từ frontend khớp với backend (ví dụ `firstName`/`lastName`).

## Gợi ý bước tiếp theo
- 1) Bật API thật ở `AuthContext` bằng ví dụ `fetch`/`axios`.
- 2) Thử đăng ký 1 user qua form `Auth` và kiểm tra MongoDB.
- 3) Cập nhật frontend để lưu token an toàn (httpOnly cookie hoặc in-memory + refresh flow).

---

Nếu bạn muốn, tôi có thể:
- cập nhật `frontend/vite.config.ts` để thêm proxy (chỉ cần xác nhận),
- thay `AuthContext` mock bằng phiên bản gọi backend và tạo commit thử.
