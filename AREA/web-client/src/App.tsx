import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { hasAuthenticated } from "./services/AuthApi/AuthApi";
import Auth from "./contexts/Auth/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { gapi } from "gapi-script";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId:
          "1067972064810-9r8kofld8i53kh8cliebsji7dgfa7ajp.apps.googleusercontent.com",
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  });

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </Auth.Provider>
    </>
  );
};

export default App;
