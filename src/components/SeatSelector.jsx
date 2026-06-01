function SeatSelector({ seats, selectedSeats, onToggleSeat }) {
  return (
    <div className="seat-area">
      <div className="screen-wrapper">
        <div className="screen">MÀN HÌNH</div>
        <div className="screen-perspective" />
      </div>

      <div className="seat-grid">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          const isBooked = seat.status === "booked";

          return (
            <button
              key={seat.id}
              type="button"
              disabled={isBooked}
              onClick={() => onToggleSeat(seat.id)}
              className={`seat-btn ${isBooked ? "booked" : ""} ${
                isSelected ? "selected" : ""
              }`}
              title={
                isBooked
                  ? `Ghế ${seat.name} - Đã đặt`
                  : isSelected
                  ? `Ghế ${seat.name} - Đang chọn`
                  : `Ghế ${seat.name} - Trống`
              }
            >
              {seat.name}
            </button>
          );
        })}
      </div>

      <div className="seat-note">
        <div className="note-item">
          <div className="note available" />
          <span>Ghế trống</span>
        </div>
        <div className="note-item">
          <div className="note selected" />
          <span>Đang chọn</span>
        </div>
        <div className="note-item">
          <div className="note booked" />
          <span>Đã đặt</span>
        </div>
      </div>
    </div>
  );
}

export default SeatSelector;