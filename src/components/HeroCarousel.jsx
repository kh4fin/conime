import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroCarousel = () => {
  const [animes, setAnimes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://kh4fin-nime-production.up.railway.app/otakudesu/home")
      .then((response) => {
        const topAnimes = response.data.data.ongoing.animeList.slice(0, 5);
        setAnimes(topAnimes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching carousel data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (animes.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev === animes.length - 1 ? 0 : prev + 1));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [animes]);

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
        Loading carousel...
      </div>
    );
  }

  if (!animes || animes.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
        No data available
      </div>
    );
  }

  const currentAnime = animes[current];
  console.log(currentAnime.poster);

  return (
    <div className="w-full  mx-auto mb-8 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0">
        <img
          src={currentAnime.poster}
          alt=""
          className="w-full h-full object-cover filter blur-lg"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="relative z-10 py-8 px-4 flex flex-row items-center">
        <button
          onClick={() =>
            setCurrent(current === 0 ? animes.length - 1 : current - 1)
          }
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none opacity-50"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={() =>
            setCurrent(current === animes.length - 1 ? 0 : current + 1)
          }
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none opacity-50"
        >
          <FiChevronRight size={24} />
        </button>
        <div className="w-1/2 pr-4 text-white">
          <h1 className="text-xl md:text-4xl font-bold mb-2">
            {currentAnime.title}
          </h1>
          <p className="mb-4 text-xs md:text-base">
            Episodes: {currentAnime.episodes} | Released:{" "}
            {currentAnime.releasedOn}
          </p>
          <a
            href={`anime/${currentAnime.animeId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-xs md:text-base py-1 px-3 rounded">
              Tonton Sekarang
            </button>
          </a>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={currentAnime.poster}
            alt={currentAnime.title}
            className="w-full h-40 md:h-80 object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
