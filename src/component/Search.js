import React, { memo } from "react";

const SearchComponent = ({ search, handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearch}
        placeholder="Search by name, email and role."
        className="search-desktop"
      ></input>
    </div>
  );
};

export default memo(SearchComponent);
