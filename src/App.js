import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from "./components/ViewTenants";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoutes from "./components/PrivateRoutes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Transactions from "./components/Transactions";
import NewTenant from "./components/NewTenant";

const App = () => {
  const [user, setUser] = useState(undefined); // undefined | null | User

  useEffect(() => {
    onAuthStateChanged(getAuth(), setUser);
  }, []);

  if (user === undefined) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes user={user} />}>
            <Route path="/new-tenant" element={<NewTenant />}></Route>
            <Route path="/" element={<Data />}></Route>
            <Route path="/transactions/:id" element={<Transactions />}></Route>
          </Route>
          <Route path="login" element={<Login user={user} />}></Route>
          <Route path="signup" element={<Signup user={user} />}></Route>
          <Route path="*" element={<div>Page not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
