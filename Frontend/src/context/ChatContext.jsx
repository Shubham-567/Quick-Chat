import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  const [chatLoading, setChatLoading] = useState(false);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  const { socket, axios } = useContext(AuthContext);

  // function to get all users for sidebar
  const getUsers = async () => {
    try {
      setSidebarLoading(true);
      const { data } = await axios.get("/api/messages/users");

      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
        setLastMessages(data.lastMessages);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSidebarLoading(false);
    }
  };

  // function to get messages for selected user
  const getMessages = async (userId) => {
    try {
      setChatLoading(true); // loading for initial messages

      const { data } = await axios.get(`/api/messages/${userId}`);

      if (data.success) {
        setMessages(data.messages);
        console.log(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setChatLoading(false);
    }
  };

  // function to send a message to selected user
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        setMessages((prevMessages) => [data.newMessage, ...prevMessages]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to subscribe to messages for selected user
  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        axios.put(`/api/messages/mark/${newMessage._id}`);

        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: 0, // all msg from this user are seen
        }));
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });

    // set chat loading
    socket.on("connect", () => {
      setChatLoading(false); // set chat loading to false when socket is connected
    });

    socket.on("disconnect", () => {
      setChatLoading(true); // set chat loading to true when socket is disconnected
    });
  };

  // function to unsubscribe from message
  const unsubscribeFromMessages = () => {
    if (socket) {
      socket.off("newMessage");
    }
  };

  useEffect(() => {
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    unseenMessages,
    lastMessages,
    chatLoading,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
