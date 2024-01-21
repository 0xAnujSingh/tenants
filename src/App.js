import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from "./components/ViewTenants";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoutes from "./components/PrivateRoutes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Transactions from "./components/Transactions";
import NewRoom from "./components/NewRoom";
import ViewRooms from "./components/ViewRooms";
import AddNewTenant from "./components/AddNewTenant";
import ViewRequests from "./components/ViewRequests";
import Room from "./components/Room";

const App = () => {
  const [user, setUser] = useState(undefined); // undefined | null | User

  useEffect(() => {
    onAuthStateChanged(getAuth(), setUser);
  }, []);

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes user={user} />}>
            <Route path="/" element={<ViewRooms />}></Route>
            <Route path="/transactions/:id" element={<Transactions />}></Route>
            <Route path="/rooms/new" element={<NewRoom />}></Route>
            <Route path="/rooms/:id/tenant" element={<AddNewTenant />}></Route>
            <Route
              path="/rooms/:id/requests"
              element={<ViewRequests />}
            ></Route>
            <Route path="/rooms/:id" element={<Room />}></Route>
            <Route path="/rooms" element={<ViewRooms />}></Route>
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
