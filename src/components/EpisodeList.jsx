// src/components/EpisodeList.jsx
import React from "react";
import { Link } from "react-router-dom";

const EpisodeList = ({ episodeList }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2 dark:text-gray-100">
        Episodes
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {episodeList.map((ep) => (
          <Link
            key={ep.episodeId}
            to={`/episode/${ep.episodeId}`}
            className="block p-4 text-center bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md transition duration-300"
          >
            Episode {ep.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
