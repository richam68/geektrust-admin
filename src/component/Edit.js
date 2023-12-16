import React, {memo} from "react";
import DoneIcon from "@mui/icons-material/Done";

const EditData = ({ editData, setEditData, handleSave }) => {

  const handleChange = (e) => {
    // console.log(">>> handle change", e);
    let fieldName = e.target.getAttribute("name");
    let fieldValue = e.target.value;

    const newData = { ...editData };
    newData[fieldName] = fieldValue;
    setEditData(newData);
  };

  return (
    <tr>
      <td></td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter name"
          name="name"
          value={editData.name}
          onChange={handleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter email"
          name="email"
          value={editData.email}
          onChange={handleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter role"
          name="role"
          value={editData.role}
          onChange={handleChange}
        ></input>
      </td>
      <td>
        <button className="save-btn" onClick={() => handleSave(editData.id)}>
          <DoneIcon />
        </button>
      </td>
    </tr>
  );
};

export default memo(EditData);
