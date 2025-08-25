import { useContext, useEffect, useState } from "react";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import ProfileUpdate from "../../components/EditProfile/EditProfile";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./Chat.css";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { setSelectedUser, selectedUser } = useContext(ChatContext);

  useEffect(() => {
    if (selectedUser?._id) {
      setShowEditProfile(false);
    }
  }, [selectedUser]);

  return (
    <section className='flex flex-col lg:flex-row'>
      <Sidebar
        isEditProfileOpen={showEditProfile}
        showEditProfile={() => {
          setShowEditProfile(true);
          setSelectedUser(null);
        }}
      />
      <div className='flex-grow'>
        {showEditProfile ? (
          <ProfileUpdate
            onClose={() => {
              setShowEditProfile(false);
              setSelectedUser(null);
            }}
          />
        ) : (
          <ChatWindow />
        )}
      </div>
    </section>
  );
};

export default Chat;
