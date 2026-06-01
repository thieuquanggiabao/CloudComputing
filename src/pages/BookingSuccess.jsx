import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById } from "../services/api";

function BookingSuccess() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <main className="container">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <span className="loading-text">Đang tải thông tin vé...</span>
        </div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main>
        <div className="success-wrapper">
          <div className="success-card">
            <div className="success-card-header">
              <div
                className="success-icon"
                style={{
                  background: "var(--error-bg)",
                  borderColor: "var(--error)",
                }}
              >
                ❌
              </div>
              <h2 style={{ color: "var(--error)" }}>
                {error ? "Có lỗi xảy ra" : "Không tìm thấy đặt vé"}
              </h2>
              {error && (
                <p style={{ color: "var(--text-secondary)" }}>{error}</p>
              )}
            </div>
            <div className="success-card-body">
              <Link to="/movies" className="primary-btn full">
                ← Quay lại danh sách phim
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const ticketItems = [
    { label: "Mã đặt vé", value: `#${booking.bookingId}` },
    { label: "Khách hàng", value: booking.customerName },
    { label: "Số điện thoại", value: booking.customerPhone },
    { label: "Phim", value: booking.movieTitle },
    {
      label: "Suất chiếu",
      value: `${booking.date} — ${booking.time}`,
    },
    { label: "Phòng chiếu", value: booking.room },
    { label: "Ghế đã chọn", value: booking.seats.join(", ") },
    { label: "Thời gian đặt", value: booking.bookingTime },
  ];

  return (
    <main>
      <div className="success-wrapper">
        <div className="success-card">
          {/* Header */}
          <div className="success-card-header">
            <div className="success-icon">✅</div>
            <h2>Đặt vé thành công!</h2>
            <p>Cảm ơn bạn đã đặt vé tại Mini Cinema. Chúc bạn xem phim vui vẻ!</p>
          </div>

          {/* Body */}
          <div className="success-card-body">
            {/* Ticket Info */}
            <div className="ticket-info">
              <div className="ticket-info-header">
                🎟 Chi tiết vé
              </div>

              {ticketItems.map((item) => (
                <div className="ticket-info-item" key={item.label}>
                  <span className="label">{item.label}</span>
                  <span className="value">{item.value}</span>
                </div>
              ))}

              {/* Total */}
              <div className="ticket-info-item">
                <span className="label">Tổng tiền</span>
                <span className="value accent">
                  {Number(booking.totalPrice).toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="success-actions">
              <Link to="/movies" className="primary-btn">
                🎬 Đặt vé tiếp
              </Link>
              <Link to="/feedback" className="secondary-btn">
                💬 Gửi đánh giá
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingSuccess;