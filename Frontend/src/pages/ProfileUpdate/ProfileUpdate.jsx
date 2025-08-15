import { useState } from "react";
import assets from "../../assets/assets";
import "./ProfileUpdate.css";

const ProfileUpdate = () => {
  const [image, setImage] = useState(false);

  return (
    <div className='profile'>
      <div className='profile-container'>
        <form>
          <h3>Profile Details</h3>

          <label htmlFor='avatar'>
            <input
              type='file'
              id='avatar'
              accept='.png, .jpg, .jpeg'
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt='avatar'
            />
            Upload profile image
          </label>

          <input type='text' placeholder='Your name' required />
          <textarea placeholder='Write profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt='logo'
          className='profile-pic'
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
