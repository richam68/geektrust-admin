import React, { useEffect, useState, Fragment } from "react";
import Search from "./Search";
import Edit from "./Edit";
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
    let editingData = adminData.map((item) => {
      return item.id === id ? { ...item, ...editData } : item;
    });
    setAdminData(editingData);
    setOriginalData(editingData);
    setCurrentPage(currentPage);
    setTotalItems(editingData.length);
    setIsEdit(null);
    setEditData({});
  };

  //selecting all checkboxes
  const handleCheckbox = (event) => {
    setAllSelected(event);

    const checkboxValues = paginatedData.reduce(
      (checkboxState, currentItem) => {
        checkboxState[currentItem.id] = event;
        return checkboxState;
      },{}
    );
    setSelectedCheckboxIds(checkboxValues);
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
        <table style={{ width: "100%", borderCollapse: " collapse" }}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleCheckbox(e.target.checked)}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((items) => {
              return (
                <Fragment key={items.id}>
                  {isEdit === items.id ? (
                    <Edit
                      editData={editData}
                      setEditData={setEditData}
                      handleSave={handleSave}
                    />
                  ) : (
                    <Table
                      key={items.id}
                      items={items}
                      handleEdit={handleEdit}
                      adminData={adminData}
                      setAdminData={setAdminData}
                      setOriginalData={setOriginalData}
                      setCurrentPage={setCurrentPage}
                      setTotalItems={setTotalItems}
                      selectedCheckboxIds={selectedCheckboxIds}
                      setSelectedCheckboxIds={setSelectedCheckboxIds}
                    />
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>

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
