import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DarkModeProvider } from "./context/DarkModeContext";
import Home from "./pages/Home";
import AnimeDetail from "./pages/AnimeDetail";
import VideoPage from "./pages/VideoPage";
import GenreMenu from "./pages/GenreMenu";
import AnimeGenre from "./pages/AnimeGenre";
import Schedule from "./pages/Schedule";
import DaftarAnime from "./pages/DaftarAnime";
import Completed from "./pages/Completed";
import Movies from "./pages/Movies";
import Batch from "./pages/Batch";
import BatchDetail from "./pages/BatchDetail";
import Search from "./pages/Search";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:animeId" element={<AnimeDetail />} />
              <Route path="/batch/:batchId" element={<BatchDetail />} />
              <Route path="/episode/:episodeId" element={<VideoPage />} />
              <Route path="/genres" element={<GenreMenu />} />
              <Route path="/genres/:genreId" element={<AnimeGenre />} />
              <Route path="/jadwal-rilis" element={<Schedule />} />
              <Route path="/daftar-anime" element={<DaftarAnime />} />
              <Route path="/anime-completed" element={<Completed />} />
              <Route path="/anime-movie" element={<Movies />} />
              <Route path="/anime-batch" element={<Batch />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
