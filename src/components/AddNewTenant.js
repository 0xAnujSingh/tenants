// NewTenant is no more in use
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";
import TenantDataService from "./TenantDataService";
import { db } from "../firebase";
import { and, collection, or, query, where } from "firebase/firestore";
import RoomService from "./RoomService";
import { onSnapshot } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";

function ViewTenant({ tenant }) {
  return <p>{tenant.roomId}</p>
}

const AddNewTenant = () => {
  const params = useParams();
  

  const [room, setRoom] = useState({});

  const [existingTenant, setExistingTenant] = useState();

  const outlet = useOutletContext();
  
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
      and(
        where("roomId", "==", params.id),
        where("userId", "==", outlet.user.uid),
        // or(where("state", "==", "requested"), where("state", "==", "accepted"))
      )
    );

    onSnapshot(q, (snapshot) => {
      if (!snapshot.docs[0]) {
        setExistingTenant(null);
        return;
      }

      //console.log(snapshot.docs.map((doc) => doc.data()));

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
    
    //console.log(data.data());
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
      { !existingTenant && <Card>
        <Card.Body>
          <Card.Title>Apply to join</Card.Title>
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
        </Card.Body>
      </Card> }
      {existingTenant && existingTenant.state === 'requested' && (
        <Alert variant="success" style={{ marginTop: "8px" }}>
          Already {existingTenant.state}
        </Alert>
      )}
      {existingTenant && existingTenant.state === 'accepted' && (
        <>
        <Alert variant="success" style={{ marginTop: "8px" }}>
          Living since {existingTenant.dateOfJoining.toDate().toDateString()}
        </Alert>

        <ViewTenant tenant={existingTenant} />
        </>
      )}
    </div>
  );
};

export default AddNewTenant;
