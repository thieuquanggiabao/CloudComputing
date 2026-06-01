import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById, getShowtimesByMovie } from "../services/api";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieData = await getMovieById(id);
        const showtimeData = await getShowtimesByMovie(id);
        setMovie(movieData);
        setShowtimes(showtimeData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <span className="loading-text">Đang tải chi tiết phim...</span>
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

  if (!movie) {
    return (
      <main className="container">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎭</div>
          <h2 style={{ color: "var(--text-secondary)" }}>Không tìm thấy phim</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 28,
          fontSize: 13,
          color: "var(--text-muted)",
        }}
      >
        <Link to="/" style={{ color: "var(--text-muted)" }}>Trang chủ</Link>
        <span>›</span>
        <Link to="/movies" style={{ color: "var(--text-muted)" }}>Phim</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>{movie.title}</span>
      </div>

      <div className="detail-layout">
        {/* Poster */}
        <div>
          <img className="detail-poster" src={movie.poster} alt={movie.title} />
        </div>

        {/* Info */}
        <div className="detail-content">
          {/* Title & Genre */}
          <h2>{movie.title}</h2>

          <div className="genre-tags">
            {movie.genre.split(",").map((g, i) => (
              <span key={i} className="genre-tag">
                {g.trim()}
              </span>
            ))}
          </div>

          {/* Description */}
          {movie.description && (
            <p className="movie-description">{movie.description}</p>
          )}

          {/* Meta */}
          <div className="movie-meta">
            <div className="meta-item">
              <div className="meta-item-label">⏱ Thời lượng</div>
              <div className="meta-item-value">{movie.duration} phút</div>
            </div>
            <div className="meta-item">
              <div className="meta-item-label">💰 Giá vé</div>
              <div className="meta-item-value accent">
                {Number(movie.price).toLocaleString("vi-VN")}₫
              </div>
            </div>
            <div className="meta-item">
              <div className="meta-item-label">📍 Trạng thái</div>
              <div
                className="meta-item-value"
                style={{ color: "var(--success)", fontSize: 14 }}
              >
                Đang chiếu
              </div>
            </div>
          </div>

          {/* Showtimes */}
          <div className="showtime-section">
            <h3>🕐 Chọn suất chiếu</h3>

            {showtimes.length === 0 ? (
              <div
                style={{
                  padding: "24px",
                  textAlign: "center",
                  background: "var(--bg-surface-3)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  fontSize: 14,
                }}
              >
                <div style={{ marginBottom: 8 }}>📅</div>
                Phim này chưa có suất chiếu.
              </div>
            ) : (
              <div className="showtime-list">
                {showtimes.map((showtime) => (
                  <Link
                    key={showtime.id}
                    to={`/booking/${showtime.id}`}
                    className="showtime-btn"
                  >
                    <span>📅</span>
                    <span>
                      {showtime.date} — {showtime.time}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        padding: "2px 8px",
                        background: "var(--bg-surface-2)",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {showtime.room}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetail;