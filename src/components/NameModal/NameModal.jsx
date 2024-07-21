import React, { useState } from "react";
import "./NameModal.css";

const NameModal = ({ setName }) => {
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = () => {
    if (nameInput.trim() !== "") {
      setName(nameInput);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter Your Name</h2>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default NameModal;
