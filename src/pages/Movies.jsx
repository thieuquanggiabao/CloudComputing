import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../services/api";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filtered = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.genre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <main className="container">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <span className="loading-text">Đang tải danh sách phim...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: "var(--error)", marginBottom: 8 }}>
            Có lỗi xảy ra
          </h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      {/* Header */}
      <div className="page-title">
        <h2>🎬 Phim đang chiếu</h2>
        <p>Chọn bộ phim bạn muốn xem và tiến hành đặt vé ngay hôm nay.</p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: 28, position: "relative", maxWidth: 440 }}>
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "var(--text-muted)",
          }}
        >
          🔍
        </span>
        <input
          type="text"
          placeholder="Tìm phim theo tên hoặc thể loại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            paddingLeft: 48,
            paddingRight: 16,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        />
      </div>

      {/* Count */}
      <p
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 20,
        }}
      >
        Hiển thị{" "}
        <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong>{" "}
        phim
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎭</div>
          <p>Không tìm thấy phim phù hợp.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Movies;