import ChatWindow from "../../components/ChatWindow/ChatWindow";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Chat.css";

const Chat = () => {
  return (
    <section className='chat'>
      <Sidebar />
      <ChatWindow />
      {/*
        <Chatbox />
        <RightSidebar /> */}
    </section>
  );
};

export default Chat;
