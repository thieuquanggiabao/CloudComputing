import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-card-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />

        {/* Overlay with CTA */}
        <div className="movie-card-overlay">
          <Link
            to={`/movies/${movie.id}`}
            className="movie-card-overlay-btn"
          >
            🎬 Xem chi tiết
          </Link>
        </div>

        {/* "Đang chiếu" badge */}
        <div className="movie-card-badge">Đang chiếu</div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta-row">
          <span className="movie-meta-tag">
            🎭 {movie.genre}
          </span>
          <span className="movie-meta-tag">
            ⏱ {movie.duration}p
          </span>
        </div>

        <div className="movie-meta-row" style={{ marginTop: 8 }}>
          <span className="movie-price-tag">
            {Number(movie.price).toLocaleString("vi-VN")}₫
          </span>
          <Link
            to={`/movies/${movie.id}`}
            className="secondary-btn"
            style={{ padding: "6px 14px", fontSize: "12px" }}
          >
            Đặt vé
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;