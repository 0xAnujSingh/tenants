import { getAuth } from "firebase/auth";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header({ user }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand
          href="/rooms"
          style={{
            position: "static",
            height: "100%",
            fontSize: "30px",
          }}
        >
          Tenants
        </Navbar.Brand>
        <Nav className="me-auto" style={{ width: "100%" }}>

          <Nav.Link as={Link} to="/rooms/new">
            New Room
          </Nav.Link>
          <Nav.Link as={Link} to="/rooms">
            View Rooms
          </Nav.Link>
          <span style={{ flexGrow: 1 }}></span>
          {!user && (
            <Nav.Link as={Link} to="/login" style={{ float: "right" }}>
              Login
            </Nav.Link>
          )}
          {user && <Button onClick={() => getAuth().signOut()}>Logout</Button>}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
