// src/pages/AnimeDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AnimeHeader from "../components/AnimeHeader";
import AnimeSynopsis from "../components/AnimeSynopsis";
import EpisodeList from "../components/EpisodeList";

const AnimeDetail = () => {
  const { animeId } = useParams();
  const [animeDetail, setAnimeDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://wajik-anime-api.vercel.app/samehadaku/anime/${animeId}`)
      .then((response) => {
        // Data detail anime diharapkan ada di response.data.data
        setAnimeDetail(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime detail:", error);
        setLoading(false);
      });
  }, [animeId]);

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
    </div>
  );
};

export default AnimeDetail;
