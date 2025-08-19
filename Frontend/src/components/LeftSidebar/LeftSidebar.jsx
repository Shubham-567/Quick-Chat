import { Link } from "react-router-dom";
import assets from "../../assets/assets";
import "./LeftSidebar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const LeftSidebar = () => {
  const { logout, onlineUsers } = useContext(AuthContext);
  const { getUsers, users, setSelectedUser } = useContext(ChatContext);

  const [input, setInput] = useState("");

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullname.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} alt='logo' className='logo' />
          <div className='menu'>
            <img src={assets.menu_icon} alt='menu-icon' />
            <div className='sub-menu'>
              <p>
                <Link to='/profile'>Edit Profile</Link>
              </p>
              <hr />
              <p onClick={() => logout()}>Logout</p>
            </div>
          </div>
        </div>
        <div className='ls-search'>
          <img src={assets.search_icon} alt='search-icon' />
          <input
            type='text'
            placeholder='Search here...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <div className='ls-list'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, i) => (
            <div
              key={i}
              className='friends'
              onClick={() => setSelectedUser(user)}>
              <img
                src={user.profilePic || assets.avatar_icon}
                alt='profile-pic'
              />
              <div>
                <p>{user.fullname}</p>
                <span>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No user found</p>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
