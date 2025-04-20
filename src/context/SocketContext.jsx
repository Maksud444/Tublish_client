import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// Create a connection singleton outside the component
let socketInstance = null;

// For development, explicitly enable sockets regardless of env variable
const ENABLE_SOCKET = true; // Forcing enabled for troubleshooting

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [connectionAttempt, setConnectionAttempt] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const maxReconnectAttempts = 5;

  // Check if user is logged in
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;
  
  useEffect(() => {
    if (!currentUser) {
      console.log("No current user, not creating socket");
      return;
    }
    
    // If we already have a socket instance and it's connected, use it
    if (socketInstance?.connected) {
      console.log("Using existing socket connection");
      setSocket(socketInstance);
      setConnectionStatus("connected");
      return;
    }
    
    // If we've exceeded reconnection attempts, stop trying
    if (connectionAttempt >= maxReconnectAttempts) {
      console.log("Max reconnection attempts reached");
      setConnectionStatus("failed");
      return;
    }
    
    // Create a new socket connection only if one doesn't exist
    if (!socketInstance) {
      // Debug the token
      const token = localStorage.getItem("token") || currentUser.token || "";
      console.log("Creating new socket connection #" + (connectionAttempt + 1));
      console.log("Token available:", !!token);
      
      // Try to get the user ID for debugging
      console.log("User ID:", currentUser._id);
      
      // Get the socket URL
      const socketUrl = "https://api.tupublish.com"; // Hardcode during troubleshooting
      console.log("Connecting to socket server at:", socketUrl);
      
      setConnectionStatus("connecting");
      
      // Create the socket with connection options - with more verbose logs
      try {
        socketInstance = io(socketUrl, {
          auth: { 
            token,
            userId: currentUser._id // Explicitly send user ID
          },
          withCredentials: true,
          reconnection: true,
          reconnectionAttempts: 3,
          reconnectionDelay: 1000,
          timeout: 10000,
          transports: ['websocket', 'polling'] // Try both transport methods
        });
        
        // Set the socket in state once it's created
        setSocket(socketInstance);
        
        // Set up event handlers for the socket
        socketInstance.on("connect", () => {
          console.log("Socket connected successfully!", socketInstance.id);
          setConnectionStatus("connected");
          setConnectionAttempt(0); // Reset on successful connection
          
          // Join user's personal room
          socketInstance.emit("joinUserRoom", { userId: currentUser._id });
        });
        
        socketInstance.on("connect_error", (err) => {
          console.error("Socket connection error:", err.message);
          setConnectionStatus("error: " + err.message);
          
          // Only increment attempt after connection error
          setConnectionAttempt(prev => prev + 1);
        });
        
        socketInstance.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
          setConnectionStatus("disconnected: " + reason);
          
          // Don't cleanup yet - allow reconnection if not intentional
          if (reason === "io client disconnect" || reason === "io server disconnect") {
            // Only for intentional disconnects, clean up
            socketInstance = null;
            setSocket(null);
          }
        });
        
        socketInstance.on("error", (error) => {
          console.error("Socket error:", error);
          setConnectionStatus("error: " + error);
        });
        
        socketInstance.on("userStatus", (data) => {
          console.log("User status update:", data);
          setOnlineUsers(prev => ({
            ...prev,
            [data.userId]: data.status
          }));
        });
        
        // Debug info when server acknowledges connection
        socketInstance.on("connected", (data) => {
          console.log("Server acknowledged connection:", data);
        });
      } catch (err) {
        console.error("Error creating socket:", err);
        setConnectionStatus("creation error: " + err.message);
        socketInstance = null;
      }
    }
    
    // Clean up function - will be called on unmount
    return () => {
      // Do not disconnect, but remove any component-specific listeners
      // We want to keep the connection between page navigations
    };
  }, [currentUser, connectionAttempt]);
  
  // Log out handler - only call this when a user explicitly logs out
  const disconnect = () => {
    if (socketInstance) {
      console.log("Disconnecting socket on logout");
      socketInstance.disconnect();
      socketInstance = null;
      setSocket(null);
      setConnectionStatus("disconnected");
    }
  };
  
  // Debug function to force reconnection
  const forceReconnect = () => {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
      setSocket(null);
    }
    setConnectionAttempt(0);
  };
  
  return (
    <SocketContext.Provider value={{ 
      socket, 
      onlineUsers,
      connected: !!socketInstance?.connected,
      connectionStatus,
      forceReconnect,
      disconnect
    }}>
      {children}
      {/* Debug div for development */}
      {import.meta.env.DEV && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          background: '#f0f0f0',
          padding: '10px',
          border: '1px solid #ccc',
          fontSize: '12px',
          zIndex: 9999,
          display: connectionStatus !== 'connected' ? 'block' : 'none'
        }}>
          <div>Socket status: {connectionStatus}</div>
          <div>Attempt: {connectionAttempt}/{maxReconnectAttempts}</div>
          <button onClick={forceReconnect}>Reconnect</button>
        </div>
      )}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
}; 