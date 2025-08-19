import { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import "./Chatbox.css";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
const Chatbox = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      return null;
    }

    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  return (
    <>
      {selectedUser ? (
        <div className='chat-box'>
          <div className='chat-user'>
            <img
              src={selectedUser.profilePic || assets.profile_img}
              alt='profile-img'
            />
            <p>
              {selectedUser.fullname}

              {onlineUsers.includes(selectedUser._id) ? (
                <img
                  src={assets.green_dot}
                  alt='online-indicator'
                  className='dot'
                />
              ) : null}
            </p>
            <img src={assets.help_icon} alt='help' />
          </div>

          <div className='chat-msg'>
            {messages.length > 0 &&
              messages.map((msg, i) =>
                msg.senderId === authUser._id ? (
                  <div className='s-msg' key={msg._id}>
                    {msg.text ? (
                      <p className='msg'>{msg.text}</p>
                    ) : msg.image ? (
                      <img src={msg.image} alt='image' className='msg-img' />
                    ) : null}
                    <div>
                      <img
                        src={authUser.profilePic || assets.avatar_icon}
                        alt='profile-img'
                      />
                      <p>
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='r-msg' key={msg._id}>
                    {msg.text ? (
                      <p className='msg'>{msg.text}</p>
                    ) : msg.image ? (
                      <img src={msg.image} alt='image' className='msg-img' />
                    ) : null}
                    <div>
                      <img
                        src={selectedUser.profilePic || assets.avatar_icon}
                        alt='profile-img'
                      />
                      <p>
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                )
              )}
          </div>

          <div className='chat-input'>
            <input
              type='text'
              placeholder='Send a message'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSendMessage(e) : null
              }
            />
            <input
              onChange={(e) => handleSendImage(e)}
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              hidden
            />
            <label htmlFor='image'>
              <img src={assets.gallery_icon} alt='Upload image' />
            </label>
            <img
              src={assets.send_button}
              alt='Send'
              onClick={(e) => handleSendMessage(e)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Chatbox;
