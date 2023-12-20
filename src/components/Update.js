import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TenantServiceData from "./TenantData";
import { Container,  Input, Label, FormGroup, Button } from "reactstrap";

const Update = () => {
  const location = useLocation();
  const params = useParams();
  const [updateTenant, setUpdateTenant] = useState({});

  useEffect(() => {
    getTenantById(params.id);
  }, []);

  const getTenantById = async (tenantId) => {
    console.log("fetching tenant data");

    const documentSnap = await TenantServiceData.getTenantById(tenantId);

    if (!documentSnap.exists()) {
      console.log("not found");
    } else {
      setUpdateTenant(
        Object.assign({ id: documentSnap.id }, documentSnap.data())
      );
    }
  };

  const clickHandler = async (tenantId) => {
    await TenantServiceData.updateTenant(tenantId, updateTenant);
  };

  const onChangeHandler = (e) => {
    setUpdateTenant({ ...updateTenant, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundColor: "DarkSlateBlue",
      }}
    >
      <div
        style={{
          height: "50%",
          width: "50%",
          border: "2px solid black",
          marginTop: "2%",
          marginLeft: "25%",
          borderRadius: "2%",
          boxShadow: "3px 3px 3px grey",
          backgroundColor: "white",
        }}
      >
        {params.id}..... Update
        <Container>
          <FormGroup>
            <Label for="Room no">Room No</Label>
            <Input
              id="RoomNo"
              name="RoomNo"
              placeholder="RoomNo "
              type="text"
              value={updateTenant.RoomNo || ""} //  || '' This is just or warning:This is likely caused by the value changing from undefined to a defined value, which should not happen.
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              type="text"
              value={updateTenant.Name || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="DateOfJoining">Date Of Joining</Label>
            <Input
              id="DateOfJoining"
              name="DateOfJoining"
              placeholder="Date Of Joining "
              type="text"
              value={updateTenant.DateOfJoining || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="TillOneMonth">Till One Month</Label>
            <Input
              id="TillOneMonth"
              name="TillOneMonth"
              placeholder="TillOneMonth "
              type="text"
              value={updateTenant.TillOneMonth || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Rent">Rent</Label>
            <Input
              id="Rent"
              name="Rent"
              placeholder="Rent "
              type="text"
              value={updateTenant.Rent || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="PresentUnit">Present Unit</Label>
            <Input
              id="PresentUnit"
              name="PresentUnit"
              placeholder="PresentUnit "
              type="text"
              value={updateTenant.PresentUnit || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="PreviousUnit">Previous Unit</Label>
            <Input
              id="PreviousUnit"
              name="PreviousUnit"
              placeholder="PreviousUnit "
              type="text"
              value={updateTenant.PreviousUnit || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Unit">Unit</Label>
            <Input
              id="Unit"
              name="Unit"
              placeholder="Unit "
              type="text"
              value={updateTenant.Unit || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Total">Total</Label>
            <Input
              id="Total"
              name="Total"
              placeholder="Total "
              type="text"
              value={updateTenant.Total || ""}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Button  variant="primary" onClick={() => clickHandler(params.id)}>Submit</Button>
          </FormGroup>
        </Container>
      </div>
    </div>
  );
};

export default Update;
