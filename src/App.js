import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Postdata from "./components/NewTenant";
import Footer from "./components/Footer";
import Data from "./components/ViewTenants";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth } from "./firebase";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
      //console.log(user);
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/new-tenant" element={<Postdata />}></Route>
            <Route path="/" element={<Data />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="*" element={<div>Page not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
