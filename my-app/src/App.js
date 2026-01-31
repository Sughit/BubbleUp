import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page/Home';
import Simulation from './page/Simulation';
import CodeView from './page/CodeView';
import Navbar from "./component/Navbar";
import About from "./page/About";
import Theory from "./page/Theory";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulate/:algo" element={<Simulation />} />
          <Route path="/code/:algo" element={<CodeView />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
