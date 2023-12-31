import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import TenantDataService from "./TenantData";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import TenantData from "./TenantData";
import image from "../img/modern-residential-district-with-green-roof-balcony-generated-by-ai.jpg";

const Postdata = () => {
  const [tenantData, setTenantData] = useState({
    RoomNo: "",
    Name: "",
    DateOfJoining: "",

    Rent: "",
    Balance: "",
    Unit: "",
  });

  const changeHandler = (e) => {
    console.log(e.target.value)
    // e.preventDefault()
    setTenantData({ ...tenantData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const {
      RoomNo,
      Name,
      DateOfJoining,

      Rent,
      Balance,
      Unit,
    } = tenantData;
    if (RoomNo && Name && DateOfJoining && Rent && Unit && Balance) {
      const dbRef = collection(db, "TenantData");
      console.log(tenantData);

      const newTenantData = tenantData;
      newTenantData.Balance = Number(tenantData.Balance);
      newTenantData.Unit = Number(tenantData.Unit);
      newTenantData.Rent = Number(tenantData.Rent);
      newTenantData.DateOfJoining = new Date(Date.parse(tenantData.DateOfJoining));
      newTenantData.RentPaidTill = new Date(Date.parse(tenantData.DateOfJoining));


      await TenantDataService.addTenant(dbRef, tenantData)
        .then((docRef) => {
          console.log("doc added");
          setTenantData({
            RoomNo: "",
            Name: "",
            DateOfJoining: "",

            Rent: "",

            Balance: "",
            Unit: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Please fill the data");
      alert("plz fill the data");
    }
  };

  return (
    <div
      className="container mx-2 my-3"
      style={{
        justifyContent: "center",
        backgroundColor: "#DCDCDC",
        height: "100%",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "50%",
        width: "50%",
        border: "2px solid black",
        marginTop: "2%",
        marginLeft: "25%",
        borderRadius: "2%",
      }}
    >
      <Form action="#" onSubmit={submitData}>
        <FormGroup>
          <Label for="examplePassword"> RoomNo </Label>
          <Input
            id="RoomNo"
            name="RoomNo"
            placeholder="Room No"
            type="number"
            value={tenantData.RoomNo}
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"> Name </Label>
          <Input
            id="Name"
            name="Name"
            placeholder="Name"
            type="text"
            value={tenantData.Name}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Date Of Joining </Label>
          <Input
            id="DateOfJoining"
            name="DateOfJoining"
            placeholder="DateOfJoining"
            type="date"
            value={tenantData.DateOfJoining}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Rent </Label>
          <Input
            id="Rent"
            name="Rent"
            placeholder="Rent"
            type="number"
            value={tenantData.Rent}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Unit </Label>
          <Input
            id="Unit"
            name="Unit"
            placeholder="Unit"
            type="number"
            value={tenantData.Unit}
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"> Balance </Label>
          <Input
            id="Balance"
            name="Balance"
            placeholder="Balance"
            type="number"
            value={tenantData.Balance}
            onChange={changeHandler}
          />
        </FormGroup>

        <Button
          style={{ color: "danger" }}
          //onClick={submitData}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Postdata;
