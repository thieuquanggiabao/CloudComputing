import { useEffect, useState } from "react";
import {
  getMovies,
  getRooms,
  getAllShowtimes,
  createShowtime,
  updateShowtime,
  deleteShowtime,
} from "../services/api";

const EMPTY_FORM = { movieId: "", roomId: "", date: "", time: "" };

function AdminShowtimes() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadData = async () => {
    try {
      const [movieData, roomData, showtimeData] = await Promise.all([
        getMovies(),
        getRooms(),
        getAllShowtimes(),
      ]);
      setMovies(movieData);
      setRooms(roomData);
      setShowtimes(showtimeData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <main className="container">
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔒</div>
          <h2
            style={{
              color: "var(--error)",
              marginBottom: 8,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Không có quyền truy cập
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Chỉ admin mới được quản lý suất chiếu.
          </p>
        </div>
      </main>
    );
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const showtimeData = {
        movieId: Number(form.movieId),
        roomId: Number(form.roomId),
        date: form.date,
        time: form.time,
      };
      if (editingId) {
        await updateShowtime(editingId, showtimeData);
        alert("Cập nhật suất chiếu thành công");
      } else {
        await createShowtime(showtimeData);
        alert("Thêm suất chiếu thành công");
      }
      resetForm();
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (showtime) => {
    setEditingId(showtime.id);
    setForm({
      movieId: showtime.movieId,
      roomId: showtime.roomId,
      date: showtime.date,
      time: showtime.time,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa suất chiếu này không?")) return;
    try {
      await deleteShowtime(id);
      alert("Xóa suất chiếu thành công");
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="container">
      <div className="page-title">
        <h2>📅 Quản lý suất chiếu</h2>
        <p>Thêm, sửa, xóa và xem các suất chiếu của phim.</p>
      </div>

      <div className="admin-layout">
        {/* Form */}
        <section className="admin-form">
          <h3>
            {editingId ? "✏️ Cập nhật suất chiếu" : "➕ Thêm suất chiếu mới"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Chọn phim</label>
              <select
                name="movieId"
                value={form.movieId}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn phim --</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Phòng chiếu</label>
              <select
                name="roomId"
                value={form.roomId}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn phòng --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Ngày chiếu</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Giờ chiếu</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primary-btn full">
              {editingId ? "💾 Lưu thay đổi" : "➕ Thêm suất chiếu"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn full"
                onClick={resetForm}
                style={{ marginTop: 8 }}
              >
                ✕ Hủy sửa
              </button>
            )}
          </form>
        </section>

        {/* List */}
        <section className="admin-list">
          <h3>
            📋 Danh sách suất chiếu
            <span
              style={{
                marginLeft: 10,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-muted)",
              }}
            >
              ({showtimes.length} suất)
            </span>
          </h3>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Phim</th>
                  <th>Phòng</th>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {showtimes.map((showtime) => (
                  <tr key={showtime.id}>
                    <td style={{ fontWeight: 600, color: "var(--text-primary)", maxWidth: 160 }}>
                      {showtime.movieTitle}
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          background: "var(--bg-surface-3)",
                          borderRadius: "var(--radius-full)",
                          fontSize: 12,
                          border: "1px solid var(--border)",
                        }}
                      >
                        {showtime.roomName}
                      </span>
                    </td>
                    <td>{showtime.date}</td>
                    <td>
                      <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                        {showtime.time}
                      </span>
                    </td>
                    <td>
                      <button
                        className="secondary-btn"
                        style={{ padding: "6px 12px", fontSize: 12, marginRight: 6 }}
                        onClick={() => handleEdit(showtime)}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className="danger-btn"
                        style={{ padding: "6px 12px", fontSize: 12 }}
                        onClick={() => handleDelete(showtime.id)}
                      >
                        🗑 Xóa
                      </button>
                    </td>
                  </tr>
                ))}

                {showtimes.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "var(--text-muted)",
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
                      Chưa có suất chiếu nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminShowtimes;