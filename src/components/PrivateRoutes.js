import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

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

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
