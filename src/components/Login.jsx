import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default function Login({ email, setEmail }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://mern-auth-backend-4l8k.onrender.com/api/auth/login",
        user
      );
      if (data.token)
        cookies.set("token", `Bearer ${data.token}`, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24,
        });
      alert(`Welcome ${data.email}`);
      setEmail(data.email);
      navigate("/");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div className="login">
      {email ? (
        <h2>You're already logged in</h2>
      ) : (
        <Form onSubmit={loginHandler} className="form">
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
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      )}
    </div>
  );
}
