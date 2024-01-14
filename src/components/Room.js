// NewTenant is no more in use
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";
import TenantDataService from "./TenantDataService";
import { db } from "../firebase";
import {
  and,
  collection,
  increment,
  or,
  query,
  where,
} from "firebase/firestore";
import RoomService from "./RoomService";
import { onSnapshot } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { Alert, Col, Dropdown, Row, Container } from "react-bootstrap";
import ViewRequests from "./ViewRequests";
import AddNewTenant from "./AddNewTenant";
import TransactionService from "./TransactionService";
import ViewTenants from "./ViewTenants";
import { toast } from "react-hot-toast";
import Transactions from "./Transactions";

export function RoomCard({ room }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Room</Card.Title>
        <small>{room.id}</small>
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
          <small>Tenant: </small>
          {room.TenantId}
        </div>

        <div>
          <small>RoomSize :</small>
          {room.RoomSize}
        </div>
      </Card.Body>
    </Card>
  );
}

function TenantCard({ tenant }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Tenant</Card.Title>
        <small>{tenant.id}</small>
      </Card.Body>
    </Card>
  );
}

function TenantActions({ tenant }) {
  const outlet = useOutletContext();
  const navigate = useNavigate();

  function handlePaybill(tenant) {
    const Billpay = Number(prompt("Enter paying Amount"));
    const newBalance = tenant.Balance - Billpay;
    const newData = Object.assign({}, tenant);
    newData.Balance = newBalance;
    TenantDataService.updateTenant(tenant.id, newData);

    const dbRef = collection(db, "Transactions");
    const transaction = {
      item: "payment",
      quantity: 1,
      type: "Credit",
      price: Billpay,
      amount: Billpay,
      tenantId: tenant.id,
      tenantName: tenant.Name,
    };

    TransactionService.addTransaction(dbRef, transaction);
  }

  //   const handleDelete = async (id) => {
  //     await TenantDataService.deleteTenant(id);
  //     getTenant();
  //   };

  //   const getTenant = async () => {
  //     const q = query(
  //       TenantDataService.ref(),
  //       where("Owner", "==", outlet.user.uid)
  //     );
  //     onSnapshot(q, (snapshot) => {
  //       // if (!snapshot) { return; }
  //       //console.log(snapshot.docs);
  //       setTenants(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  //     // const data = await TenantDataService.getAllTenants();
  //   };

  const handleTransactions = async (id) => {
    const data = await TenantDataService.getTenantById(id);
    console.log(data.data());

    navigate(`/transactions/${id}`, { state: { transactions: data.data() } });
  };

  return (
    <div>
      <p>{tenant.roomId}</p>
    </div>
  );
}

function RoomOwnerActions({ updateUnit, generateRent }) {
  function handleUpdateUnit() {
    const newUnit = Number(prompt("Enter New Unit"));

    return updateUnit(newUnit);
  }
  function handleGenerateRent() {
    //const newUnit = Number(prompt("Enter Number Of Months"));

    return generateRent(2);
  }
  return (
    <div>
      <Button onClick={() => handleUpdateUnit()}>Update Unit</Button>
      <Button onClick={() => handleGenerateRent()}>Generate Rent</Button>
    </div>
  );
}

const Room = () => {
  const params = useParams();
  const [room, setRoom] = useState({});
  const [existingTenant, setExistingTenant] = useState();

  const outlet = useOutletContext();

  const [tenantData, setTenantData] = useState({
    dateOfJoining: "",
  });

  // we direct use onSnapshot in useEffect to terminate the eventlistner
  useEffect(() => {
    getByRoomId(params.id);
  }, []);

  const getByRoomId = async () => {
    // onSnapshot(RoomService.ref(), (snapshot) => {
    //   setRoom(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
    const data = await RoomService.getRoomById(params.id);

    const tenantId = data.get("TenantId");

    if (tenantId) {
      const tenant = await TenantDataService.getTenantById(tenantId);
      setExistingTenant({ id: tenant.id, ...tenant.data() });
    }
    setRoom({ id: data.id, ...data.data() });
  };

  function isRoomOwner() {
    return room.Owner === outlet.user.uid;
  }

  function isRoomTenant() {
    return (
      room.Owner !== outlet.user.uid &&
      existingTenant &&
      existingTenant.userId === outlet.user.uid
    );
  }

  function updateUnit(newUnit) {
    const newBalance = increment((newUnit - room.Unit) * 10);

    TenantDataService.updateTenant(existingTenant.id, { Balance: newBalance });
    RoomService.updateRoom(existingTenant.roomId, { Unit: newUnit });
    const dbRef = collection(db, "Transactions");

    const quantity = newUnit - existingTenant.Unit;
    const price = 10;
    const transaction = {
      item: "electricity",
      quantity: quantity,
      type: "Debit",
      price: price,
      amount: quantity * price,
      tenantId: existingTenant.id,
      tenantName: existingTenant.userName,
    };
    TransactionService.addTransaction(dbRef, transaction);
    toast.success(`Unit updated to ${newUnit}`);
  }

  function generateRent(noOfMonths) {
    const newDate = existingTenant.rentPaidTill
      ? existingTenant.rentPaidTill.toDate()
      : existingTenant.dateOfJoining.toDate();

    newDate.setMonth(newDate.getMonth() + noOfMonths);
    console.log(newDate);

    TenantDataService.updateTenant(existingTenant.id, {
      rentPaidTill: newDate,

      //increment function is used to add to existing value (existance.balance)
      balance: increment(room.Rent * noOfMonths),
    });

    const dbRef = collection(db, "Transactions");

    const transaction = {
      item: "rent",
      quantity: noOfMonths,
      type: "Debit",
      price: room.Rent,
      amount: room.Rent * noOfMonths,
      tenantId: existingTenant.id,
      tenantName: existingTenant.userName,
    };

    TransactionService.addTransaction(dbRef, transaction);

    toast.success(`Rent added for ${noOfMonths} months`);
  }

  if (!outlet.user.uid) {
    return <p>Not Authenticated</p>;
  }

  return (
    <Container style={{ marginTop: '8px'}}>
      <Row>
        <Col xs={12} lg={3}>
          <RoomCard room={room} />
          <br/>
          {room.TenantId && <TenantCard tenant={existingTenant} />}
        </Col>
        <Col xs={12} lg={8}>
          {
            // if current user is owner, and room is vacant -> show requests
            // if current user is owner, and room is occupied -> show actions
            // if current user is not owner, not tenant, and room is empty -> show apply now
            // if current user if not owner, not tenant, and room occupied -> show not available
            // if current user if not owner, but is tenant -> show tenant actions
          }
          {isRoomOwner() && !room.TenantId && (
            <ViewRequests roomId={params.id} />
          )}
          
          {!isRoomOwner() && !room.TenantId && <AddNewTenant />}
          {isRoomTenant() && <TenantActions tenant={existingTenant} />}
          { room.TenantId && <div>
            <div>
            <h2 style={{ display: 'inline' }}>Transactions</h2>
            <div style={{ float: 'right', display: 'inline' }}>
            {isRoomOwner() && room.TenantId && (
            <RoomOwnerActions
              updateUnit={(unit) => updateUnit(unit)}
              generateRent={(months) => generateRent(months)}
            />
          )}
          </div>
            </div>
            <Transactions tenantId={room.TenantId} /> </div> }
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
