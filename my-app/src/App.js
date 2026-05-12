import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Simulation from "./page/Simulation";
import CodeView from "./page/CodeView";
import Tests from "./page/Tests";
import Admin from "./page/Admin";
import AdminLogin from "./page/AdminLogin";
import Navbar from "./component/Navbar";
import Theory from "./page/Theory";
import About from "./page/About";
import Compare from "./page/Compare";

import AdminRoute from "./component/AdminRoute";
import { AuthProvider } from "./context/AuthContext";

import ThemeToggle from "./component/ThemeToggle";
import { applyTheme, getInitialTheme } from "./component/theme";

function App() {
  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulate/:algo" element={<Simulation />} />
          <Route path="/code/:algo" element={<CodeView />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/about" element={<About />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;