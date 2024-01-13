import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import RoomService from "./RoomService";
import { onSnapshot } from "firebase/firestore";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const ViewRooms = () => {
  const outlet = useOutletContext();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = () => {
    onSnapshot(RoomService.ref(), (snapshot) => {
      //console.log(snapshot);
      setRooms(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //   if (outlet.user.tenantId !== null) {
      //     alert("Room");
      //   }
    });
  };

  return (
    <div>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>RoomNo</th>
              <th>Rent</th>
              <th>Unit</th>
              <th>Address</th>
              <th>Windows</th>
              <th>RoomSize</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((ro) => {
              return (
                <tr key={ro.id}>
                  <td>{ro.RoomNo}</td>
                  <td>{ro.Rent}</td>
                  <td>{ro.Unit}</td>
                  <td>{ro.Address}</td>
                  <td>{ro.Windows}</td>
                  <td>{ro.RoomSize}</td>
                  <td>
                    {outlet.user.uid === ro.Owner ? <Link to={`/rooms/${ro.id}/requests`}>View Requests</Link> : <Link to={`/rooms/${ro.id}/tenant`}>Apply</Link>} 
                    
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

export default ViewRooms;
