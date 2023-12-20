import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            href="home"
            style={{
              position: "static",
              height: "100%",
              fontSize: "30px",
            }}
          >
            Tenant
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/AboutUs">About_Us</Nav.Link>
            <Nav.Link as={Link} to="/Postdata">New_Tenant</Nav.Link>
            <Nav.Link as={Link} to="/getAll">Get_All</Nav.Link>
            <Nav.Link as={Link} to="/login" style={{marginLeft: "700px" }}>
              Login
            </Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
