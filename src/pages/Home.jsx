// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeroCarousel from "../components/HeroCarousel";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";

const Home = () => {
  // State untuk Latest Updates (Anime Terbaru)
  const [recentAnime, setRecentAnime] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentPage, setRecentPage] = useState(1);
  const [recentTotalPages, setRecentTotalPages] = useState(1);

  // State untuk Ongoing Anime
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [ongoingLoading, setOngoingLoading] = useState(true);
  const [ongoingPage, setOngoingPage] = useState(1);
  const [ongoingTotalPages, setOngoingTotalPages] = useState(1);

  // Fetch Latest Updates – menggunakan endpoint /samehadaku/recent
  useEffect(() => {
    setRecentLoading(true);
    axios
      .get(
        `https://wajik-anime-api.vercel.app/samehadaku/recent?page=${recentPage}`
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

  // Fetch Ongoing Anime – menggunakan endpoint /samehadaku/ongoing
  useEffect(() => {
    setOngoingLoading(true);
    axios
      .get(
        `https://wajik-anime-api.vercel.app/samehadaku/ongoing?page=${ongoingPage}&order=title`
      )
      .then((response) => {
        const ongoingData = response.data.data;
        if (ongoingData && ongoingData.animeList) {
          setOngoingAnime(ongoingData.animeList);
          if (response.data.pagination && response.data.pagination.totalPages) {
            setOngoingTotalPages(response.data.pagination.totalPages);
          } else {
            setOngoingTotalPages(1);
          }
        } else {
          setOngoingAnime([]);
          setOngoingTotalPages(1);
        }
        setOngoingLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ongoing anime:", error);
        setOngoingLoading(false);
      });
  }, [ongoingPage]);

  return (
    <main className="container mx-auto p-4 space-y-12">
      {/* Hero Carousel Section */}
      <section>
        <HeroCarousel />
      </section>

      {/* Latest Updates Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center dark:text-gray-100">
          Latest Updates
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

      {/* Ongoing Anime Section */}
      <section className="mt-40">
        <h2 className="text-2xl font-semibold mb-8 text-center dark:text-gray-100">
          Ongoing Anime
        </h2>
        {ongoingLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {ongoingAnime.map((anime) => (
                <AnimeCard key={anime.animeId} anime={anime} />
              ))}
            </div>
            {ongoingTotalPages > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={ongoingPage}
                  totalPages={ongoingTotalPages}
                  onPageChange={setOngoingPage}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
