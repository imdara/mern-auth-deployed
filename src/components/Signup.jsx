import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const signupHandler = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="signup">
      <Form onSubmit={signupHandler} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
}
