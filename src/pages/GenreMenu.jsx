// src/components/GenreMenu.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GenreMenu = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://kh4fin-nime-production.up.railway.app/otakudesu/genres")
      .then((response) => {
        // Data genre berada pada response.data.data.genreList
        setGenres(response.data.data.genreList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading genres...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Genre</h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Link
            key={genre.genreId}
            to={`/genres/${genre.genreId}`}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            {genre.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreMenu;
