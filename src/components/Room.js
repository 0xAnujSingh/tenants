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
          <small>RoomNo: </small>
          {room.RoomNo}
        </div>
        <div>
          <small>Rent: </small>
          {room.Rent}
        </div>
        <div>
          <small>Unit: </small>
          {room.Unit}
        </div>
        <div>
          <small>Address: </small>
          {room.Address}
        </div>
        <div>
          <small>Windows: </small>
          {room.Windows}
        </div>
        <div>
          <small>Tenant: </small>
          {room.TenantId}
        </div>

        <div>
          <small>RoomSize: </small>
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
        <p>{tenant.userName}</p>
        <p>Balance: ₹{tenant.balance}</p>
      </Card.Body>
    </Card>
  );
}

function RoomOwnerActions({ room, updateUnit, generateRent }) {
  function handleUpdateUnit() {
    const newUnit = Number(prompt("Enter New Unit"));

    if (newUnit <= room.Unit) {
      alert("Unit cannot be less than or equal to existing unit");
      return;
    }

    return updateUnit(newUnit);
  }
  function handleGenerateRent() {
    //const newUnit = Number(prompt("Enter Number Of Months"));

    return generateRent(1);
  }

  return (
    <div>
      <Button onClick={() => handleUpdateUnit()} color="primary">
        Update Unit
      </Button>
      &nbsp;
      <Button onClick={() => handleGenerateRent()} color="primary">
        Generate Rent
      </Button>
    </div>
  );
}

const Room = () => {
  const params = useParams();
  const [room, setRoom] = useState({});
  const [existingTenant, setExistingTenant] = useState();

  const outlet = useOutletContext();

  // we direct use onSnapshot in useEffect to terminate the eventlistner
  useEffect(() => {
    getByRoomId(params.id);
  }, []);

  const getByRoomId = async (roomId) => {
    const data = await RoomService.getRoomById(roomId);
    const tenantId = data.get("TenantId");

    if (tenantId) {
      const tenant = await TenantDataService.getTenantById(tenantId);

      // tenant.data() will not gave us id i.e why id:tenant.id we set
      setExistingTenant({ id: tenant.id, ...tenant.data() });
    }

    // data.data() will not gave us id i.e why id:data.id we set
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

    TenantDataService.updateTenant(existingTenant.id, { balance: newBalance });
    RoomService.updateRoom(existingTenant.roomId, { Unit: newUnit });
    const dbRef = collection(db, "Transactions");

    const quantity = newUnit - room.Unit;
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
    getByRoomId(params.id);
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
    getByRoomId(params.id);
  }

  function TenantActions({ tenant }) {
    function handlePayBill() {
      const billAmount = Number(prompt("Enter how you pay"));
      if (billAmount <= 0) {
        alert("Balance should not be equal to 0");
        return;
      }
      TenantDataService.updateTenant(tenant.id, {
        balance: increment(-1 * billAmount),
      });
      const dbRef = collection(db, "Transactions");
      const transaction = {
        item: "balance",
        quantity: 1,
        type: "Credit",
        price: billAmount,
        amount: billAmount,
        tenantId: existingTenant.id,
        tenantName: existingTenant.userName,
      };
      TransactionService.addTransaction(dbRef, transaction);
      toast.success(`Payment sucessfull of amount ${tenant.balance}`);
      getByRoomId(params.id);
    }
    function handleLeave() {
      const endDate = new Date(prompt("When you want to leave"));
      let newDate = new Date();
      if (endDate < newDate || "Invalid Date") {
        alert("Please enter a valid Date");
        return;
      }
    }

    return (
      <div>
        <div style={{ float: "right", display: "inline" }}>
          <Button onClick={() => handlePayBill()}>Pay Bill</Button>&nbsp;
          <Button onClick={() => handleLeave()}>Request to leave</Button>
        </div>
      </div>
    );
  }

  if (!outlet.user.uid) {
    return <p>Not Authenticated</p>;
  }

  return (
    <Container style={{ marginTop: "8px" }}>
      <Row>
        <Col xs={12} lg={3}>
          <RoomCard room={room} />
          <br />
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

          {room.TenantId && (
            <div>
              <div>
                <h2 style={{ display: "inline" }}>Transactions</h2>
                <div style={{ float: "right", display: "inline" }}>
                  {isRoomOwner() && room.TenantId && (
                    <RoomOwnerActions
                      room={room}
                      updateUnit={(unit) => updateUnit(unit)}
                      generateRent={(months) => generateRent(months)}
                    />
                  )}
                </div>
              </div>
              <Transactions tenantId={room.TenantId} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
