import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import TenantDataService from "./TenantDataService";
import { and, collection, onSnapshot, query, where } from "firebase/firestore";
import { Button, Container, Table } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import RoomService from "./RoomService";
import { db } from "../firebase";

const ViewRequests = ({ roomId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllRequests();
  });

  const getAllRequests = () => {
    const q = query(TenantDataService.ref(), where("roomId", "==", roomId));
    onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const handleAccept = async (request) => {
    console.log(request);
    if (request.state !== "requested") {
      alert("Only applications in requested state can be accepted");
      return;
    }

    await TenantDataService.updateTenant(request.id, { state: "accepted" });
    await RoomService.updateRoom(request.roomId, { TenantId: request.id });
  };

  const handleReject = async (request) => {
    if (request.state === "requested") {
      const newData = Object.assign({}, request);
      const newState = "rejected";
      newData.state = newState;
      await TenantDataService.updateTenant(request.id, newData);
    }
  };

  return (
    <div>
      <Container>
        {roomId}
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>State</th>
              <th>RoomId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((re) => {
              return (
                <tr>
                  <td>{re.id}</td>
                  <td>{re.userName}</td>
                  <td>{re.state}</td>
                  <td>{re.roomId}</td>

                  <td>
                    {re.state === "requested" && (
                      <Button
                        style={{ margin: "0 10px" }}
                        onClick={() => handleAccept(re)}
                      >
                        Accept
                      </Button>
                    )}
                    {re.state === "requested" && (
                      <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleReject(re)}
                      >
                        Reject
                      </Button>
                    )}
                    {re.state === "accepted" && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => console.log()}>
                            Log Units
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => console.log()}>
                            Generate Rent
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => console.log()}>
                            Pay Bill
                          </Dropdown.Item>

                          <Dropdown.Item onClick={(e) => console.log()}>
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item onClick={(e) => console.log()}>
                            View Transactions
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
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

export default ViewRequests;
