import React, { Component, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./BillManager.css";

function BillManager() {
  const [file, setFile] = useState([]);
  const [records, setRecords] = useState([]);
  const inputFile = useRef(null);
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);
  const handleChange = (e) => {
    setFile([...file, e.target.files[0]]);
    // This method fetches the records from the database.
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
      <h2>{records}</h2>
    </div>
  );
}
export default BillManager;
