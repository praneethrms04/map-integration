import React, { useState } from "react";
import SearchBar from "./SearchBar";

const Header = ({ searchQuery, setSearchQuery, handleReturnClick }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <p className="block text-2xl font-bold" href="/">
          <span className="">My Properties (5)</span>
        </p>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center text-sm">
              <li>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </li>
              <li className="ms-3">
                <button
                  className="rounded-full bg-indigo-300 px-4 py-2"
                  onClick={handleReturnClick}
                >
                  Back To Top
                </button>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4 relative">
            <div className="sm:flex sm:gap-4">
              <button
                className="block rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="/"
              >
                <span className="me-2 font-bold text-xl"> +</span>
                Add Property
              </button>
            </div>
            <div className="md:hidden hidden">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-28 top-10 md:hidden block md:right-0 md:top-0">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
// md:right-0 md:top-0
