// // src/pages/Search.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, Link } from "react-router-dom";

// // Hook untuk mengambil query params
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const Search = () => {
//   const query = useQuery();
//   const searchTerm = query.get("q");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (searchTerm) {
//       setLoading(true);
//       axios
//         .get(
//           `https://wajik-anime-api.vercel.app/samehadaku/search?q=${encodeURIComponent(
//             searchTerm
//           )}`
//         )
//         .then((response) => {
//           // Asumsi hasilnya ada di response.data.data, sesuaikan jika perlu
//           console.log(response.data);
//           setResults(response.data.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error searching:", error);
//           setLoading(false);
//         });
//     } else {
//       setResults([]);
//       setLoading(false);
//     }
//   }, [searchTerm]);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">
//         Search Results for "{searchTerm}"
//       </h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : results && results.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {results.map((anime) => (
//             <Link
//               key={anime.animeId}
//               to={`/anime/${anime.animeId}`}
//               className="block p-4 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
//             >
//               <div className="font-bold">
//                 {anime.title} {anime.episodes ? `eps ${anime.episodes}` : ""}
//               </div>
//               {anime.poster && (
//                 <img
//                   src={anime.poster}
//                   alt={anime.title}
//                   className="mt-2 rounded-lg shadow"
//                 />
//               )}
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// };

// export default Search;

// src/pages/Search.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const [recentAnime, setRecentAnime] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentPage, setRecentPage] = useState(1);
  const [recentTotalPages, setRecentTotalPages] = useState(1);
  const query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    setRecentLoading(true);

    axios
      .get(
        `https://wajik-anime-api.vercel.app/samehadaku/search?q=${encodeURIComponent(
          searchTerm
        )}`
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
          Search Results for {searchTerm}
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

export default Search;
