import React from "react";
import "../../shared/navbar.scss";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav">
        <p>insta</p>
        <button
          onClick={() => {
            navigate("/create-post");
          }}
          className="nav-button"
        >
          New Post
        </button>
      </div>
    </div>
  );
}

export default NavBar;
