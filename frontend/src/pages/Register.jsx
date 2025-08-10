import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  async function registerUser() {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password
      }, { withCredentials: true });
      console.log("User registered:", response.data);
      navigate("/allusers")
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <>
      <h1>Register User</h1>
      <br />
      Username: 
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      Password: 
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={registerUser}>Register</button>
    </>
  );
}

export default Register;
