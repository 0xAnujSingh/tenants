// NewTenant is no more in use
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";
import TenantDataService from "./TenantDataService";
import { db } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import RoomService from "./RoomService";
import { onSnapshot } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";

const AddNewTenant = () => {
  const params = useParams();
  //console.log(params.id);

  const [room, setRoom] = useState({});

  //console.log(room);
  const [existingTenant, setExistingTenant] = useState();

  const outlet = useOutletContext();
  //console.log(outlet);

  const [tenantData, setTenantData] = useState({
    dateOfJoining: "",
  });

  const changeHandler = (e) => {
    setTenantData({ ...tenantData, [e.target.name]: e.target.value });
  };

  const submitData = async () => {
    const { dateOfJoining } = tenantData;

    // if (room.Owner === outlet.user.uid) {
    //     alert('Owners cannot make request to join their own room');
    //     return;
    // }
    if (!dateOfJoining) {
      console.log("Please fill the data");
      alert("plz fill the data");
    }
    const dbRef = collection(db, "TenantData"); //tenantData

    const newTenantData = tenantData;
    newTenantData.userName = outlet.user.displayName;
    newTenantData.userId = outlet.user.uid;
    newTenantData.dateOfJoining = new Date(
      Date.parse(tenantData.dateOfJoining)
    );
    newTenantData.roomId = params.id;
    newTenantData.state = "requested";
    await TenantDataService.addTenant(dbRef, tenantData)
      .then((docRef) => {
        setTenantData({
          DateOfJoining: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });  
  };

  // we direct use onSnapshot in useEffect to terminate the eventlistner
  useEffect(() => {
    getByRoomId(params.id);

    const dbRef = collection(db, "TenantData");

    const q = query(
      dbRef,
      where("roomId", "==", params.id),
      where("userId", "==", outlet.user.uid),
      where("state", "==", "requested")
    );

    onSnapshot(q, (snapshot) => {
      if (!snapshot.docs[0]) {
        setExistingTenant(null);
        return;
      }
    
      const req = snapshot.docs[0].data();
      req.id = snapshot.docs[0].id;
      setExistingTenant(req);
    });
  }, []);

  const getByRoomId = async () => {
    // onSnapshot(RoomService.ref(), (snapshot) => {
    //   setRoom(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
    const data = await RoomService.getRoomById(params.id);
    console.log(params.id);
    console.log(data.data());
    setRoom(data.data());
  };

  return (
    <div
      style={{
        margin: "8px auto",
        width: "300px",
      }}
    >
      {/* <p>{JSON.stringify(existingTenant)}</p> */}
      <Card>
        <Card.Body>
          <Card.Title>Apply to join</Card.Title>
          <small>{params.id}</small>
          <div>
            <small>RoomNo :</small>
            {room.RoomNo}
          </div>
          <div>
            <small>Rent :</small>
            {room.Rent}
          </div>
          <div>
            <small>Unit :</small>
            {room.Unit}
          </div>
          <div>
            <small>Address :</small>
            {room.Address}
          </div>
          <div>
            <small>Windows :</small>
            {room.Windows}
          </div>
          <div>
            <small>RoomSize :</small>
            {room.RoomSize}
          </div>
        </Card.Body>
        {!existingTenant && (
          <Card.Footer className="text-muted">
            <FormGroup>
              <Label for="examplePassword"> Date Of Joining </Label>
              <Input
                id="DateOfJoining"
                name="dateOfJoining"
                placeholder="Date Of Joining"
                type="date"
                value={tenantData.dateOfJoining}
                onChange={changeHandler}
              />
            </FormGroup>
            <Button onClick={submitData}>Submit</Button>
          </Card.Footer>
        )}
      </Card>
      {existingTenant && (
        <Alert variant="success" style={{ marginTop: "8px" }}>
          Already Requested
        </Alert>
      )}
    </div>
  );
};

export default AddNewTenant;
