import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function NavigationDrawer({ email, setEmail }) {
  const navigate = useNavigate();
  const logoutHandler = () => {
    cookies.remove("token");
    setEmail(null);
    navigate("/login");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>MERN-Auth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            {email ? (
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            ) : (
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
