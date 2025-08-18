import { useContext, useState } from "react";
import assets from "../../assets/assets";
import "./ProfileUpdate.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfileUpdate = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullname);
  const [bio, setBio] = useState(authUser.bio);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      await updateProfile({ fullname: name, bio });
      navigate("/");
      return;
    }

    const render = new FileReader();
    render.readAsDataURL(selectedImage);
    render.onload = async () => {
      const base64Image = render.result;
      await updateProfile({ profilePic: base64Image, fullname: name, bio });

      navigate("/");
    };
  };

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
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : authUser.profilePic || assets.avatar_icon
              }
              alt='avatar'
            />
            Upload profile image
          </label>

          <input
            type='text'
            placeholder='Your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder='Write profile bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required></textarea>
          <button type='submit' onClick={(e) => handleSubmit(e)}>
            Save
          </button>
        </form>
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : authUser.profilePic || assets.logo_icon
          }
          alt='logo'
          className='profile-pic'
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
