import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EkycPage from "./pages/EkycPage";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";


const App = () => {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/ekyc" element={<PrivateRoute><EkycPage/></PrivateRoute>} />
          </Routes>
      </AuthProvider>
      </Router>
    </div>
  );
};

export default App;