import { useEffect, useState } from "react";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../services/api";

const EMPTY_FORM = {
  title: "",
  genre: "",
  duration: "",
  description: "",
  poster: "",
  price: "",
};

function AdminMovies() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <main className="container">
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
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
            Chỉ tài khoản admin mới được vào trang quản trị phim.
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
      const movieData = {
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
      };
      if (editingId) {
        await updateMovie(editingId, movieData);
        alert("Cập nhật phim thành công");
      } else {
        await createMovie(movieData);
        alert("Thêm phim thành công");
      }
      resetForm();
      loadMovies();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setForm({
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      description: movie.description || "",
      poster: movie.poster || "",
      price: movie.price,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này không?")) return;
    try {
      await deleteMovie(id);
      alert("Xóa phim thành công");
      loadMovies();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="container">
      <div className="page-title">
        <h2>🎞 Quản lý phim</h2>
        <p>Thêm, sửa, xóa và xem danh sách phim đang chiếu.</p>
      </div>

      <div className="admin-layout">
        {/* Form */}
        <section className="admin-form">
          <h3>
            {editingId ? "✏️ Cập nhật phim" : "➕ Thêm phim mới"}
          </h3>

          <form onSubmit={handleSubmit}>
            {[
              { name: "title", label: "Tên phim", type: "text", required: true, placeholder: "Nhập tên phim..." },
              { name: "genre", label: "Thể loại", type: "text", required: true, placeholder: "VD: Hành động, Tình cảm..." },
              { name: "duration", label: "Thời lượng (phút)", type: "number", required: true, placeholder: "VD: 120" },
              { name: "price", label: "Giá vé (VNĐ)", type: "number", required: true, placeholder: "VD: 75000" },
              { name: "poster", label: "URL ảnh poster", type: "text", required: false, placeholder: "https://..." },
            ].map((field) => (
              <div key={field.name}>
                <label>{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div>
              <label>Mô tả phim</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Nhập mô tả ngắn về nội dung phim..."
              />
            </div>

            <button type="submit" className="primary-btn full">
              {editingId ? "💾 Lưu thay đổi" : "➕ Thêm phim"}
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
            📋 Danh sách phim
            <span
              style={{
                marginLeft: 10,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-muted)",
              }}
            >
              ({movies.length} phim)
            </span>
          </h3>

          <div className="admin-movie-list">
            {movies.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "var(--text-muted)",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎭</div>
                <p>Chưa có phim nào. Hãy thêm phim mới!</p>
              </div>
            ) : (
              movies.map((movie) => (
                <div className="admin-movie-item" key={movie.id}>
                  <img
                    src={movie.poster || "https://via.placeholder.com/80x108?text=No+Image"}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80x108?text=No+Image";
                    }}
                  />
                  <div>
                    <h4>{movie.title}</h4>
                    <p>
                      🎭 <span>{movie.genre}</span>
                    </p>
                    <p>
                      ⏱ <span>{movie.duration} phút</span>
                    </p>
                    <p>
                      💰{" "}
                      <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                        {Number(movie.price).toLocaleString("vi-VN")}₫
                      </span>
                    </p>
                  </div>
                  <div className="admin-item-actions">
                    <button
                      className="secondary-btn"
                      style={{ padding: "8px 16px", fontSize: 12 }}
                      onClick={() => handleEdit(movie)}
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      className="danger-btn"
                      style={{ padding: "8px 16px", fontSize: 12 }}
                      onClick={() => handleDelete(movie.id)}
                    >
                      🗑 Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminMovies;