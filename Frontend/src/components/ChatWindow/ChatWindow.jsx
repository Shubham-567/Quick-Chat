import { useContext, useEffect, useRef, useState } from "react";
import assets from "../../assets/assets";
import "./ChatWindow.css";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft, Info, Paperclip, Send } from "lucide-react";
import DetailsPanel from "../DetailsPanel/DetailsPanel";
import Welcome from "../Welcome/Welcome";
import ImageModal from "../ImageModal/ImageModal";

const ChatWindow = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const chatContainerRef = useRef(null);

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

    setInput(""); // remove text from input box when selected user changes
  }, [selectedUser]);

  // scroll to new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight -
        chatContainerRef.current.clientHeight;
    }
  }, [messages]);

  if (!selectedUser) {
    return <Welcome />;
  }

  return (
    <section className='flex items-start justify-end w-full'>
      {selectedUser && (
        <>
          <div className='chat-window flex-grow'>
            <div className='chat-header'>
              <div className='left'>
                <button
                  className='text-muted hover:text-primary cursor-pointer'
                  onClick={() => setSelectedUser(null)}>
                  <ArrowLeft className='size-6' />
                </button>

                <img
                  src={selectedUser.profilePic || assets.avatar_icon}
                  alt={selectedUser.fullName + "profile pic"}
                />
                <div className='user'>
                  <h2 className='name'>{selectedUser.fullName}</h2>
                  <div className='status'>
                    {onlineUsers.includes(selectedUser._id) ? (
                      <p className='flex items-center gap-1'>
                        <span className='size-2 bg-primary rounded-full' />
                        Online
                      </p>
                    ) : (
                      <span className='text-muted'>Offline</span>
                    )}
                  </div>
                </div>
              </div>

              <Info
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className='size-6 text-muted hover:text-primary cursor-pointer'
              />
            </div>

            {messages.length > 0 ? (
              <ul className='chat-container' ref={chatContainerRef}>
                {messages.reverse().map((msg) => (
                  <li key={msg._id}>
                    {msg.senderId === authUser._id ? (
                      <div className='outgoing-msg'>
                        <div>
                          <div className='flex justify-end items-end w-full'>
                            {msg.text ? (
                              <p className='chat-bubble'>{msg.text}</p>
                            ) : msg.image ? (
                              <img
                                src={msg.image}
                                alt='image'
                                className='msg-img'
                                onClick={() => handleImageClick(msg.image)}
                              />
                            ) : null}
                          </div>

                          <p className='date'>
                            {new Date(msg.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='incoming-msg'>
                        <img
                          src={selectedUser.profilePic || assets.avatar_icon}
                          alt={selectedUser.fullName}
                          className='user-profile-img'
                        />
                        <div>
                          <div className='flex justify-end items-end w-full'>
                            {msg.text ? (
                              <p className='chat-bubble'>{msg.text}</p>
                            ) : msg.image ? (
                              <img
                                src={msg.image}
                                alt='image'
                                className='msg-img'
                                onClick={() => handleImageClick(msg.image)}
                              />
                            ) : null}
                          </div>
                          <p className='date'>
                            {new Date(msg.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <Welcome noMessages />
            )}

            <div className='chat-inputs'>
              <label className='icon-btn group'>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleSendImage(e)}
                />
                <Paperclip className='size-5 group-hover:text-primary-foreground' />
              </label>
              <div className='input-container'>
                <div className='input bg-card/40'>
                  <input
                    type='text'
                    placeholder='Type a message...'
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
                  />
                </div>
              </div>

              {input && (
                <button
                  onClick={(e) => handleSendMessage(e)}
                  className='icon-btn group'>
                  <Send className='size-5 group-hover:text-primary-foreground ' />
                </button>
              )}
            </div>
          </div>
          {isDetailsOpen && <DetailsPanel />}

          <ImageModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            image={selectedImage}
          />
        </>
      )}
    </section>
  );
};

export default ChatWindow;
