import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import NavigationDrawer from "./components/NavigationDrawer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
function App() {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    const getEmail = async () => {
      const token = cookies.get("token");
      try {
        const { data } = await axios.get(
          "https://mern-auth-backend-4l8k.onrender.com/api/auth",
          {
            headers: { Authorization: token },
          }
        );
        setEmail(data);
      } catch (err) {
        console.error(err);
      }
    };
    getEmail();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavigationDrawer email={email} setEmail={setEmail} />
          {email ? <h2>Welcome {email}</h2> : <h2>Please Login to continue</h2>}
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <NavigationDrawer email={email} setEmail={setEmail} />
          <Login email={email} setEmail={setEmail} />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <NavigationDrawer />
          <Signup />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
