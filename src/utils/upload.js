import axios from "axios";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; 
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });

const upload = async (file) => {
  if (!file) {
    console.error("No file provided for upload.");
    return;
  }

  try {
    const base64Image = await toBase64(file);

    const apiKey = "7df6d52cb9db492d1eba57dc97f8493e"; 

    const body = new URLSearchParams();
    body.append("key", apiKey);
    body.append("image", base64Image);

    const res = await axios.post("https://api.imgbb.com/1/upload", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const imageUrl = res.data.data.url;
    return imageUrl;
  } catch (err) {
    console.error("File upload error:", err.response?.data || err.message);
    throw err;
  }
};

export default upload;
