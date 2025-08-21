import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./Chat.css";

const Chat = () => {
  return (
    <section className='chat'>
      <Sidebar />

      <div className='flex-grow'>
        <ChatWindow />
      </div>
    </section>
  );
};

export default Chat;
