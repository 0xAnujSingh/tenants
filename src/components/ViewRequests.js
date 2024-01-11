import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TenantDataService from "./TenantDataService";
import { onSnapshot } from "firebase/firestore";
import { Button, Container, Table } from "reactstrap";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  //console.log(requests);

  useEffect(() => {
    getAllRequests();
  });

  const getAllRequests = () => {
    onSnapshot(TenantDataService.ref(), (snapshot) => {
      setRequests(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const handleAccept = async (request) => {
    if ((requests.state = "requested")) {
      const newData = Object.assign({}, requests);
      const newState = "accept";
      newData.state = newState;
      const data = TenantDataService.updateTenant(request.id, newData);
    }
  };
  const handleReject = async (request) => {
    if ((requests.state = "requested")) {
      const newData = Object.assign({}, requests);
      const newState = "reject";
      newData.state = newState;
      await TenantDataService.updateTenant(request.id, newData);
    }
  };
  return (
    <div>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>State</th>
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

                  <td>
                    <Button
                      style={{ margin: "0 10px" }}
                      onClick={() => handleAccept(re)}
                    >
                      Accept
                    </Button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleReject(re)}
                    >
                      Reject
                    </button>
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
