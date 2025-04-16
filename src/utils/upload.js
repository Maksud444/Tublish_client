// utils/upload.js
import axios from "axios";

const upload = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=7df6d52cb9db492d1eba57dc97f8493e",
      formData,
      {
        
        withCredentials: false,
      }
    );
    return res.data.data.url;
  } catch (err) {
    console.error("ImgBB Upload Error:", err);
    return "";
  }
};

export default upload;
