import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Using Routes instead of Switch
import Navbar from "./components/Navbar";
import UserList from "./pages/Userlist";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import "./styles/style.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes> {/* Switch has been replaced by Routes */}
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
