import assets from "../../assets/assets";
import "./LeftSidebar.css";

const LeftSidebar = () => {
  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} alt='logo' className='logo' />
          <div className='menu'>
            <img src={assets.menu_icon} alt='menu-icon' />
            <div className='sub-menu'>
              <p>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className='ls-search'>
          <img src={assets.search_icon} alt='search-icon' />
          <input type='text' placeholder='Search here...' />
        </div>
      </div>

      <div className='ls-list'>
        {Array(12)
          .fill("")
          .map((item, i) => (
            <div key={i} className='friends'>
              <img src={assets.profile_img} alt='profile-pic' />
              <div>
                <p>John Wick</p>
                <span>Hello, How are you?</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
