// src/components/AnimeSynopsis.jsx
import React from "react";
import { Link } from "react-router-dom";

const AnimeSynopsis = ({ synopsis }) => {
  if (!synopsis) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Synopsis
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          No synopsis available.
        </p>
      </div>
    );
  }

  const paragraphs = synopsis.paragraphs.filter((para) => para.trim() !== "");

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Synopsis
        </h2>
        {paragraphs.length > 0 ? (
          paragraphs.map((para, index) => (
            <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">
              {para}
            </p>
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            No synopsis available.
          </p>
        )}
      </div>

      {synopsis.connections && synopsis.connections.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Related Anime
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {synopsis.connections.map((connection) => (
              <li key={connection.animeId}>
                <Link
                  to={`/anime/${connection.animeId}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {connection.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnimeSynopsis;
