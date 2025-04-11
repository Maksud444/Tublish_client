import axios from "axios";

const upload = async (file) => {
  if (!file) {
    console.error("No file provided for upload.");
    return;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "tupublish");
  data.append("cloud_name", "dgpjnvlp3");

  // const uploadUrl = import.meta.env.;
  // console.log("Upload URL:", uploadUrl); // Debugging the upload URL

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dgpjnvlp3/image/upload", data);
    const { url } = res.data;
    return url;
  } catch (err) {
    console.error("File upload error:", err.response?.data || err.message);
    throw err;
  }
};

export default upload;