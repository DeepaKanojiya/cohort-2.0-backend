import React, { useRef, useState } from "react";
import "./../style/createpost.scss";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const [caption, setCaption] = useState("");
  const imageFileRef = useRef();
  const navigate = useNavigate();

  const { loading, handlePostCreate } = usePosts();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = imageFileRef.current.files[0];
    await handlePostCreate(file, caption);
    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>cretring post .....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>create-post</h1>
        <form onSubmit={handleSubmit}>
          <label className="file" htmlFor="imagefile">
            Select File
          </label>
          <input
            ref={imageFileRef}
            hidden
            type="file"
            name="imageFile"
            id="imagefile"
          />
          <input
            onInput={(e) => {
              setCaption(e.target.value);
            }}
            type="text"
            name="caption"
            placeholder="Enter caption"
          />
          <button>Create Post</button>
        </form>
      </div>
    </main>
  );
}

export default CreatePost;
