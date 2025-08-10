import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatRoom() {
  const [sender, setSender] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // 💬 Message input

  const receiver = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchSenderAndChat = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/getusername", {
          withCredentials: true,
        });

        const senderUsername = res.data.username;
        setSender(senderUsername);

        const chatRes = await axios.post(
          "http://localhost:5000/api/chats/chatroom",
          {
            user1: senderUsername,
            user2: receiver,
          },
          { withCredentials: true }
        );

        setChatRoom(chatRes.data.chatRoom || chatRes.data.createdChatRoom);
      } catch (err) {
        console.error("Failed to fetch chat:", err);
        setError("Unable to load chat.");
      }
    };

    fetchSenderAndChat();
  }, [receiver]);

  // 📤 Handle message submission
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chats/chats",
        {
          user2: receiver,
          msg: message,
        },
        { withCredentials: true }
      );

      const updatedChat = res.data.updatedChatRoom || res.data.createdChatRoom;
      setChatRoom(updatedChat); // ✅ Update UI with new message
      setMessage(""); // Clear input
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Message not sent.");
    }
  };

  return (
    <div>
      <h2>ChatRoom</h2>
      {sender} <span>↔️</span> {receiver}
      <h3>Chats:</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {chatRoom ? (
        <ul>
          {chatRoom.chat.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : (
        <p>Loading chat...</p>
      )}

      {/* 💬 Message Input */}
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />
        <button onClick={handleSendMessage} style={{ marginLeft: "10px", padding: "8px 12px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
