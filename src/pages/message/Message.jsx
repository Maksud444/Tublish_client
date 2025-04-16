import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import newRequest from "../../utils/newRequest.js";
import "./Message.scss";

const Message = () => {
  const { id } = useParams(); // conversationId
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef();

  // Setup WebSocket connection
  useEffect(() => {
    const socketInstance = io("http://localhost:8800");
    setSocket(socketInstance);

    socketInstance.emit("joinConversation", id);

    socketInstance.on("receiveMessage", (data) => {
      setArrivalMessage(data);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  // Add new incoming message to list
  useEffect(() => {
    if (arrivalMessage && arrivalMessage.conversationId === id) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, id]);

  // Fetch initial messages from DB
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  // Save message to database
  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      conversationId: id,
      userId: currentUser._id,
      desc: e.target[0].value,
    };

    // Emit to socket
    socket.emit("sendMessage", message);

    // Save to DB
    mutation.mutate(message);

    // Optimistic UI
    setMessages((prev) => [...prev, message]);

    e.target[0].value = "";
  };

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; Conversation
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="messages">
            {messages.map((m, i) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={i}
                ref={scrollRef}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
