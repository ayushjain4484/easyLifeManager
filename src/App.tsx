import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import AppRoutes from "./routes";

function App() {
  return (
      <div className="App">
        <Router>
          <AppRoutes/>
        </Router>
      </div>
  );
}

export default App;
