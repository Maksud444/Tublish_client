import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import Terms from "./pages/terms/Terms";
import Partnerships from "./pages/partnerships/Partnerships";
import Privacy from "./pages/privacy/Privacy";
import Legal from "./pages/legal/Legal";
import newRequest from "./utils/newRequest";
import Categories from "./pages/categories/Categories";
import About from "./pages/about/About";
import Press from "./pages/press/Press";
import IntellectualProperty from "./pages/intellectual-property/IntellectualProperty";
import InvestorRelations from "./pages/investor-relations/InvestorRelations";
import HelpSupport from "./pages/help-support/HelpSupport";
import TrustSafety from "./pages/trust-safety/TrustSafety";
import Selling from "./pages/selling/Selling";
import Buying from "./pages/buying/Buying";
import AdminRoute from "./components/adminRoute/AdminRoute.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminGigs from "./pages/admin/AdminGigs.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminReviews from "./pages/admin/AdminReviews.jsx";
// Create a ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

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
              <ScrollToTop />
              <Navbar />
              <Outlet />
              <Footer />
            </SocketProvider>
          ) : (
            <>
              <ScrollToTop />
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
      path: "/admin",
      element: (
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      ),
      children: [
        {
          path: "",
          element: <AdminDashboard />,
        },
        {
          path: "users",
          element: <AdminUsers />,
        },
        {
          path: "gigs",
          element: <AdminGigs />,
        },
        {
          path: "orders",
          element: <AdminOrders />,
        },
        {
          path: "reviews",
          element: <AdminReviews />,
        },
      ],
    },
    {
      
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        ,
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
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/partnerships",
          element: <Partnerships />,
        },
        {
          path: "/privacy",
          element: <Privacy />,
        },
        {
          path: "/legal",
          element: <Legal />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/press",
          element: <Press />,
        },
        {
          path: "/intellectual-property",
          element: <IntellectualProperty />,
        },
        {
          path: "/investor-relations",
          element: <InvestorRelations />,
        },
        {
          path: "/help-support",
          element: <HelpSupport />,
        },
        {
          path: "/trust-safety",
          element: <TrustSafety />,
        },
        {
          path: "/selling",
          element: <Selling />,
        },
        {
          path: "/buying",
          element: <Buying />,
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
