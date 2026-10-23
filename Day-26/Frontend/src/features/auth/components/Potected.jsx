import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Potected({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (!loading && !user) {
    navigate("/login");
  }

  return children;
}

export default Potected;
