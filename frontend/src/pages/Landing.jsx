import { useNavigate  } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

  return (
    <>
      <h1>Chat App</h1>
      <br />
      <button onClick={() => {
        navigate("/login")
      }}>Login</button>
      <br />
      <button onClick={() => {
        navigate("/register")
      }}>Register</button>
    </>
  );
}

export default Landing;
