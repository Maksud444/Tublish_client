import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import "./Message.scss";
import { useSocket } from "../../context/SocketContext.jsx";
import moment from "moment";

const Message = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fetchedRef = useRef(false);
  const { socket, onlineUsers } = useSocket();
  
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;

  // Get other user ID from conversation
  const otherUserId = conversation?.sellerId === currentUser?._id 
    ? conversation?.buyerId 
    : conversation?.sellerId;

  // Simple fetch for conversation data
  const fetchConversation = useCallback(async () => {
    if (!id) return;
    
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      setConversation(res.data);
    } catch (err) {
      console.error("Error fetching conversation:", err);
      setError("Could not load conversation details");
    }
  }, [id]);

  // Simple fetch for messages
  const fetchMessages = useCallback(async () => {
    if (!id || fetchedRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching messages for conversation:", id);
      const res = await newRequest.get(`/messages/${id}`);
      console.log("Messages loaded:", res.data.length);
      setMessages(res.data || []);
      fetchedRef.current = true;
      
      // Mark conversation as read
      await newRequest.put(`/conversations/${id}`);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Could not load messages");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Fetch data on mount and id change
  useEffect(() => {
    fetchedRef.current = false;
    setMessages([]);
    
    fetchConversation();
    fetchMessages();
    
    // Cleanup
    return () => {
      fetchedRef.current = false;
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [id, fetchConversation, fetchMessages]);

  // Socket setup for real-time messages
  useEffect(() => {
    if (!socket || !id) return;
    
    console.log("Setting up socket listeners for conversation:", id);
    
    const handleNewMessage = (data) => {
      console.log("Socket message received:", data);
      
      if (data.conversationId === id) {
        // Extract the message data properly
        const messageObj = data.message || data;
        
        setMessages(prev => {
          // Check for duplicates
          const isDuplicate = prev.some(m => 
            m._id === messageObj._id || 
            (m._id.startsWith('temp_') && 
             m.desc === messageObj.desc && 
             m.userId === messageObj.userId)
          );
          
          if (isDuplicate) {
            // Replace temp message with real one if needed
            return prev.map(m => 
              (m._id.startsWith('temp_') && 
               m.desc === messageObj.desc && 
               m.userId === messageObj.userId)
                ? messageObj
                : m
            );
          } else {
            // Add new message
            return [...prev, messageObj];
          }
        });
        
        // Scroll to bottom
        scrollToBottom();
        
        // Mark as read
        if (socket && messageObj.userId !== currentUser?._id) {
          socket.emit("messageRead", {
            conversationId: id,
            senderId: messageObj.userId
          });
        }
      }
    };
    
    const handleTypingIndicator = (data) => {
      console.log("Typing indicator received:", data);
      
      if (data.conversationId === id && data.userId !== currentUser?._id) {
        setIsTyping(data.isTyping);
      }
    };
    
    // Register event listeners
    socket.on("newMessage", handleNewMessage);
    socket.on("getMessage", handleNewMessage);
    socket.on("userTyping", handleTypingIndicator);
    
    // Cleanup listeners
    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("newMessage", handleNewMessage);
      socket.off("getMessage", handleNewMessage);
      socket.off("userTyping", handleTypingIndicator);
    };
  }, [socket, id, currentUser?._id]);

  // Smooth scroll function
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
      }, 100);
    }
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const container = messagesContainerRef.current;
      const isNearBottom = 
        container && 
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      const shouldScroll = 
        messages[messages.length - 1]?.userId === currentUser?._id || 
        isNearBottom;
      
      if (shouldScroll) {
        scrollToBottom();
      }
    }
  }, [messages, scrollToBottom, currentUser?._id]);

  // Handle typing indicator
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (socket && otherUserId) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      socket.emit("typing", {
        conversationId: id,
        receiverId: otherUserId
      });
      
      const timeout = setTimeout(() => {
        socket.emit("stopTyping", {
          conversationId: id,
          receiverId: otherUserId
        });
      }, 2000);
      
      setTypingTimeout(timeout);
    }
  };

  // Send message function
  const sendMessage = async (messageData) => {
    try {
      const res = await newRequest.post(`/messages`, messageData);
      return res.data;
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  };

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const messageData = {
      conversationId: id,
      desc: newMessage,
    };
    
    // Create optimistic message
    const optimisticMessage = {
      _id: `temp_${Date.now()}`,
      conversationId: id,
      userId: currentUser._id,
      desc: newMessage,
      createdAt: new Date().toISOString(),
    };
    
    // Add to UI immediately
    setMessages(prev => [...prev, optimisticMessage]);
    
    // Reset input field
    setNewMessage("");
    
    // Scroll to bottom
    scrollToBottom();
    
    // Send via socket for real-time
    if (socket && socket.connected && otherUserId) {
      socket.emit("sendMessage", {
        ...messageData,
        receiverId: otherUserId,
      });
    }
    
    // Send via API for persistence
    sendMessage(messageData)
      .then(sentMessage => {
        // Replace optimistic message with real one
        setMessages(prev => prev.map(m => 
          (m._id.startsWith('temp_') && m.desc === sentMessage.desc)
            ? sentMessage
            : m
        ));
      })
      .catch(err => {
        // Show error state for optimistic message
        setMessages(prev => prev.map(m => 
          (m._id.startsWith('temp_') && m.desc === messageData.desc)
            ? { ...m, error: true }
            : m
        ));
      });
  };

  // Manual refresh function for testing
  const manualRefresh = () => {
    fetchedRef.current = false;
    fetchMessages();
  };

  // Debug panel component
  const DebugPanel = () => (
    <div style={{
      background: "#f8f8f8", 
      padding: "8px", 
      fontSize: "12px",
      borderBottom: "1px solid #eee"
    }}>
      <p>Socket: {socket?.connected ? "Connected ✅" : "Disconnected ❌"}</p>
      <p>Messages: {messages.length} | Fetched: {fetchedRef.current ? "Yes ✅" : "No ❌"}</p>
      <button onClick={manualRefresh}>Refresh Messages</button>
    </div>
  );

  return (
    <div className="message">
      <div className="container">
        {import.meta.env.DEV && <DebugPanel />}
        
        <div className="chat-header">
          <Link to="/messages" className="back-link">
            <i className="fas fa-arrow-left"></i> Messages
          </Link>
          <div className="user-info">
            <span className="username">{conversation?.username || "User"}</span>
            {onlineUsers[otherUserId] === "online" && 
              <span className="online-badge">Online</span>
            }
          </div>
        </div>
        
        {isLoading && messages.length === 0 ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span>Loading messages...</span>
          </div>
        ) : error ? (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
            <button onClick={manualRefresh}>Try Again</button>
          </div>
        ) : (
          <div className="messages-container" ref={messagesContainerRef}>
            {messages.length === 0 ? (
              <div className="empty-messages">
                <div className="empty-icon">💬</div>
                <p>No messages yet</p>
                <span>Start the conversation!</span>
              </div>
            ) : (
              <>
                {messages.map((m, index) => {
                  const isOwner = m.userId === currentUser?._id;
                  
                  // Calculate if we should show a timestamp
                  const showTimestamp = index === 0 || 
                    (index > 0 && 
                     moment(m.createdAt).diff(moment(messages[index-1].createdAt), 'minutes') > 10);
                     
                  return (
                    <div 
                      key={m._id} 
                      className={`message-wrapper ${isOwner ? "owner" : ""}`}
                    >
                      {!isOwner && (
                        <div className="avatar">
                          <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                        </div>
                      )}
                      
                      <div className="message-content">
                        <div className="message-bubble">
                          <p>{m.desc}</p>
                        </div>
                        
                        {showTimestamp && (
                          <div className="timestamp">
                            {moment(m.createdAt).format('h:mm A')}
                          </div>
                        )}
                        
                        {m._id.startsWith('temp_') && !m.error && (
                          <div className="message-status">
                            <span>Sending...</span>
                          </div>
                        )}
                        
                        {m.error && (
                          <div className="message-status error">
                            <span>Failed to send</span>
                            <button 
                              onClick={() => {
                                // Remove error message and try again
                                setMessages(prev => 
                                  prev.filter(msg => msg._id !== m._id)
                                );
                                setNewMessage(m.desc); // Restore message text
                              }}
                            >
                              Try again
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {isTyping && (
                  <div className="typing-indicator">
                    <div className="typing-animation">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="typing-text">User is typing...</span>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        )}
        
        <div className="message-input">
          <form onSubmit={handleSubmit}>
            <textarea 
              placeholder="Write a message..." 
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
