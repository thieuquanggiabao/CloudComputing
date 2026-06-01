export const movies = [
  {
    id: 1,
    title: "Doraemon Movie",
    genre: "Hoạt hình",
    duration: 110,
    price: 60000,
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500",
    description:
      "Một bộ phim hoạt hình phiêu lưu vui nhộn, phù hợp với mọi lứa tuổi."
  },
  {
    id: 2,
    title: "Avengers",
    genre: "Hành động",
    duration: 150,
    price: 80000,
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
    description:
      "Biệt đội siêu anh hùng cùng nhau bảo vệ thế giới khỏi hiểm họa."
  },
  {
    id: 3,
    title: "Conan Movie",
    genre: "Trinh thám",
    duration: 120,
    price: 70000,
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500",
    description:
      "Một vụ án bí ẩn được thám tử lừng danh Conan điều tra và phá giải."
  }
];

export const showtimes = [
  {
    id: 1,
    movieId: 1,
    date: "2026-05-25",
    time: "09:00",
    room: "Phòng 1"
  },
  {
    id: 2,
    movieId: 1,
    date: "2026-05-25",
    time: "14:00",
    room: "Phòng 1"
  },
  {
    id: 3,
    movieId: 2,
    date: "2026-05-25",
    time: "19:00",
    room: "Phòng 2"
  },
  {
    id: 4,
    movieId: 3,
    date: "2026-05-26",
    time: "18:30",
    room: "Phòng 1"
  }
];

export const seats = [
  { id: 1, name: "A1", status: "available" },
  { id: 2, name: "A2", status: "available" },
  { id: 3, name: "A3", status: "booked" },
  { id: 4, name: "A4", status: "available" },

  { id: 5, name: "B1", status: "available" },
  { id: 6, name: "B2", status: "booked" },
  { id: 7, name: "B3", status: "available" },
  { id: 8, name: "B4", status: "available" },

  { id: 9, name: "C1", status: "available" },
  { id: 10, name: "C2", status: "available" },
  { id: 11, name: "C3", status: "available" },
  { id: 12, name: "C4", status: "booked" }
];