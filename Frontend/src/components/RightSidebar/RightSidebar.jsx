import { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import "./RightSidebar.css";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { onlineUsers, logout } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    console.log(messages);
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    <>
      {selectedUser && (
        <div className='rs'>
          <div className='rs-profile'>
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt='profile-img'
            />
            <h3>
              {selectedUser.fullname}

              {onlineUsers.includes(selectedUser._id) && (
                <img
                  src={assets.green_dot}
                  alt='online-indicator'
                  className='dot'
                />
              )}
            </h3>
            <p>{selectedUser.bio}</p>
          </div>
          <hr />
          <div className='rs-media'>
            <p>Media</p>
            <div>
              {msgImages.length > 0 &&
                msgImages.map((img, i) => (
                  <img key={i} src={img} alt={`image-${i}`} />
                ))}
            </div>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
