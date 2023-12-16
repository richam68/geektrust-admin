import React, { memo,Fragment } from "react";
import Edit from "./Edit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./table.css";

const Table = ({
  paginatedData,
  isAllSelected,
  handleAllCheckbox,
  isEdit,
  editData,
  setEditData,
  handleEdit,
  handleSave,
  handleDelete,
  selectedCheckboxIds,
  setSelectedCheckboxIds,
}) => {
  
  //Each row consist checkbox for selecting them
  const handleCheckboxChange = (event, id) => {
    setSelectedCheckboxIds((prevState) => ({
      ...prevState,
      [id]: event,
    }));
  };

  return (
    <table style={{ width: "100%", borderCollapse: " collapse" }}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleAllCheckbox(e.target.checked)}
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
                    <tr className={selectedCheckboxIds[items.id] ? "selected-row" : ""}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCheckboxIds[items.id] || false}
                        onChange={(e) => handleCheckboxChange(e.target.checked, items.id)}
                      />
                    </td>
                    <td>{items.name}</td>
                    <td>{items.email}</td>
                    <td>{items.role}</td>
              
                    <td className="table-data">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          handleEdit(items.id);
                        }}
                      >
                        <EditIcon />
                      </button>
                      {/* )} */}
              
                      <button className="delete-btn" onClick={() => handleDelete(items.id)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
  );
};

export default memo(Table);
