import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">
            Conime
          </Link>
          {/* Desktop Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center"
          >
            <input
              type="text"
              placeholder="Search anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
            />
            <button
              type="submit"
              className="bg-gray-100 dark:bg-gray-200 px-3 py-1.5 rounded-r-md hover:bg-gray-200 transition border border-gray-400 dark:text-gray-700"
            >
              <FiSearch size={20} />
            </button>
          </form>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/daftar-anime" className="hover:text-blue-300">
              Daftar Anime
            </Link>
          </li>
          <li>
            <Link to="/anime-completed" className="hover:text-blue-300">
              Completed
            </Link>
          </li>
          <li>
            <Link to="/anime-movie" className="hover:text-blue-300">
              Movie
            </Link>
          </li>
          <li>
            <Link to="/anime-batch" className="hover:text-blue-300">
              Batch
            </Link>
          </li>
          <li>
            <Link to="/genres" className="hover:text-blue-300">
              Genre
            </Link>
          </li>
          <li>
            <Link to="/jadwal-rilis" className="hover:text-blue-300">
              Jadwal Rilis
            </Link>
          </li>
        </ul>
        <div className="flex items-center">
          {/* Mobile Search Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            >
              <FiSearch size={20} />
            </button>
          </div>
          <button
            onClick={toggleDarkMode}
            className="ml-2  hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded transition-colors"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          {/* Mobile Menu Toggle */}
          <button
            onClick={handleToggleMenu}
            className="ml-2 md:hidden bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="p-4">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
            />
          </form>
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                to="/"
                className="hover:text-blue-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                to="/daftar-anime"
                className="hover:text-blue-300"
              >
                Daftar Anime
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                to="/anime-completed"
                className="hover:text-blue-300"
              >
                Anime Completed
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                to="/anime-movie"
                className="hover:text-blue-300"
              >
                Movie
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                to="/anime-batch"
                className="hover:text-blue-300"
              >
                Batch
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                to="/jadwal-rilis"
                className="hover:text-blue-300"
              >
                Jadwal Rilis
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                to="/genres"
                className="hover:text-blue-300"
              >
                Genre
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
