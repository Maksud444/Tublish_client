import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("User state on submit:", user); // Debug log

    let url = "";
    if (file) {
      url = await upload(file);
    }

    const token = localStorage.getItem("authToken");

    try {
      await newRequest.post(
        "/auth/register",
        {
          ...user,
          img: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      alert(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>

          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            value={user.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <label>Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
          />

          <label>Country</label>
          <input
            name="country"
            type="text"
            placeholder="USA"
            value={user.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="right">
          <h1>I want to become a seller</h1>

          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={user.isSeller}
                onChange={handleSeller}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            value={user.phone}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="desc"
            placeholder="A short description of yourself"
            value={user.desc}
            onChange={handleChange}
            rows="6"
          />

          <button type="submit">Register Now</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
