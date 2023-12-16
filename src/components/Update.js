import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantServiceData from "./TenantData";

const Update = () => {
  const params = useParams();

  useEffect(() => {
    getTenantById(params.id);
  }, []);

  const getTenantById = async (tenantId) => {
    const documentSnap = await TenantServiceData.getTenantById(tenantId);

    if (!documentSnap.exists()) {
      console.log("not found");
    } else {
      console.log(documentSnap.data());
    }
  };

  return <div>{params.id}..... Update</div>;
};

export default Update;
