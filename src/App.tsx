import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResultsPage from "./pages/SearchResultsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;