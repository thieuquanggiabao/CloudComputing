# 🎬 Cinema Booking System - Zoho Integration

React + Vite + Express + Zoho Desk + Zoho Books

## 📋 Tính năng

✅ **Đặt vé rạp chiếu phim**  
✅ **Tự động ghi nhập doanh thu vào Zoho Books**  
✅ **Tạo hóa đơn tự động**  
✅ **Hỗ trợ khách hàng thông qua Zoho Desk**  
✅ **Báo cáo doanh thu theo thời gian**  

## 🚀 Quick Start

Đọc **[QUICK_START.md](./QUICK_START.md)** để setup trong 5 phút!

## 📁 Cấu trúc Project

```
cinema-booking/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── BookingSuccess.jsx     # Auto record revenue
│   │   │   └── RevenueReport.jsx      # Admin dashboard
│   │   ├── components/
│   │   │   └── BookingComplaint.jsx   # Create desk ticket
│   │   └── services/
│   │       └── zoho.js                # API calls to backend
│   └── package.json
│
├── backend/                     # Express.js
│   ├── server.js               # Main API server
│   ├── services/
│   │   ├── zohoBooks.js        # Zoho Books integration
│   │   └── zohoDesk.js         # Zoho Desk integration
│   ├── .env.local              # API keys (BẠN cần điền)
│   └── package.json
│
├── QUICK_START.md              # 5 phút setup ⭐
├── SETUP_ZOHO.md               # Chi tiết setup
├── ZOHO_API_KEYS_GUIDE.md      # API keys guide
├── get-refresh-token.js        # Script lấy token
└── package.json
```

## 🔑 Setup API Keys

### 1. Lấy Zoho Credentials

**Zoho Desk:**
```
https://desk.zoho.com/api/v1
→ Connected Applications → Create
```

**Zoho Books:**
```
https://www.zoho.com/books/api/v3/
→ Connected Applications → Create
```

### 2. Lấy Refresh Token
```bash
node get-refresh-token.js
```

### 3. Tạo backend/.env.local
```env
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_REFRESH_TOKEN=...
ZOHO_ORG_ID=...
```

👉 Xem [ZOHO_API_KEYS_GUIDE.md](./ZOHO_API_KEYS_GUIDE.md) để chi tiết

## 📖 Hướng dẫn

- **Quick Start:** [QUICK_START.md](./QUICK_START.md) (5 phút)
- **Chi tiết:** [SETUP_ZOHO.md](./SETUP_ZOHO.md)
- **API Keys:** [ZOHO_API_KEYS_GUIDE.md](./ZOHO_API_KEYS_GUIDE.md)
- **Backend:** [backend/README.md](./backend/README.md)

## 🏃 Chạy Project

### Cách 1: Dùng npm scripts
```bash
# Terminal 1 - Backend
npm run backend:install
npm run backend:start

# Terminal 2 - Frontend
npm run dev
```

### Cách 2: Manual
```bash
# Terminal 1
cd backend
npm install
npm start

# Terminal 2
npm run dev
```

## 📱 Endpoints

### Frontend Components
- `/` - Trang chủ
- `/movies` - Danh sách phim
- `/movies/:id` - Chi tiết phim
- `/booking/:id` - Đặt vé
- `/success/:bookingId` - Đặt vé thành công (Auto ghi doanh thu)

### Backend APIs
- `POST /api/zoho/booking-revenue` - Ghi doanh thu + tạo hóa đơn
- `GET /api/zoho/revenue-report` - Báo cáo doanh thu
- `POST /api/zoho/complaint-ticket` - Tạo ticket khiếu nại
- `GET /api/zoho/ticket/:id/status` - Lấy trạng thái ticket
- `POST /api/zoho/ticket/:id/comment` - Thêm comment
- `GET /api/zoho/customer/tickets` - Danh sách tickets

## 🧪 Test

### Test Zoho Books (Doanh thu)
1. Booking vé → Frontend auto ghi vào Zoho Books
2. Xem hóa đơn: Zoho Books → Invoices

### Test Zoho Desk (Support)
1. Booking Success → Click "Báo cáo sự cố"
2. Xem ticket: Zoho Desk → Tickets

## ⚙️ Tech Stack

**Frontend:**
- React 19
- React Router v7
- Vite

**Backend:**
- Express.js
- Axios
- dotenv

**Integration:**
- Zoho Desk API
- Zoho Books API
- OAuth 2.0

## 📝 License

MIT

## 🆘 Support

Xem file `*.md` tương ứng hoặc hỏi lại tôi!

---

**Bắt đầu nào!** 🚀

```bash
npm run backend:install
npm run backend:start  # Terminal 1
npm run dev           # Terminal 2
```
