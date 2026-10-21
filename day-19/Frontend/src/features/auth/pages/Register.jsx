import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await handleRegister(username, email, password);
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
      <div className="form-container">
        <h1>Register</h1>
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
            type="email"
            name="email"
            placeholder="Enter your email"
            onInput={(e) => {
              setEmail(e.target.value);
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
          <button>Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggle_auth_form" to="/login">
            login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
