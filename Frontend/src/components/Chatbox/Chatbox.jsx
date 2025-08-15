import assets from "../../assets/assets";
import "./Chatbox.css";
const Chatbox = () => {
  return (
    <div className='chat-box'>
      <div className='chat-user'>
        <img src={assets.profile_img} alt='profile-img' />
        <p>
          John Wick
          <img src={assets.green_dot} alt='online-indicator' className='dot' />
        </p>
        <img src={assets.help_icon} alt='help' />
      </div>

      <div className='chat-msg'>
        <div className='s-msg'>
          <p className='msg'>Yes, How about at 3:00pm?</p>
          <div>
            <img src={assets.profile_img} alt='profile-img' />
            <p>02:33pm</p>
          </div>
        </div>

        <div className='r-msg'>
          <p className='msg'>Hello, can we talk?</p>
          <div>
            <img src={assets.profile_img} alt='profile-img' />
            <p>02:30pm</p>
          </div>
        </div>

        <div className='s-msg'>
          <img src={assets.pic1} alt='image' className='msg-img' />
          <div>
            <img src={assets.profile_img} alt='profile-img' />
            <p>12:24pm</p>
          </div>
        </div>
      </div>

      <div className='chat-input'>
        <input type='text' placeholder='Send a message' />
        <input type='file' id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='Upload image' />
        </label>
        <img src={assets.send_button} alt='Send' />
      </div>
    </div>
  );
};

export default Chatbox;
