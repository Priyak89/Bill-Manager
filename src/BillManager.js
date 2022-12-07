import React, { Component, useRef, useState } from "react";
// import "./BillManager.css";

function BillManager() {
  const [file, setFile] = useState([]);
  const inputFile = useRef(null);
  const handleChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  return (
    <div>
      <h3>Hello Welcome to Bill Manager</h3>
      <button onClick={() => inputFile.current.click()}>Upload File</button>
      <input
        type="file"
        onChange={handleChange}
        ref={inputFile}
        hidden="true"
      ></input>
      <h3>Selected Files:</h3> {file.map((x) => x.name).join(", ")}
    </div>
  );
}
export default BillManager;
