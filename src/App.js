import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://zdhttw-5000.csb.app/api/users";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post(`${BASE_URL}/login`, {
          email: form.email,
          password: form.password,
        });
        setMessage(res.data.message);
      } else {
        const res = await axios.post(`${BASE_URL}/register`, form);
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        )}

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <br />

      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>

      <h3>{message}</h3>
    </div>
  );
}

export default App;
