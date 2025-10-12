import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page/Home';
import Simulation from './page/Simulation';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulate/:algo" element={<Simulation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
