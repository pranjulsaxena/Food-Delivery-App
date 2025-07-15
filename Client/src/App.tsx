import Login from "./auth/login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/resetPassword";
import VerifyEmail from "./auth/verifyEmail";
import Layout from "./Layout";
import HeroSection from "./components/HeroSection";
import Profile from "./components/profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/orders";
import Success from "./components/Success";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verifyemail" replace />;
  }
  return children;
};

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  if (!user?.admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const IsAuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const approuter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      { path: "/profile", element: <Profile /> },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      { path: "/restaurant/:id", element: <RestaurantDetails /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "admin/restaurants",
        element: (
          <IsAdmin>
            <Restaurant />
          </IsAdmin>
        ),
      },
      {
        path: "admin/Menus",
        element: (
          <IsAdmin>
            <AddMenu />
          </IsAdmin>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <IsAdmin>
            <Orders />
          </IsAdmin>
        ),
      },
      {
        path: "/orders/status",
        element: <Success />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <IsAuthenticatedUser>
        <Login />
      </IsAuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <IsAuthenticatedUser>
        <Signup />
      </IsAuthenticatedUser>
    ),
  },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  {
    path: "/resetpassword/:resettoken",
    element: <ResetPassword />,
  },
  { path: "/verifyemail", element: <VerifyEmail /> },
]);


function App() {
  const { isCheckingAuth, checkAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loading />;
  return (
    <main>
      <RouterProvider router={approuter} />
    </main>
  );
}

export default App;
