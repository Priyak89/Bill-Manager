import React, {
  Component,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { json, Link } from "react-router-dom";
// import "./BillManager.css";
import { createWorker } from "tesseract.js";

function BillManager() {
  const [file, setFile] = useState("");
  const [records, setRecords] = useState([]);
  const [textResult, setTextResult] = useState("");
  const [wordFound, setWordFound] = useState([]);
  const inputFile = useRef(null);
  // const worker = createWorker();
  let worker = null;

  //This hook is used to display records from backend to the UI
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
    console.log(records);
    //getRecords();
    // return;
  });
  // This function extracts the text from the selected image file.

  const convertImageToText = useCallback(async () => {
    if (!file) return;

    if (!worker) worker = await createWorker();
    console.log("worker:", worker);
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(file);
    setTextResult(data.text);
    console.log("Result:", data.text);
  }, [file]);

  //This useEffect is to convert the selected image to text
  useEffect(() => {
    convertImageToText();
  }, [file, convertImageToText]);

  // This function sets the selected input file to the input box.

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
      setTextResult("");
    }
  };
  // This method fetches the records from the database.
  const listItems = records.map((record) => {
    //JSON.stringify converts objects(retrieved from tbe database) to string.
    return <li key={record._id}>{JSON.stringify(record)}</li>;
  });
  function findMatchingWord() {
    let word = textResult.match(/cyclone/gi);
    for (let i = 0; i < word.length; i++) {
      console.log(word[i]);
    }
    setWordFound(word ? word.length : 0);
  }

  return (
    <div>
      <h3>Hello Welcome to Bill Manager</h3>
      <button onClick={() => inputFile.current.click()}>Upload File</button>
      <input
        type="file"
        onChange={handleChange}
        ref={inputFile}
        hidden="true"
        accept="image/*"
      ></input>
      <h3>Selected Files:</h3> {file.name}
      {/* //This list items displayed are the records from the backend. */}
      <ul> {listItems}</ul>
      {file && <img src={URL.createObjectURL(file)} alt="thumb" />}
      {textResult && <div>{textResult}</div>}
      <button onClick={findMatchingWord}>Find matching word</button>
      <p>Word Found:{wordFound}</p>
    </div>
  );
}
export default BillManager;
