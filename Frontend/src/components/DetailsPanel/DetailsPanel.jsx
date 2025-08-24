import { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import "./DetailsPanel.css";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import ImageModal from "../ImageModal/ImageModal";

const DetailsPanel = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

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

  useEffect(() => {
    console.log(messages);
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    <>
      {selectedUser && (
        <div className='details'>
          <div className='profile'>
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt='profile-img'
            />
            <h3>{selectedUser.fullName}</h3>
            <p>{selectedUser.bio}</p>
          </div>
          <p>Shared Media</p>
          <div className='media'>
            <div className='media-grid'>
              {msgImages.length > 0 &&
                msgImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`image-${i}`}
                    onClick={() => handleImageClick(img)}
                  />
                ))}
            </div>
          </div>

          <ImageModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            image={selectedImage}
          />

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
