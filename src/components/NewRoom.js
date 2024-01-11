import { collection } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { db } from "../firebase";
import RoomService from "./RoomService";
import { useOutletContext } from "react-router-dom";

const NewRoom = () => {
  const outlet = useOutletContext();
  
  const [room, setRoom] = useState({
    //Id: "",
    RoomNo: "",
    Rent: "",
    Unit: "",
    // Owner: "user.id",
    // TenantId: "",
    Address: "",
    Windows: "",
    RoomSize: "",
  });
  const onChangeHandler = (e) => {
    e.preventDefault();

    setRoom({ ...room, [e.target.name]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const { RoomNo, Rent, Unit, Address, Windows, RoomSize } = room;
    if ((RoomNo, Rent, Unit, Address, Windows, RoomSize)) {
      const dbRef = collection(db, "Rooms");

      const newRoom = room;

      newRoom.Unit = Number(room.Unit);
      newRoom.Rent = Number(room.Rent);
      newRoom.Owner = outlet.user.uid;
      

      await RoomService.addRoom(dbRef, room)
        .then((docRef) => {
          setRoom({
            RoomNo: "",
            Rent: "",
            Unit: "",
            Address: "",
            Windows: "",
            RoomSize: "",
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
    <div>
      <p>Welcome! {outlet.user.displayName}</p>
      <div
        style={{
          justifyContent: "center",
          backgroundColor: "#DCDCDC",
          height: "100%",
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
        <Form onSubmit={submitData}>
          <FormGroup>
            <Label>Room No</Label>
            <Input
              name="RoomNo"
              placeholder="Room No"
              type="text"
              value={room.RoomNo}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Rent</Label>
            <Input
              name="Rent"
              placeholder="Rent"
              type="number"
              value={room.Rent}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Unit</Label>
            <Input
              name="Unit"
              placeholder="Unit"
              type="number"
              value={room.Unit}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input
              name="Address"
              placeholder="Address"
              type="text"
              value={room.Address}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Windows</Label>
            <Input
              name="Windows"
              placeholder="Windows"
              type="text"
              value={room.Windows}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>RoomSize</Label>
            <Input
              name="RoomSize"
              placeholder="RoomSize"
              type="text"
              value={room.RoomSize}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <Button className="my-3" onClick={submitData}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewRoom;
