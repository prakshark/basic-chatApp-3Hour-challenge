import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AllUsers() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from backend
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/allusers", {
          withCredentials: true
        });

        console.log("API response:", response.data);

        // ✅ Access the array inside the `data` key
        if (Array.isArray(response.data.data)) {
          setAllUsers(response.data.data);
        } else {
          console.warn("Unexpected format:", response.data);
          setAllUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    }
  };

  const handleChatRoomCreation = async (event) => {
    // const sender = await axios.get("http://localhost:5000/api/auth/getusername",  {credentials: true});
    // receiver is the username that is clicked on in the list
    const receiver = event.target.innerText;
    navigate(`/chatroom/${receiver}`);
  }

  return (
    <>
      <h1>All Users</h1>

      <button onClick={handleLogout}>Logout</button>

      <h3>All users: Click on any of them to start chatting</h3>

      {loading ? (
        <p>Loading...</p>
      ) : allUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {allUsers.map((user) => (
              <li key={user._id} onClick={handleChatRoomCreation}>{user.username}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default AllUsers;
