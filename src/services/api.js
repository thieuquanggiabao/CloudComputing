export const API_URL = "/api";

export const getMovies = async () => {
  const res = await fetch(`${API_URL}/movies`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi lấy danh sách phim");
  }

  return data.data;
};

export const getMovieById = async (id) => {
  const res = await fetch(`${API_URL}/movies/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi lấy chi tiết phim");
  }

  return data.data;
};

export const getShowtimesByMovie = async (movieId) => {
  const res = await fetch(`${API_URL}/movies/${movieId}/showtimes`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi lấy suất chiếu");
  }

  return data.data;
};

export const getSeatsByShowtime = async (showtimeId) => {
  const res = await fetch(`${API_URL}/showtimes/${showtimeId}/seats`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi lấy danh sách ghế");
  }

  return data.data;
};

export const createBooking = async (bookingData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(bookingData)
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
    }
    throw new Error(data.message || "Lỗi đặt vé");
  }

  return data.data;
};

export const getBookingById = async (bookingId) => {
  const res = await fetch(`${API_URL}/bookings/${bookingId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi lấy thông tin vé");
  }

  return data.data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

export const createMovie = async (movieData) => {
  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(movieData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi thêm phim");
  }

  return data.data;
};

export const updateMovie = async (id, movieData) => {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(movieData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi cập nhật phim");
  }

  return data;
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi xóa phim");
  }

  return data;
};

export const getRooms = async () => {
  const res = await fetch(`${API_URL}/showtimes/rooms`, {
    headers: getAuthHeaders()
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi lấy danh sách phòng");
  }

  return data.data;
};

export const getAllShowtimes = async () => {
  const res = await fetch(`${API_URL}/showtimes`, {
    headers: getAuthHeaders()
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi lấy danh sách suất chiếu");
  }

  return data.data;
};

export const createShowtime = async (showtimeData) => {
  const res = await fetch(`${API_URL}/showtimes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(showtimeData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi thêm suất chiếu");
  }

  return data.data;
};

export const updateShowtime = async (id, showtimeData) => {
  const res = await fetch(`${API_URL}/showtimes/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(showtimeData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi cập nhật suất chiếu");
  }

  return data;
};

export const deleteShowtime = async (id) => {
  const res = await fetch(`${API_URL}/showtimes/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi xóa suất chiếu");
  }

  return data;
};