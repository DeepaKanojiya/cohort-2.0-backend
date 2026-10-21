import React, { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Login, Register } from "./../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handlelogin = async (username, password) => {
    setLoading(true);
    const response = await Login(username, password);
    setUser(response.user);
    setLoading(false);
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const response = await Register(username, email, password);
    setUser(response.user);
    setLoading(false);
  };

  return {
    user,
    loading,
    handlelogin,
    handleRegister,
  };
};
