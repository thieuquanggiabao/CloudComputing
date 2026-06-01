import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Đăng nhập thất bại");
        return;
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Lỗi đăng nhập Google: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Top */}
        <div className="login-card-top">
          <div className="login-logo">🎬</div>
          <h2>Chào mừng trở lại!</h2>
          <p>
            Đăng nhập bằng tài khoản Google để đặt vé xem phim và trải nghiệm
            tất cả tính năng của Mini Cinema.
          </p>
        </div>

        {/* Body */}
        <div className="login-card-body">
          {/* Benefits */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              { icon: "🎟", text: "Đặt vé nhanh chóng, dễ dàng" },
              { icon: "📱", text: "Quản lý vé của bạn mọi lúc" },
              { icon: "🔔", text: "Nhận thông báo phim mới" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  background: "var(--bg-surface-3)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">Đăng nhập với</span>
            <div className="login-divider-line" />
          </div>

          {/* Google Login */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Đăng nhập Google thất bại")}
              theme="filled_black"
              size="large"
              shape="rectangular"
              text="signin_with"
              locale="vi"
            />
          </div>

          <p
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 12,
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            Bằng cách đăng nhập, bạn đồng ý với Điều khoản dịch vụ và
            Chính sách bảo mật của Mini Cinema.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;