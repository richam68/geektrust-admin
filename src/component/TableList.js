import React, { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./tableList.css";

const AdminPage = ({
  items,
  handleEdit,
  adminData,
  setAdminData,
  setOriginalData,
  setCurrentPage,
  setTotalItems,
  selectedCheckboxes,
  setselectedCheckboxes,
}) => {
  //Each row consist checkbox for selecting them
  const handleCheckBox = (event, id) => {
    setselectedCheckboxes((prevState) => ({
      ...prevState,
      [id]: event,
    }));
  };

  //deleting each row using delete button
  const handleDelete = async (id) => {
    const deletedData = adminData.filter((item) => item.id !== id);
    setAdminData(deletedData);
    setOriginalData(deletedData);
    setCurrentPage(1);
    setTotalItems(deletedData.length);
  };

  return (
    <tr className={selectedCheckboxes[items.id] ? "selected-row" : ""}>
      <td>
        <input
          type="checkbox"
          checked={selectedCheckboxes[items.id] || false}
          onChange={(e) => handleCheckBox(e.target.checked, items.id)}
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
  );
};

export default memo(AdminPage);
