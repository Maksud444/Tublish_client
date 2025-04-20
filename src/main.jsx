import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import axios from 'axios'; 
import { SocketProvider } from "./context/SocketContext";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.tupublish.com/api";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </QueryClientProvider>
);