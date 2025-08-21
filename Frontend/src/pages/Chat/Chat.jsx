import Chatbox from "../../components/Chatbox/Chatbox";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Chat.css";

const Chat = () => {
  return (
    <section className='chat'>
      <Sidebar />
      {/*
        <Chatbox />
        <RightSidebar /> */}
    </section>
  );
};

export default Chat;
