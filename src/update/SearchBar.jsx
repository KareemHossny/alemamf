import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div
        className="flex items-center bg-white/70 border border-blue-200 shadow-md rounded-2xl px-4 sm:px-6 py-3 focus-within:ring-2 focus-within:ring-sky-300 transition-all"
        style={{
          backdropFilter: "blur(3px) saturate(120%)",
          WebkitBackdropFilter: "blur(3px) saturate(120%)",
        }}
      >
        <svg
          className="w-6 h-6 text-sky-500 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن مشروع بالاسم أو الموقع أو المهندس..."
          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-base sm:text-lg"
          style={{
            fontFamily: "'Tajawal', 'Cairo', sans-serif",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
