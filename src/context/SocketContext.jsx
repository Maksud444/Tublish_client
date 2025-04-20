import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
// import { jwtDecode } from "jwt-decode";

const SocketContext = createContext(null);

// Create a connection singleton outside the component
let socketInstance = null;

// For development, explicitly enable sockets regardless of env variable
const ENABLE_SOCKET = true; // Forcing enabled for troubleshooting

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser")).token
      : null;

    // Don't attempt to connect without a token
    if (!token) {
      setIsConnecting(false);
      return;
    }

    // // Check if token is expired
    // try {
    //   const decodedToken = jwtDecode(token);
    //   const currentTime = Date.now() / 1000;
      
    //   if (decodedToken.exp < currentTime) {
    //     console.log("Token expired, not connecting socket");
    //     setIsConnecting(false);
    //     setError("Authentication expired");
    //     return;
    //   }
    // } catch (err) {
    //   console.error("Invalid token:", err);
    //   setIsConnecting(false);
    //   setError("Invalid authentication");
    //   return;
    // }

    // Create socket connection
    console.log("Initializing socket connection...");
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://api.tupublish.com";
    
    const newSocket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      transports: ["websocket"],
    });

    // Socket event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
      setIsConnecting(false);
      setError(null);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Failed to connect to chat server");
      setIsConnecting(false);
    });

    newSocket.on("userStatus", (data) => {
      console.log("User status update:", data);
      setOnlineUsers(prev => ({
        ...prev,
        [data.userId]: data.status
      }));
    });

    // Set the socket in state
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up socket connection");
      newSocket.disconnect();
    };
  }, []);

  // Provide a default empty object for context value to prevent null errors
  const contextValue = {
    socket,
    onlineUsers: onlineUsers || {},
    isConnecting,
    error
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}; 