import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
import "./App.css";
import AlterEgo from "./pages/AlterEgo/AlterEgo";
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
          <Route path="/alter-ego" element={<AlterEgo />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
