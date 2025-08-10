"use client";

import React from "react";

interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ search, setSearch }: SearchBarProps, className="") {

    // Changes the search term when you seach
    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className={`relative flex items-center w-auto ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                />
            </svg>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search"
                className="bg-slate-100 placeholder:text-slate-600 text-slate-700 text-base
                border border-slate-200 rounded-full pl-10 pr-3 py-2
                transition duration-300 ease focus:outline-none focus:border-slate-400
                hover:border-slate-300 shadow-sm focus:shadow h-12 w-full"
            />
        </div>
    );
}

export default SearchBar;
