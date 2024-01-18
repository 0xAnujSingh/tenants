import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TransactionService from "./TransactionService";

import { onSnapshot, orderBy, query, where } from "firebase/firestore";

const Transactions = ({ tenantId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransaction();
  }, []);

  const getAllTransaction = async () => {
    const collectionRef = TransactionService.ref();
    const q = query(
      collectionRef,
      where("tenantId", "==", tenantId),
      orderBy("date", "desc")
    );

    onSnapshot(q, (snapshot) => {
      //console.log(snapshot.docs);
      setTransactions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  return (
    <div>
      <div>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Quantity</th>
                <th>Item</th>
                <th>Date</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans) => {
                return (
                  <tr key={trans.id}>
                    <td>{trans.type}</td>
                    <td>{trans.quantity}</td>
                    <td>{trans.item}</td>
                    <td>{trans.date.toDate().toDateString()}</td>
                    <td>₹{trans.price}</td>
                    <td>₹{trans.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default Transactions;
