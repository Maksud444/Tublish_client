import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import "./Messages.scss";
import moment from "moment";
import { useSocket } from "../../context/SocketContext.jsx";
import Loader from "../../components/loader/Loader";

const Messages = () => {
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;

  const queryClient = useQueryClient();
  const { socket, onlineUsers } = useSocket();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // Listen for new messages to invalidate conversations query
  useEffect(() => {
    if (socket) {
      console.log("Setting up socket listeners for conversations list");
      
      const handleNewMessage = (data) => {
        console.log("New message received, refreshing conversations");
        queryClient.invalidateQueries(["conversations"]);
      };
      
      const handleUserStatus = (data) => {
        console.log("User status update:", data);
        // This is handled by the SocketContext
      };
      
      socket.on("newMessage", handleNewMessage);
      socket.on("userStatus", handleUserStatus);
      
      return () => {
        console.log("Cleaning up socket listeners for conversations");
        socket.off("newMessage", handleNewMessage);
        socket.off("userStatus", handleUserStatus);
      };
    }
  }, [socket, queryClient]);

  const handleRead = (id) => {
    mutation.mutate(id);
    
    // Also emit socket event if applicable
    if (socket && data) {
      const conversation = data.find(c => c.id === id);
      if (conversation) {
        const senderId = currentUser.isSeller 
          ? conversation.buyerId 
          : conversation.sellerId;
          
        socket.emit("messageRead", {
          conversationId: id,
          senderId
        });
      }
    }
  };

  // Add at the top of your component in development
  const debug = () => {
    if (import.meta.env.DEV) {
      return (
        <div style={{background: "#f0f0f0", padding: "10px", margin: "10px 0"}}>
          <p>Socket connected: {socket?.connected ? "✅" : "❌"}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="messages">
      {import.meta.env.DEV && debug()}
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        
        {isLoading ? (
          <Loader text="Loading your messages..." />
        ) : error ? (
          <div className="error">Error loading messages: {error.message}</div>
        ) : data.length === 0 ? (
          <div className="no-messages">
            <p>You don't have any messages yet.</p>
          </div>
        ) : (
          <div className="messages-list">
            {data.map((c) => {
              const otherUserId = currentUser.isSeller ? c.buyerId : c.sellerId;
              // Get username from conversation if available
              const username = c.username || otherUserId.substring(0, 8) + "...";
              const isOnline = onlineUsers[otherUserId] === "online";
              const isUnread = (currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer);
              
              return (
                <div className={`message-item ${isUnread ? "unread" : ""}`} key={c.id}>
                  <div className="user-info">
                    <span className="username">{username}</span>
                    <span className={`status-indicator ${isOnline ? "online" : "offline"}`}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                  
                  <div className="message-preview">
                    <Link to={`/message/${c.id}`} className="message-link">
                      {c?.lastMessage ? c.lastMessage.substring(0, 100) + (c.lastMessage.length > 100 ? "..." : "") : "Start conversation"}
                    </Link>
                  </div>
                  
                  <div className="message-meta">
                    <span className="time">{moment(c.updatedAt).fromNow()}</span>
                    {isUnread && (
                      <button 
                        className="mark-read-btn" 
                        onClick={() => handleRead(c.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
