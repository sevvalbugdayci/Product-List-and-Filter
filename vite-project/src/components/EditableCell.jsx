import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";

function EditableCell({ value, onChange, isNumeric = false }) {
  const [editedValue, setEditedValue] = useState(value);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onChange(editedValue);
    }
  };

  return (
    <TableCell align="center">
      <input
        type={isNumeric ? "number" : "text"}
        value={editedValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </TableCell>
  );
}

export default EditableCell;
