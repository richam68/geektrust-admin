import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
