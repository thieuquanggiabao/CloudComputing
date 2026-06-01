import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Login from "./pages/Login";
import AdminMovies from "./pages/AdminMovies";
import AdminShowtimes from "./pages/AdminShowtimes";
import Feedback from "./pages/Feedback";
import Subscribe from "./pages/Subscribe";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/success/:bookingId" element={<BookingSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            <Route path="/admin/showtimes" element={<AdminShowtimes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;