import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TenantServiceData from "./TenantData";

import { Container, Form, Input, Label, FormGroup, Button } from "reactstrap";

const Update = () => {
  const location = useLocation();
  const params = useParams();
  const [updateTenant, setUpdateTenant] = useState({});

  // const data = location.state
  // console.log(data)

  useEffect(() => {
    getTenantById(params.id);
    setUpdateTenant(location.state.tenant);
  }, []);

  const getTenantById = async (tenantId) => {
    const documentSnap = await TenantServiceData.getTenantById(tenantId);

    if (!documentSnap.exists()) {
      console.log("not found");
    } else {
      console.log(documentSnap.data()); // data() is function of firebase that brings a full data from documentsnap
      // setUpdateTenant({
      //   ...updateTenant,
      //   [documentSnap.data.name]: documentSnap.data.value,
      // });
    }
  };

  const clickHandler = async (tenantId) => {
    await TenantServiceData.updateTenant(tenantId, updateTenant);
  };

  const onChangeHandler = (e) => {
    setUpdateTenant({ ...updateTenant, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {params.id}..... Update
      <FormGroup>
        <Label for="Room no">Room No</Label>
        <Input
          id="RoomNo"
          name="RoomNo"
          placeholder="RoomNo "
          type="text"
          value={updateTenant.RoomNo || ''}
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
          value={updateTenant.Name}
          onChange={onChangeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Label for="DateOfJoining">DateOfJoining</Label>
        <Input
          id="DateOfJoining"
          name="DateOfJoining"
          placeholder="Date Of Joining "
          type="text"
          value={updateTenant.DateOfJoining}
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
          value={updateTenant.TillOneMonth}
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
          value={updateTenant.Rent}
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
          value={updateTenant.PresentUnit}
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
          value={updateTenant.PreviousUnit}
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
          value={updateTenant.Unit}
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
          value={updateTenant.Total}
          onChange={onChangeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Button onClick={() => clickHandler(params.id)}>Submit</Button>
      </FormGroup>
    </div>
  );
};

export default Update;
