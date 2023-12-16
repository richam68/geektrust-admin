import React, { useEffect, useState } from "react";
import Search from "./Search";
import Table from "./Table";
import Pagination from "./Pagination";
import "./dashboard.css";

export default function Dashboard() {
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const POST_PER_PAGE = 10;

  const [originalData, setOriginalData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [isEdit, setIsEdit] = useState(null);
  const [editData, setEditData] = useState({});

  const [isAllSelected, setAllSelected] = useState(false);
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let currentPost = paginateFunction(adminData, currentPage, POST_PER_PAGE);
    setPaginatedData(currentPost);
  }, [currentPage, adminData]);

  //fetching members list
  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAdminData(data);
      setOriginalData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //pagination function
  function paginateFunction(adminData, currentPage, POST_PER_PAGE) {
    const indexOfFirstPost = (currentPage - 1) * POST_PER_PAGE;
    const indexOfLastPost = indexOfFirstPost + POST_PER_PAGE;
    return adminData.slice(indexOfFirstPost, indexOfLastPost);
  }
  //changing page according to page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Edit data
  const handleEdit = (id) => {
    setEditData(paginatedData.find((ele) => ele.id === id));
    setIsEdit(id);
  };

  // save button
  const handleSave = (id) => {
    let updatedData = adminData.map((item) => {
      return item.id === id ? { ...item, ...editData } : item;
    });
    setAdminData(updatedData);
    setOriginalData(updatedData);
    setCurrentPage(currentPage);
    setTotalItems(updatedData.length);
    setIsEdit(null);
    setEditData({});
  };

 //selecting all checkboxes
 const handleAllCheckbox = (event) => {
  setAllSelected(event);

  const checkboxValues = paginatedData.reduce(
    (checkboxState, currentItem) => {
      checkboxState[currentItem.id] = event;
      return checkboxState;
    },
    {}
  );
  setSelectedCheckboxIds(checkboxValues);
};

  //deleting each row using delete button
  const handleDelete = async (id) => {
    const deletedData = adminData.filter((item) => item.id !== id);
    setAdminData(deletedData);
    setOriginalData(deletedData);
    setCurrentPage(1);
    setTotalItems(deletedData.length);
  };
   

  //Delete selected
  const deleteSelected = () => {
    let selectedData = Object.keys(selectedCheckboxIds).filter(
      (id) => selectedCheckboxIds[id]
    );
    if (selectedData.length === 0) return;

    const updateAdminTable = adminData.filter(
      (element) => !selectedData.includes(element.id)
    );

    if (isAllSelected) {
      setSelectedCheckboxIds({});
      setAllSelected(false);
    }

    setCurrentPage(1);
    setOriginalData(updateAdminTable);
    setAdminData(updateAdminTable);
    setTotalItems(updateAdminTable.length);
  };

  return (
    <div className="container">
      <div className="content text-white">
        <Search
          originalData={originalData}
          setAdminData={setAdminData}
          setCurrentPage={setCurrentPage}
          setTotalItems={setTotalItems}
        />
        <Table
          paginatedData={paginatedData}
          isAllSelected={isAllSelected}
          handleAllCheckbox={handleAllCheckbox}
          isEdit={isEdit}
          editData={editData}
          setEditData={setEditData}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDelete={handleDelete}
          selectedCheckboxIds={selectedCheckboxIds}
          setSelectedCheckboxIds={setSelectedCheckboxIds}
        />

        <Pagination
          postPerPage={POST_PER_PAGE}
          totalPosts={totalItems}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          deleteSelected={deleteSelected}
        />
      </div>
    </div>
  );
}
