import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Gigs from "./pages/gigs/Gigs.jsx";
import Gig from "./pages/gig/Gig.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Add from "./pages/add/Add.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Messages from "./pages/messages/Messages.jsx";
import Message from "./pages/message/Message.jsx";
import MyGigs from "./pages/myGigs/MyGigs.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import PrivateRoute from "./components/privateRoute/privateRoute.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/pay/Pay.jsx";
import Success from "./pages/success/Success.jsx";
import GigCard from "./components/gigCard/GigCard.jsx";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60,
        cacheTime: 1000 * 60 * 10,
        retry: 1,
      },
    },
  });

  const Layout = () => {
    // Get the current user
    const currentUser = localStorage.getItem("currentUser") 
      ? JSON.parse(localStorage.getItem("currentUser")) 
      : null;
    
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          {/* Only initialize socket provider if user is logged in */}
          {currentUser ? (
            <SocketProvider>
              <Navbar />
              <Outlet />
              <Footer />
            </SocketProvider>
          ) : (
            <>
              <Navbar />
              <Outlet />
              <Footer />
            </>
          )}
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
   
      </QueryClientProvider>
    </>
  );
}

export default App;
