import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TransactionService from "./TransactionService";

import { onSnapshot, query, where } from "firebase/firestore";

const Transactions = () => {
  const params = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransaction();
  }, []);

  const getAllTransaction = async () => {
    const collectionRef = TransactionService.ref();
    const q = query(collectionRef, where("tenantId", "==", params.id));

    onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs);
      setTransactions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      
    });
  };

  return (
    <div>
      Transactions ......{params.id}
      <div>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Name</th>

                <th>Type</th>
                <th>Quantity</th>
                <th>Item</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans) => {
                return (
                  <tr>
                    <td>{trans.tenantName}</td>
                    <td>{trans.type}</td>
                    <td>{trans.quantity}</td>
                    <td>{trans.item}</td>
                    <td>{trans.date.toDate().toDateString()}</td>
                    <td>{trans.amount}</td>
                    <td>{trans.price}</td>
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
