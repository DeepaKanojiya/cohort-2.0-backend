import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import "./../style/form.scss";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });

    navigate('/')
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            placeholder="Enter username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            placeholder="Enter email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            placeholder="Enter Password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?
          <Link className="toggle_auth_form" to="/login">
            login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
