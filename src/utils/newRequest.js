import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://api.tupublish.com/api", 
  // baseURL: "http://localhost:3000/api",
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

// Add a response interceptor to handle expired tokens
newRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to an expired token (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Clear user data from localStorage
      localStorage.removeItem("currentUser");
      
      // Redirect to login page if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default newRequest;
