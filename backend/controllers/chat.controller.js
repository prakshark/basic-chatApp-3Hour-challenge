import Chat from "../models/chat.model.js";

export async function getChats(req, res) {
  try {
    let { user1, user2 } = req.body;

    if (!user1 || !user2) {
      return res.status(400).json({
        status: 400,
        message: "User1 and User2 are required to get chats"
      });
    }

    // Sort usernames to ensure consistent order
    [user1, user2] = [user1, user2].sort();

    const room = await Chat.findOne({ user1, user2 });

    if (!room) {
      const newRoom = new Chat({
        user1,
        user2,
        chat: []
      });
      await newRoom.save();
      return res.status(201).json({
        status: 201,
        createdChatRoom: newRoom
      });
    }

    return res.status(200).json({
      status: 200,
      chatRoom: room
    });
  } catch (error) {
    console.error("Error in getChats:", error);
    return res.status(500).json({
      status: 500,
      message: "Server error in getChats",
      error: error.message
    });
  }
}

export async function addChat(req, res) {
  try {
    const { user2, msg } = req.body;
    const user1 = req.user.username;

    if (!user2 || !msg) {
      return res.status(400).json({
        status: 400,
        message: "Both users and a message are required to add chat"
      });
    }

    // Sort usernames to ensure consistent order
    const [u1, u2] = [user1, user2].sort();

    let room = await Chat.findOne({ user1: u1, user2: u2 });
    if (room) {
      room.chat.push(msg);
      await room.save();
      return res.status(200).json({
        status: 200,
        updatedChatRoom: room
      });
    } else {
      const newRoom = new Chat({
        user1: u1,
        user2: u2,
        chat: [msg]
      });
      await newRoom.save();
      return res.status(201).json({
        status: 201,
        createdChatRoom: newRoom
      });
    }
  } catch (error) {
    console.error("Error in addChat:", error);
    return res.status(500).json({
      status: 500,
      message: "Server error in addChat",
      error: error.message
    });
  }
}
