import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span>🎬</span>
          <span>Trải nghiệm điện ảnh đỉnh cao</span>
        </div>

        {/* Heading */}
        <h1>
          Đặt vé xem phim<br />
          <span>dễ dàng &amp; nhanh chóng</span>
        </h1>

        <p>
          Mini Cinema — nền tảng đặt vé xem phim hiện đại, được xây dựng trên
          Google Cloud Run. Chọn phim, chọn ghế, xác nhận — chỉ trong vài giây.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <Link to="/movies" className="primary-btn">
            🎟 Xem phim đang chiếu
          </Link>
          <Link to="/subscribe" className="ghost-btn">
            🔔 Nhận tin phim mới
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">100<span>+</span></div>
            <div className="hero-stat-label">Bộ phim</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">50<span>k+</span></div>
            <div className="hero-stat-label">Vé đã bán</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">4.9<span>★</span></div>
            <div className="hero-stat-label">Đánh giá</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;