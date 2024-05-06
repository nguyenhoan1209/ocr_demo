import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EkycPage from "./pages/EkycPage";
import FaceMatchingPage from "./pages/FaceMatchingPage";
import BusinessLicensePage from "./pages/BusinessLicensePage";

import { AuthProvider } from "./context/AuthContext";
import { FrontImageProvider } from "./context/FrontImageContext";
import PrivateRoute from "./utils/PrivateRoute";


const App = () => {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
        <FrontImageProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/ekyc" element={<PrivateRoute><EkycPage/></PrivateRoute>} />
            <Route path="/face-matching" element={<PrivateRoute><FaceMatchingPage/></PrivateRoute>} />
            <Route path="/business-license" element={<PrivateRoute><BusinessLicensePage/></PrivateRoute>} />
          </Routes>
          </FrontImageProvider>
      </AuthProvider>
      </Router>
    </div>
  );
};

export default App;