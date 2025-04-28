import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer.js";
import upload from "../../utils/upload.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { categoriesData } from "../../data/categories";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleCategoryChange = (e) => {
    const [category, subcategory] = e.target.value.split(" - ");
    dispatch({
      type: "SET_CATEGORY",
      payload: { category, subcategory: subcategory.toLowerCase().replace(/\s+/g, "-") },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log("Upload Error:", err);
      setUploading(false);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
    onError: (error) => {
      console.log("Mutation Error:", error.response?.data || error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.cover) {
      await handleUpload();
    }

    if (!state.cover) {
      alert("Please upload a cover image before submitting.");
      return;
    }

    if (!state.subcategory) {
      alert("Please select both a category and subcategory.");
      return;
    }

    mutation.mutate(state, {
      onSuccess: () => {
        navigate("/mygigs");
      },
    });
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />

            <label>Category</label>
            <select 
              name="category" 
              onChange={handleCategoryChange}
              value={`${state.cat} - ${state.subcategory}`}
            >
              <option value="">Select a category and subcategory</option>
              {categoriesData.map((category) => (
                <optgroup key={category.name} label={category.name}>
                  {category.subcategories.map((subcategory) => (
                    <option 
                      key={`${category.name}-${subcategory}`}
                      value={`${category.name} - ${subcategory}`}
                    >
                      {subcategory}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />

                <label>Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />

                <div className="preview">
                  {Array.from(files).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={handleUpload} 
                className="upload-btn"
                disabled={uploading || !singleFile}
              >
                {uploading ? <Loader size="small" text="" /> : "Upload"}
              </button>
            </div>

            <label>Description</label>
            <textarea
              name="desc"
              placeholder="Brief description to introduce your service"
              rows="16"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="details">
            <label>Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label>Short Description</label>
            <textarea
              name="shortDesc"
              placeholder="Short description of your service"
              rows="10"
              onChange={handleChange}
            ></textarea>

            <label>Delivery Time (e.g. 3 days)</label>
            <input 
              type="number" 
              name="deliveryTime" 
              onChange={handleChange} 
              min="1"
            />

            <label>Revision Number</label>
            <input 
              type="number" 
              name="revisionNumber" 
              onChange={handleChange} 
              min="0"
            />

            <label>Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" required />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label>Price</label>
            <input 
              type="number" 
              name="price" 
              onChange={handleChange} 
              min="1"
            />
            
            <button 
              onClick={handleSubmit} 
              className="create-btn"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? <Loader size="small" text="" /> : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
