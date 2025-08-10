import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllUsers from "./pages/AllUsers";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/chatroom/:username" element={<ChatRoom />} />
        </Routes>
    </Router>
  )
}

export default App
