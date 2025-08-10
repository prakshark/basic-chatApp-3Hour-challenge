import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function loginUser() {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      }, { withCredentials: true });
      console.log("logged in user:", response.data);
      navigate("/allusers")
    }
  return (
    <>
    <h1>Login</h1>
    username: <input type="text" placeholder="username" onChange={(e) => {
        setUsername(e.target.value);
    }}/>
    <br />
    password: <input type="text" placeholder="password" onChange={(e) => {
        setPassword(e.target.value);
    }} />
    <button onClick={loginUser}>Login</button>
    </>
  )
}

export default Login