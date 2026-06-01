function Subscribe() {
  return (
    <main className="container">
      <div className="page-title">
        <h2>🔔 Nhận thông báo phim mới</h2>
        <p>
          Đăng ký email để nhận lịch chiếu mới, phim sắp ra mắt và khuyến mãi
          từ Mini Cinema.
        </p>
      </div>

      {/* Benefits */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {[
          {
            icon: "🎬",
            title: "Phim mới nhất",
            desc: "Cập nhật ngay khi có phim mới ra mắt",
          },
          {
            icon: "🎫",
            title: "Ưu đãi độc quyền",
            desc: "Nhận khuyến mãi và voucher giảm giá vé",
          },
          {
            icon: "📅",
            title: "Lịch chiếu",
            desc: "Thông báo lịch chiếu theo tuần",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              padding: "20px",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
            <h4
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 6,
              }}
            >
              {item.title}
            </h4>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>✉️</span>
            <div>
              <h3
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 4,
                }}
              >
                Đăng ký nhận tin
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                Miễn phí — Hủy bất cứ lúc nào
              </p>
            </div>
          </div>
        </div>
        <div className="content-card-body">
          <iframe
            title="Mini Cinema Campaigns Signup"
            src="https://zcsub-cmpzourl.maillist-manage.com/ua/Optin?od=11287ecd89a17b&zx=137348081&tD=11708b0ee3f7f6b89&sD=11708b0ee3f7f6c6d"
            width="100%"
            height="700"
            style={{
              border: "none",
              display: "block",
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default Subscribe;