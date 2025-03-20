// src/pages/Schedule.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://wajik-anime-api.vercel.app/samehadaku/schedule")
      .then((response) => {
        // Data jadwal rilis berada pada response.data.data.days
        setSchedule(response.data.data.days);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-100">
        Jadwal Rilis Anime
      </h1>
      {schedule.map((dayData) => (
        <div
          key={dayData.day}
          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
            {dayData.day}
          </h2>
          {dayData.animeList && dayData.animeList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dayData.animeList.map((anime) => (
                <Link
                  key={anime.animeId}
                  to={`/anime/${anime.animeId}`}
                  className="block p-4 bg-gray-600 hover:bg-gray-600 text-white rounded transition-colors"
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
            <p className="text-gray-400">Tidak ada jadwal untuk hari ini.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
