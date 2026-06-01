import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelector from "../components/SeatSelector";
import { createBooking, getSeatsByShowtime } from "../services/api";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "" });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const data = await getSeatsByShowtime(id);
        setShowtime(data.showtime);
        setSeats(data.seats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [id]);

  const handleToggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalPrice = showtime
    ? selectedSeats.length * Number(showtime.price)
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập trước khi đặt vé");
      navigate("/login");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ghế");
      return;
    }

    try {
      setSubmitting(true);
      const bookingData = {
        customerName: customer.name,
        customerPhone: customer.phone,
        showtimeId: Number(id),
        seatIds: selectedSeats,
      };
      const result = await createBooking(bookingData);
      navigate(`/success/${result.bookingId}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="container">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <span className="loading-text">Đang tải sơ đồ ghế...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: "var(--error)", marginBottom: 8 }}>Có lỗi xảy ra</h2>
          <p style={{ color: "var(--text-secondary)" }}>{error}</p>
        </div>
      </main>
    );
  }

  if (!showtime) {
    return (
      <main className="container">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
          <h2 style={{ color: "var(--text-secondary)" }}>Không tìm thấy suất chiếu</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      {/* Page Header */}
      <div className="page-title">
        <h2>🎟 Đặt vé: {showtime.movieTitle}</h2>
        <p>Chọn ghế và điền thông tin để hoàn tất đặt vé.</p>
      </div>

      <div className="booking-layout">
        {/* Seat Selector */}
        <section className="booking-main">
          <div className="booking-info-row">
            <div className="booking-info-chip">
              📅 <span>{showtime.date}</span>
            </div>
            <div className="booking-info-chip">
              ⏰ <span>{showtime.time}</span>
            </div>
            <div className="booking-info-chip">
              🏛 <span>{showtime.room}</span>
            </div>
          </div>

          <SeatSelector
            seats={seats}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
          />
        </section>

        {/* Summary & Form */}
        <aside className="booking-summary">
          <h3>📋 Thông tin đặt vé</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                placeholder="Nhập họ và tên..."
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                required
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                placeholder="Nhập số điện thoại..."
              />
            </div>

            <p
              className="booking-seat-count"
              style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}
            >
              Đã chọn{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {selectedSeats.length}
              </strong>{" "}
              ghế
            </p>

            <div className="booking-total-row">
              <div>
                <div className="booking-total-label">Tổng tiền</div>
                <div
                  style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}
                >
                  {selectedSeats.length} ghế ×{" "}
                  {Number(showtime.price).toLocaleString("vi-VN")}₫
                </div>
              </div>
              <div className="booking-total-value">
                {totalPrice.toLocaleString("vi-VN")}₫
              </div>
            </div>

            <button
              type="submit"
              className="primary-btn full"
              disabled={submitting}
              style={{ marginTop: 4 }}
            >
              {submitting ? "⏳ Đang xử lý..." : "✅ Xác nhận đặt vé"}
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}

export default Booking;