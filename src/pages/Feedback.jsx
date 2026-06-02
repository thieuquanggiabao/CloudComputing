function Feedback() {
  return (
    <main className="container">
      <div className="page-title">
        <h2>💬 Góp ý trải nghiệm</h2>
        <p>
          Hãy gửi đánh giá của bạn để Mini Cinema cải thiện chất lượng dịch vụ.
        </p>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28 }}>💬</span>
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
                Gửi góp ý
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                Ý kiến của bạn giúp chúng tôi phát triển tốt hơn
              </p>
            </div>
          </div>
        </div>
        <div className="content-card-body">
          <iframe
            title="Mini Cinema Feedback"
            src="https://forms.zohopublic.com/ngocanh200505gm1/form/MiniCinemaFeedback/formperma/ONzhP0YPpPXun8pXFsw1hw8AHRpNFZxAALIe0R8lrP4"
            width="100%"
            height="750"
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

export default Feedback;
