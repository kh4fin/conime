// src/pages/BatchDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AnimeHeader from "../components/AnimeHeader";
import AnimeSynopsis from "../components/AnimeSynopsis";
import EpisodeList from "../components/EpisodeList";

const BatchDetail = () => {
  const { batchId } = useParams();
  const [animeDetail, setAnimeDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://wajik-anime-api.vercel.app/samehadaku/batch/${batchId}`)
      .then((response) => {
        // Data detail anime diharapkan ada di response.data.data
        setAnimeDetail(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime detail:", error);
        setLoading(false);
      });
  }, [batchId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading anime detail...</p>
      </div>
    );
  }

  if (!animeDetail) {
    return (
      <div className="container mx-auto p-4">
        <p>Anime detail not found.</p>
      </div>
    );
  }

  const {
    title,
    poster,
    score,
    japanese,
    synonyms,
    english,
    status,
    type,
    source,
    duration,
    season,
    studios,
    producers,
    aired,
    trailer,
    synopsis,
    genreList,
    episodeList,
    downloadUrl,
  } = animeDetail;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <AnimeHeader
        title={title}
        poster={poster}
        english={english}
        score={score}
        japanese={japanese}
        synonyms={synonyms}
        status={status}
        type={type}
        source={source}
        duration={duration}
        season={season}
        studios={studios}
        producers={producers}
        aired={aired}
        trailer={trailer}
        genreList={genreList}
      />
      <AnimeSynopsis synopsis={synopsis} />
      {episodeList && episodeList.length > 0 && (
        <EpisodeList episodeList={episodeList} />
      )}
      {downloadUrl && downloadUrl.formats && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center dark:text-gray-100">
            Download Batch
          </h2>
          <div className="space-y-6">
            {downloadUrl.formats.map((format) => (
              <div
                key={format.title}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-100 mb-3">
                  {format.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {format.qualities.map((quality) => (
                    <div
                      key={quality.title}
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                    >
                      <span className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2">
                        {quality.title}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {quality.urls.map((urlObj) => (
                          <a
                            key={urlObj.title}
                            href={urlObj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center px-3 py-2 bg-gray-700 dark:bg-gray-100 text-white dark:text-gray-800 rounded hover:bg-gray-600 dark:hover:bg-gray-200 transition-colors text-xs"
                          >
                            {urlObj.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchDetail;
