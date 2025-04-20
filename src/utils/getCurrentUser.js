const getCurrentUser = () => {
  return  localStorage.getItem("currentUser") 
  ? JSON.parse(localStorage.getItem("currentUser")).user 
  : null;
};

export default getCurrentUser