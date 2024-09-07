import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://mern-auth-backend-4l8k.onrender.com/api/auth/signup",
        user
      );
      alert(data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
    }
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
