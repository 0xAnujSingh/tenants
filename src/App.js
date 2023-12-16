import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Postdata from "./components/Postdata";
import Footer from "./components/Footer";
import Data from "./components/Data";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth } from "./firebase";
import Update from "./components/Update";

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
      <Header />
        <Routes>
          <Route path="home" element={<Home name={userName} />}></Route>
          <Route path="postdata" element={<Postdata />}></Route>
          <Route path="getAll" element={<Data />}></Route>
          <Route path="aboutus" element={<AboutUs />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
