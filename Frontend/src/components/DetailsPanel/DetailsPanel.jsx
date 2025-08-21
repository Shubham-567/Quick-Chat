import { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import "./DetailsPanel.css";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

const DetailsPanel = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    console.log(messages);
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    <>
      {selectedUser && (
        <div className='details'>
          <div className='profile flex flex-col items-center justify-center'>
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt='profile-img'
            />
            <h3>{selectedUser.fullname}</h3>
            <p>{selectedUser.bio}</p>
          </div>
          <div className='media'>
            <p>Shared Media</p>
            <div className='media-grid'>
              {msgImages.length > 0 &&
                msgImages.map((img, i) => (
                  <img key={i} src={img} alt={`image-${i}`} />
                ))}
            </div>
          </div>
          <button className='logout-btn' onClick={logout}>
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </>
  );
};

export default DetailsPanel;
