import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Building from "./views/building/buildingView";
import Flat from "./views/flats/flatsView";
import './App.css';


function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/flats" element={<Flat/>}/>
          <Route exact path="/buildings" element={<Building/>}/>
          <Route exact path="/" element={<Building/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
