import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const DaftarAnime = () => {
  const [animeListData, setAnimeListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://kh4fin-nime-production.up.railway.app/otakudesu/anime")
      .then((response) => {
        setAnimeListData(response.data.data.list);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime list:", error);
        setLoading(false);
      });
  }, []);

  const scrollToLetter = (letter) => {
    const element = document.getElementById(letter);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading anime list...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-100">
        Daftar Anime
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {animeListData.map((group) => (
          <button
            key={group.startWith}
            onClick={() => scrollToLetter(group.startWith)}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            {group.startWith}
          </button>
        ))}
      </div>

      {animeListData.map((group) => (
        <div key={group.startWith} id={group.startWith} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">
            Huruf: {group.startWith}
          </h2>
          {group.animeList && group.animeList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.animeList.map((anime) => (
                <Link
                  key={anime.animeId}
                  to={`/anime/${anime.animeId}`}
                  className="block p-4 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  <div className="font-bold">{anime.title}</div>
                  {anime.poster && (
                    <img
                      src={anime.poster}
                      alt={anime.title}
                      className="mt-2 rounded-lg shadow"
                    />
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              Tidak ada anime untuk huruf {group.startWith}
            </p>
          )}
        </div>
      ))}

      {/* Tombol Back to Top */}
      <div className="fixed bottom-4 right-4 flex justify-center mt-8">
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-[50%] hover:bg-gray-300 transition"
        >
          <FaArrowUp className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default DaftarAnime;
