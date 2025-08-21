import "./Sidebar.css";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { LogoIcon, UserIcon } from "../../lib/Icons";
import { LogOut, MoreHorizontal, Search } from "lucide-react"; // todo: clean Up
import assets from "../../assets/assets";

function Sidebar() {
  const { logout, onlineUsers } = useContext(AuthContext);
  const { getUsers, users, setSelectedUser } = useContext(ChatContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  // handle menu close when click outside of menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h1 className='logo'>
          <LogoIcon className='size-6 text-primary' />
          QuickChat
        </h1>

        <div ref={menuRef}>
          <MoreHorizontal
            className='size-6 text-muted cursor-pointer hover:text-primary'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />

          {/* Option Menu */}
          {isMenuOpen && (
            <div className='option-menu'>
              <div className='current-user'>
                <img src={assets.profile_img} alt='Current User Profile' />
                <div>
                  <h2 className='user'>Shubham Patil</h2>
                  <span>Online</span>
                </div>
              </div>

              <hr />

              <div className='actions'>
                <p className='hover:bg-card'>
                  <UserIcon className='size-5 text-muted' /> Edit Profile
                </p>
                <p
                  onClick={logout}
                  className='hover:bg-destructive/10 group hover:text-destructive'>
                  <LogOut className='size-5 text-muted group-hover:text-destructive' />
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='input-container'>
        <div className='input'>
          <Search className='size-5 text-muted' />
          <input
            type='searchQuery'
            id='searchQuery'
            placeholder='Search or start new chat...'
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ul className='contacts'>
        {filteredUsers.map((user, index) => (
          <li key={index} onClick={() => setSelectedUser(user)}>
            <div className='contact-img'>
              <img
                src={user.profilePic || assets.avatar_icon}
                alt={"Alison-Profile-Pic"}
              />
              <span className='online-dot'></span>
            </div>

            <div>
              <p className='contact-name'>{user.fullname}</p>
              <p className='last-msg'>{user.bio}</p> {/** todo: add last msg */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
