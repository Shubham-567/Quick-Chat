import "./Sidebar.css";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { LogoIcon, UserIcon } from "../../lib/Icons";
import { LogOut, MoreHorizontal, Search } from "lucide-react"; // todo: clean Up
import assets from "../../assets/assets";

function Sidebar({ showEditProfile }) {
  const { logout, onlineUsers, authUser } = useContext(AuthContext);
  const {
    getUsers,
    users,
    setSelectedUser,
    selectedUser,
    unseenMessages,
    lastMessages,
  } = useContext(ChatContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers, lastMessages]);

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
          <img
            src='/chat_app.svg'
            alt='QuickChat Logo'
            className='size-8 rounded-full'
          />
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
                <img
                  src={authUser.profilePic || assets.avatar_icon}
                  alt='Current User Profile'
                />
                <div>
                  <h2 className='user'>{authUser.fullName}</h2>
                  <div className='status'>
                    {onlineUsers.includes(authUser._id) ? (
                      <span className='text-primary'>Online</span>
                    ) : (
                      <span>Offline</span>
                    )}
                  </div>
                </div>
              </div>

              <hr />

              <div className='actions'>
                <button
                  onClick={() => {
                    showEditProfile();
                    setIsMenuOpen(false);
                  }}
                  className='hover:bg-card'>
                  <UserIcon className='size-5 text-muted' /> Edit Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className='hover:bg-destructive/10 group text-destructive'>
                  <LogOut className='size-5' />
                  Logout
                </button>
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

      <hr className='divider' />

      <ul className='contacts'>
        {filteredUsers.map((user, index) => (
          <li
            key={index}
            onClick={() => setSelectedUser(user)}
            className={
              selectedUser && selectedUser._id === user._id
                ? "border-primary bg-card"
                : "border-transparent"
            }>
            <div className='flex items-center gap-2'>
              <div className='contact-img'>
                <img
                  src={user.profilePic || assets.avatar_icon}
                  alt={"Alison-Profile-Pic"}
                />
                {onlineUsers.includes(user._id) && (
                  <span className='online-dot' />
                )}
              </div>

              <div>
                <p className='contact-name'>{user.fullName}</p>
                <p className='last-msg'>
                  {lastMessages[user._id]?.text || lastMessages[user._id]?.image
                    ? lastMessages[user._id]?.senderId === authUser._id
                      ? "You: "
                      : user.fullName.split(" ")[0] + ": "
                    : ""}
                  {lastMessages[user._id]?.text
                    ? lastMessages[user._id]?.text
                    : lastMessages[user._id]?.image
                    ? "Image"
                    : "No messages yet"}
                </p>
              </div>
            </div>

            {unseenMessages[user._id] > 0 && (
              <div class='unseenMessageCounter'>
                <span className='mx-auto'>{unseenMessages[user._id]}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
