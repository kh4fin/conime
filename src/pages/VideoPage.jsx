import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const VideoPage = () => {
  const { episodeId } = useParams();
  const [episodeData, setEpisodeData] = useState(null);
  const [loadingEpisode, setLoadingEpisode] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [serverList, setServerList] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [streamUrl, setStreamUrl] = useState("");
  const [loadingStream, setLoadingStream] = useState(false);

  const [animeDetail, setAnimeDetail] = useState(null);
  const [loadingAnimeDetail, setLoadingAnimeDetail] = useState(true);

  useEffect(() => {
    setLoadingEpisode(true);
    axios
      .get(`https://wajik-anime-api.vercel.app/samehadaku/episode/${episodeId}`)
      .then((response) => {
        const data = response.data.data;
        setEpisodeData(data);
        if (data.defaultStreamingUrl) {
          setStreamUrl(data.defaultStreamingUrl);
        }
        if (
          data.server &&
          data.server.qualities &&
          data.server.qualities.length > 0
        ) {
          // Cari kualitas "480p" terlebih dahulu
          const quality480 = data.server.qualities.find(
            (q) =>
              q.title.toLowerCase() === "480p" &&
              q.serverList &&
              q.serverList.length > 0
          );
          // Jika "480p" tidak tersedia, fallback ke kualitas pertama yang memiliki server
          const chosenQuality =
            quality480 ||
            data.server.qualities.find(
              (q) => q.serverList && q.serverList.length > 0
            );
          if (chosenQuality) {
            setSelectedQuality(chosenQuality.title);
            setServerList(chosenQuality.serverList);
            // Pilih server pertama secara default
            if (chosenQuality.serverList.length > 0) {
              setSelectedServer(chosenQuality.serverList[0]);
              // Ambil link streaming dari server
              fetchServerLink(chosenQuality.serverList[0].serverId);
            }
          }
        }
        setLoadingEpisode(false);
      })
      .catch((error) => {
        console.error("Error fetching episode data:", error);
        setLoadingEpisode(false);
      });
  }, [episodeId]);

  useEffect(() => {
    if (episodeData && episodeData.animeId) {
      setLoadingAnimeDetail(true);
      axios
        .get(
          `https://wajik-anime-api.vercel.app/samehadaku/anime/${episodeData.animeId}`
        )
        .then((response) => {
          setAnimeDetail(response.data.data);
          setLoadingAnimeDetail(false);
        })
        .catch((error) => {
          console.error("Error fetching anime detail:", error);
          setLoadingAnimeDetail(false);
        });
    }
  }, [episodeData]);

  const fetchServerLink = (serverId) => {
    setLoadingStream(true);
    axios
      .get(`https://wajik-anime-api.vercel.app/samehadaku/server/${serverId}`)
      .then((response) => {
        console.log("Selected serverId:", serverId);
        const url = response.data.data?.url;
        setStreamUrl(url);
        setLoadingStream(false);
      })
      .catch((error) => {
        console.error("Error fetching server link:", error);
        setLoadingStream(false);
      });
  };

  const handleQualityChange = (qualityTitle, servers) => {
    setSelectedQuality(qualityTitle);
    setServerList(servers);
    // Reset server pilihan, ambil server pertama dari daftar baru jika ada
    if (servers && servers.length > 0) {
      setSelectedServer(servers[0]);
      fetchServerLink(servers[0].serverId);
    } else {
      setSelectedServer(null);
      setStreamUrl("");
    }
  };

  const handleServerChange = (server) => {
    setSelectedServer(server);
    fetchServerLink(server.serverId);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {loadingEpisode ? (
        <p>Loading episode details...</p>
      ) : !episodeData ? (
        <p>Episode data not available.</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">
            {episodeData.title}
          </h1>

          {episodeData.server && episodeData.server.qualities && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">
                Pilih Kualitas
              </h2>
              <div className="flex flex-wrap gap-2">
                {episodeData.server.qualities.map((quality) => (
                  <button
                    key={quality.title}
                    onClick={() =>
                      handleQualityChange(quality.title, quality.serverList)
                    }
                    className={`px-4 py-2 rounded ${
                      selectedQuality === quality.title
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {quality.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {serverList && serverList.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">
                Pilih Server
              </h2>
              <div className="flex flex-wrap gap-2">
                {serverList.map((server) => (
                  <button
                    key={server.serverId}
                    onClick={() => handleServerChange(server)}
                    className={`px-4 py-2 rounded ${
                      selectedServer &&
                      selectedServer.serverId === server.serverId
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {server.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            {loadingStream ? (
              <p>Loading video...</p>
            ) : streamUrl ? (
              <iframe
                src={streamUrl}
                title="Anime Video Player"
                width="100%"
                height="500"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            ) : (
              <p>Video tidak tersedia.</p>
            )}
          </div>

          <div className="flex justify-between my-4">
            {episodeData.hasPrevEpisode && episodeData.prevEpisode && (
              <Link
                to={`/episode/${episodeData.prevEpisode.episodeId}`}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                {episodeData.prevEpisode.title}
              </Link>
            )}
            {episodeData.hasNextEpisode && episodeData.nextEpisode && (
              <Link
                to={`/episode/${episodeData.nextEpisode.episodeId}`}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                {episodeData.nextEpisode.title}
              </Link>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 dark:text-gray-100">
              Daftar Episode
            </h2>
            {loadingAnimeDetail ? (
              <p>Loading episode list...</p>
            ) : animeDetail && animeDetail.episodeList ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {animeDetail.episodeList.map((ep) => (
                  <Link
                    key={ep.episodeId}
                    to={`/episode/${ep.episodeId}`}
                    className="block p-4 text-center bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md transition duration-300"
                  >
                    {ep.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p>Episode list tidak tersedia.</p>
            )}
          </div>

          {/* Tombol Download */}
          {episodeData.downloadUrl && episodeData.downloadUrl.formats && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-center dark:text-gray-100">
                Download Episode
              </h2>
              <div className="space-y-6 ">
                {episodeData.downloadUrl.formats.map((format) => (
                  <div
                    key={format.title}
                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg "
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
        </>
      )}
    </div>
  );
};

export default VideoPage;
