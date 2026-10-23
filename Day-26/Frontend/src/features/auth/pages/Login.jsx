import React, { useContext, useState } from "react";
import "../style/form.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../auth.context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({ username, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.......</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="register-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            placeholder="Enter your username"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormGroup
            placeholder="Enter Password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Login</button>
        </form>
        <p>
          Don't have an account?
          <Link className="toggle_auth_form" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
