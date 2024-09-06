import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import NavigationDrawer from "./components/NavigationDrawer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const token = cookies.get("token");
      try {
        const { data } = await axios.get(
          "https://mern-auth-backend-4l8k.onrender.com/api/auth",
          {
            headers: { Authorization: token },
          }
        );
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavigationDrawer />
          {user ? <h2>Welcome {user}</h2> : <h2>Please Login to continue</h2>}
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <NavigationDrawer />
          <Login />
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
