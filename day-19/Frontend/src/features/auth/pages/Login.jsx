import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../style/form.scss";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handlelogin } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handlelogin(username, password);
    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>Loading..........</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onInput={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggle_auth_form" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
