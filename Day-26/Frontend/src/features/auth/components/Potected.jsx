import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Potected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <main aria-live="polite">Checking your session...</main>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default Potected;
