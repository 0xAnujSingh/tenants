import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import RoomService from "./RoomService";
import { onSnapshot } from "firebase/firestore";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { RoomCard } from "./Room";

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
        {rooms.map((room) => (
          <Link style={{ textDecoration: "none" }} to={`/rooms/${room.id}`}>
            <RoomCard room={room} />
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default ViewRooms;
