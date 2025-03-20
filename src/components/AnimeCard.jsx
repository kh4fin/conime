import React from "react";
import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  const destination = anime.animeId
    ? `/anime/${anime.animeId}`
    : anime.batchId
    ? `/batch/${anime.batchId}`
    : "#";

  return (
    <Link to={destination}>
      <div className="relative shadow rounded overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-64 object-container"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black opacity-70 p-2">
          <h3 className="font-semibold text-lg text-white">
            {anime.title} {anime.episodes ? `eps ${anime.episodes}` : ""}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
