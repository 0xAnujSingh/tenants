import React, { useEffect, useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import TenantDataService from "./TenantDataService";
import { useNavigate, useOutletContext } from "react-router-dom";
import { onSnapshot, query, where } from "firebase/firestore";
import TransactionService from "./TransactionService";
import { db } from "../firebase";

import { collection } from "firebase/firestore";

const ViewTenants = () => {
  const [tenants, setTenants] = useState([]);

  const navigate = useNavigate();
  const outlet = useOutletContext();
  //const Unit = (tenant.PresentUnit - tenant.PreviousUnit) * 9;

  useEffect(() => {
    getTenant();
  }, []);

  const getTenant = async () => {
    const q = query(
      TenantDataService.ref(),
      where("Owner", "==", outlet.user.uid)
    );
    onSnapshot(q, (snapshot) => {
      // if (!snapshot) { return; }
      //console.log(snapshot.docs);
      setTenants(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    // const data = await TenantDataService.getAllTenants();
  };

  const getTenantById = async (id) => {
    const data = await TenantDataService.getTenantById(id);
    console.log(data.data());

    navigate(`/update/${id}`, { state: { tenant: data.data() } });
  };

  const handleDelete = async (id) => {
    await TenantDataService.deleteTenant(id);
    getTenant();
  };

  const getBalance = async (id) => {
    getTenantById(id);
    //const data = await TenantDataService.getTenantById(id);
    navigate(`/balance/${id}`);
  };

  function handleUpdateUnit(tenant) {
    // This is updateUnit button here we want to update our new unit to the old unit(or replace our old unit with new unit)

    const newUnit = Number(prompt("Enter New Unit"));
    //alert(newUnit)
    // (newUnit - Unit) *10 + Balance
    const newBalance = (newUnit - tenant.Unit) * 10 + tenant.Balance;

    // newData = tenant ..ye humne is liye kara hai kyu hume kuch properties he update karna hai(jaise Unit) to
    // humne kya kara tenant ke ander jo bhi data tha usko tenant ke ander dal diya taki jab bhi hum change kare
    // to direct tenant(useState) me na hote hui vo sirf locally newData me hi ho.
    const newData = Object.assign({}, tenant);

    delete newData.id; // delete humne isliye kari taki id same hi rahe or ched chad na ho
    newData.Balance = newBalance;
    newData.Unit = newUnit;
    console.log(newData);
    TenantDataService.updateTenant(tenant.id, newData);

    const dbRef = collection(db, "Transactions");

    // jaise hi balance update ho vaise hi ek transaction banana chaiye or transaction ke ander
    // amount, item, quantity, type, id

    const quantity = newUnit - tenant.Unit;
    const price = 10;
    const transaction = {
      item: "electricity",
      quantity: quantity,
      type: "Debit",
      price: price,
      amount: quantity * price,
      tenantId: tenant.id,
      tenantName: tenant.name,
    };
    TransactionService.addTransaction(dbRef, transaction);
  }

  function handleDateupdate(tenant) {
    const newDate = tenant.RentPaidTill.toDate();
    newDate.setMonth(newDate.getMonth() + 1);
    console.log(newDate);

    const newData = Object.assign({}, tenant);
    newData.RentPaidTill = newDate;
    newData.Balance = tenant.Rent + tenant.Balance;
    TenantDataService.updateTenant(tenant.id, newData);

    const dbRef = collection(db, "Transactions");

    const transaction = {
      item: "rent",
      quantity: 1,
      type: "Debit",
      price: tenant.Rent,
      amount: tenant.Rent,
      tenantId: tenant.id,
      tenantName: tenant.Name,
    };

    TransactionService.addTransaction(dbRef, transaction);
  }

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
  const handleTransactions = async (id) => {
    const data = await TenantDataService.getTenantById(id);
    console.log(data.data());

    navigate(`/transactions/${id}`, { state: { transactions: data.data() } });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* <pre>{JSON.stringify(tenant, undefined, 2)}</pre> */}
      <Container>
        <p style={{ fontSize: "32px" }}>Welcome! {outlet.user.displayName}</p>
        <Table
          striped
          bordered
          hover
          id="RoomNo"
          style={{
            marginTop: "2%",
          }}
        >
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>RoomNo.</th>
              <th>Name</th>
              <th>Joined From</th>
              <th>RentPaidTill</th>
              <th>
                Rent<small style={{ color: "rgba(0,0,0,0.5)" }}>/month</small>
              </th>
              <th>Unit</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((te) => {
              return (
                <tr
                  key={te.RoomNo}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                    width: "65%",
                    height: "65%",
                  }}
                >
                  <td>{te.RoomNo}</td>

                  <td>{te.Name}</td>

                  <td>{te.DateOfJoining.toDate().toDateString()}</td>
                  <td>{te.RentPaidTill.toDate().toDateString()}</td>

                  <td>₹{te.Rent}</td>

                  <td>{te.Unit}</td>

                  <td>₹{te.Balance}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Actions
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleUpdateUnit(te)}>
                          Log Units
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDateupdate(te)}>
                          Generate Rent
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handlePaybill(te)}>
                          Pay Bill
                        </Dropdown.Item>

                        <Dropdown.Item onClick={(e) => handleDelete(te.id)}>
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => handleTransactions(te.id)}
                        >
                          View Transactions
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    ></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ViewTenants;
