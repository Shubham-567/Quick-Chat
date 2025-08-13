import assets from "../../assets/assets";
import "./RightSidebar.css";

const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className='rs-profile'>
        <img src={assets.profile_img} alt='profile-img' />
        <h3>
          John Wick
          <img src={assets.green_dot} alt='online-indicator' className='dot' />
        </h3>
        <p>Hey, There i am John Wick using web chat app</p>
      </div>
      <hr />
      <div className='rs-media'>
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt='media-1' />
          <img src={assets.pic2} alt='media-2' />
          <img src={assets.pic3} alt='media-3' />
          <img src={assets.pic4} alt='media-4' />
          <img src={assets.pic1} alt='media-5' />
          <img src={assets.pic2} alt='media-6' />
        </div>
      </div>
      <button>Logout</button>
    </div>
  );
};

export default RightSidebar;
