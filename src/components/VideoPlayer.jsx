import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoPlayer = ({ episodeId, streamUrl: externalStreamUrl }) => {
  const [streamUrl, setStreamUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (externalStreamUrl) {
      setStreamUrl(externalStreamUrl);
      setLoading(false);
      return;
    }

    if (!episodeId) return;
    setLoading(true);
    axios
      .get(
        `https://kh4fin-nime-production.up.railway.app/otakudesu/episode/${episodeId}`
      )
      .then((response) => {
        const url =
          response.data.data?.defaultStreamingUrl ||
          response.data.data?.videoUrl;
        setStreamUrl(url);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video URL:", error);
        setLoading(false);
      });
  }, [episodeId, externalStreamUrl]);

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (!streamUrl) {
    return <p>Video not available.</p>;
  }

  return (
    <div className="video-player mt-4">
      <iframe
        src={streamUrl}
        title="Anime Video Player"
        width="100%"
        height="500"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
