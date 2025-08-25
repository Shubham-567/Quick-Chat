import { useContext } from "react";
import "./Welcome.css";
import { ChatContext } from "../../context/ChatContext";

const Welcome = ({ noMessages }) => {
  const { selectedUser } = useContext(ChatContext);

  if (noMessages) {
    return (
      <div className='welcome-container flex'>
        <h2 className='welcome-header'>No messages yet!</h2>
        <p className='welcome-text'>
          Start a conversation with {selectedUser.fullName} by sending a
          message.
        </p>
      </div>
    );
  }

  return (
    <div className='hidden lg:flex welcome-container'>
      <h2 className='welcome-header'>Welcome to QuickChat!</h2>
      <p className='welcome-text'>
        Select a user from the sidebar to start chatting.
      </p>
      <div className='flex justify-center'>
        <img
          src='/chat_app.svg'
          alt='QuickChat Logo'
          className='welcome-logo'
        />
      </div>
    </div>
  );
};

export default Welcome;
