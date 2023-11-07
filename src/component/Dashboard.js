import React, { useEffect, useState, Fragment } from "react";
import Search from "./Search";
import Edit from "./Edit";
import Table from "./TableList";
import Pagination from "./Pagination";
import "./dashboard.css";

export default function Dashboard() {
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const POST_PER_PAGE = 10;

  const [originalData, setOriginalData] = useState([]);
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);

  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [isEdit, setIsEdit] = useState(null);
  const [editData, setEditData] = useState({});

  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [selectedCheckboxes, setselectedCheckboxes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let currentPost = paginateFunction(adminData, currentPage, POST_PER_PAGE);
    setPaginatedData(currentPost);
  }, [currentPage, adminData]);

  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAdminData(data);
      setOriginalData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error Found", error);
    }
  }

  function paginateFunction(adminData, currentPage, POST_PER_PAGE) {
    const indexOfFirstPost = (currentPage - 1) * POST_PER_PAGE;
    const indexOfLastPost = indexOfFirstPost + POST_PER_PAGE;
    return adminData.slice(indexOfFirstPost, indexOfLastPost);
  }
  //changing page according to page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  //Edit data
  const handleEdit = (id) => {
    console.log("handle edit dashboard page", id);
    setEditData(paginatedData.find((ele) => ele.id === id));
    setIsEdit(id);
  };

  // save button
  const handleSave = (id) => {
    console.log(id);
    let editingData = adminData.map((element) => {
      return element.id === id ? { ...element, ...editData } : element;
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
    setSelectAllCheckbox(event);

    const checkboxValues = paginatedData.reduce((acc, value) => {
      acc[value.id] = event;
      return acc;
    }, {});

    setselectedCheckboxes(checkboxValues);
  };

  //Delete selected
  const deleteSelected = () => {
    let selectedData = Object.keys(selectedCheckboxes).filter(
      (id) => selectedCheckboxes[id]
    );
    if (selectedData.length === 0) return;

    const updateAdminTable = adminData.filter(
      (element) => !selectedData.includes(element.id)
    );

    if (selectAllCheckbox) {
      setselectedCheckboxes({});
      setSelectAllCheckbox(false);
    }

    setCurrentPage(1);
    setOriginalData(updateAdminTable);
    setAdminData(updateAdminTable);
    setTotalItems(updateAdminTable.length);
  };

  return (
    <div className="container">
      <div className="content text-white">
        <Search search={search} handleSearch={handleSearch} />

        <table style={{ width: "100%", borderCollapse: " collapse" }}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAllCheckbox}
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
                <Fragment>
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
                      selectedCheckboxes={selectedCheckboxes}
                      setselectedCheckboxes={setselectedCheckboxes}
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
