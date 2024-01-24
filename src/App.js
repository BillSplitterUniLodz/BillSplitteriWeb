import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import AuthenticationPage from "./Pages/AuthenticationPage/AuthenticationPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/Home/MainPage/MainPage";
import Group from "./Pages/Home/MainPage/Group/Group";
import Expenses from "./Pages/Home/MainPage/Group/Expenses/Expenses";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Group" element={<Group />} />
        <Route path="/Expenses" element={<Expenses />} />
      </Routes>
    </div>
  );
};

export default App;
