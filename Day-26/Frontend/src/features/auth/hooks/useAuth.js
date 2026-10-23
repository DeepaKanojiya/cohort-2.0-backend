import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      const data = await register({ username, email, password });
      setUser(data?.user ?? null);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ username, password }) => {
    setLoading(true);

    try {
      const data = await login({ username, password });
      setUser(data?.user ?? null);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      const data = await logout();
      setUser(null);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);

    try {
      const data = await getMe();
      setUser(data?.user ?? data ?? null);
      return data;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    setUser,
    setLoading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe,
  };
};
