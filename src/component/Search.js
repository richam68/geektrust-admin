import React, { memo, useState } from "react";

const Search = ({
  originalData,
  setAdminData,
  setCurrentPage,
  setTotalItems,
}) => {
  
  const [search, setSearch] = useState("");

  //search functionality using any key
  const handleSearch = async (e) => {
    let value = e.target.value;
    setSearch(value);

    let filteredDataValue = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.role.toLowerCase().includes(value.toLowerCase())
    );

    setAdminData(filteredDataValue);
    setCurrentPage(1);
    setTotalItems(filteredDataValue.length);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-desktop"
        value={search}
        onChange={handleSearch}
        placeholder="Search by name, email and role"
      />
    </div>
  );
};

export default memo(Search);
