import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://testingproject-bay.vercel.app/api", 
  // baseURL: "https://testingproject-bay.vercel.app/api", 
  withCredentials: true, // Include cookies if needed
});

// Add the token to the Authorization header
newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token); // Debugging the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default newRequest;
