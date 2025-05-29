// src/pages/AnimeGenre.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";

const AnimeGenre = () => {
  const [recentAnime, setRecentAnime] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentPage, setRecentPage] = useState(1);
  const [recentTotalPages, setRecentTotalPages] = useState(1);

  const { genreId } = useParams();

  useEffect(() => {
    setRecentLoading(true);

    axios
      .get(
        `https://kh4fin-nime-production.up.railway.app/otakudesu/genres/${genreId}?page=${recentPage}`
      )
      .then((response) => {
        const recentData = response.data.data;
        if (recentData && recentData.animeList) {
          setRecentAnime(recentData.animeList);
          if (response.data.pagination && response.data.pagination.totalPages) {
            setRecentTotalPages(response.data.pagination.totalPages);
          } else {
            setRecentTotalPages(
              Math.ceil(recentData.animeList.length / 10) || 1
            );
          }
        } else {
          setRecentAnime([]);
          setRecentTotalPages(1);
        }
        setRecentLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recent anime:", error);
        setRecentLoading(false);
      });
  }, [recentPage]);

  return (
    <main className="container mx-auto p-4 space-y-12">
      <section>
        <h2 className="text-3xl font-semibold mt-4 mb-20 text-center dark:text-white">
          Genre : {genreId}
        </h2>
        {recentLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentAnime.map((anime) => (
                <AnimeCard key={anime.animeId} anime={anime} />
              ))}
            </div>
            {recentTotalPages > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={recentPage}
                  totalPages={recentTotalPages}
                  onPageChange={setRecentPage}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default AnimeGenre;
