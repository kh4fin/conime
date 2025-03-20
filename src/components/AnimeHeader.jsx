import React from "react";

const AnimeHeader = ({
  title,
  poster,
  english,
  score,
  japanese,
  synonyms,
  status,
  type,
  source,
  duration,
  season,
  studios,
  producers,
  aired,
  trailer,
  genreList,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md">
      <img
        src={poster}
        alt={title}
        className="w-full md:w-1/3 rounded-lg shadow object-cover"
      />
      <div className="mt-4 md:mt-0 md:w-2/3">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {english && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            <em>{english}</em>
          </p>
        )}
        <div className="mb-2">
          <strong>Score:</strong> {score?.value ? score.value : "N/A"}{" "}
          {score?.users && <span>({score.users} users)</span>}
        </div>
        <p className="mb-2">
          <strong>Japanese:</strong> {japanese || "N/A"}
        </p>
        {synonyms && (
          <p className="mb-2">
            <strong>Synonyms:</strong> {synonyms}
          </p>
        )}
        <p className="mb-2">
          <strong>Status:</strong> {status || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Type:</strong> {type || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Source:</strong> {source || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Duration:</strong> {duration || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Season:</strong> {season || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Studios:</strong> {studios || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Producers:</strong> {producers || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Aired:</strong> {aired || "N/A"}
        </p>
        {trailer && (
          <p className="mb-2">
            <strong>Trailer:</strong>{" "}
            <a
              href={trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Watch Trailer
            </a>
          </p>
        )}
        {genreList && genreList.length > 0 && (
          <div className="mb-2">
            <strong>Genres:</strong>{" "}
            {genreList.map((genre) => (
              <span
                key={genre.genreId}
                className="inline-block bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 px-2 py-1 mr-2 rounded"
              >
                {genre.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeHeader;
