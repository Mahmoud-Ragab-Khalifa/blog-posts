"use client";

import { useSearch } from "@/contexts/SearchContext";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <input
      type="search"
      name="search"
      placeholder="Search By Title..."
      className="input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInput;
