import logo from "./logo.svg";
import "./App.css";
import BillManager from "./BillManager";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<BillManager />} />
      </Routes>
    </div>
  );
}

export default App;
