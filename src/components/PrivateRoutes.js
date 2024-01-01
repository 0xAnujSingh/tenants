import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import Header from './Header';
import Footer from "./Footer";

const PrivateRoutes = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  });

  if (user === undefined) {
    return <p>Loading</p>
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <main>
    <Header user={user} />
    <Outlet />
    <Footer />
  </main>;
};

export default PrivateRoutes;
