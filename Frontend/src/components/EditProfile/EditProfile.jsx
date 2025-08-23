import "./EditProfile.css";

import { useContext, useRef, useState } from "react";
import { ArrowLeft, Camera, User, Mail } from "lucide-react";
import assets from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const BIO_MAX_LENGTH = 200;

const EditProfile = ({ onClose }) => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio || "");
  const fileInputRef = useRef(null);
  const [removeImage, setRemoveImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // updata data and remove existing image
    if (removeImage) {
      await updateProfile({ profilePic: "", fullName: name, bio });
      onClose();
      return;
    }

    // update data without image
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      onClose();
      return;
    }

    // update data with new image
    const render = new FileReader();
    render.readAsDataURL(selectedImage);
    render.onload = async () => {
      const base64Image = render.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      onClose();
    };
  };

  const handleCancel = () => {
    onClose();
  };

  const handleRemovePhoto = async () => {
    setSelectedImage(null);
    setRemoveImage(true);
  };

  return (
    <section className='settings-section'>
      <div className='w-full max-w-4xl mx-auto'>
        {/* Header */}
        <header className='header-container'>
          <button onClick={handleCancel}>
            <ArrowLeft className='size-6' />
          </button>
          <h2 className='heading'>Edit Profile</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <div className='form-container'>
            {/* Profile Photo Section */}
            <div className='profile-container'>
              <div className='md:col-span-1'>
                <h3 className='heading'>Profile Photo</h3>
                <p className='description'>
                  This will be displayed on your profile.
                </p>
              </div>
              <div className='upload'>
                <div className='img-container'>
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : removeImage
                        ? assets.avatar_icon
                        : authUser.profilePic || assets.avatar_icon
                    }
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />

                  {/* Camera overlay */}
                  <label htmlFor='avatar' className='camera-overlay'>
                    <Camera className='size-5 text-white' />
                    <input
                      type='file'
                      id='avatar'
                      accept='image/png, image/jpeg'
                      hidden
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                  </label>
                </div>

                <div className='actions'>
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='change-btn'>
                    Change
                  </button>
                  <button
                    type='button'
                    onClick={handleRemovePhoto}
                    className='cancel-btn'>
                    Remove
                  </button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className='hidden'
                    accept='image/png, image/jpeg'
                  />
                </div>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className='info-container'>
              <div className='md:col-span-1'>
                <h3 className='heading'>Personal Information</h3>
                <p className='description'>
                  Update your personal details here.
                </p>
              </div>
              <div className='md:col-span-2 space-y-6'>
                {/* Full Name */}
                <div className='space-y-2'>
                  <label htmlFor='fullname'>Full Name</label>
                  <div className='relative'>
                    <User className='input-icons' />
                    <input
                      id='fullname'
                      type='text'
                      placeholder='Alex Ray'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className='name-input'
                    />
                  </div>
                </div>

                {/* Email */}
                <div className='space-y-2'>
                  <label htmlFor='email'>Email Address</label>
                  <div className='relative'>
                    <Mail className='input-icons' />
                    <input
                      id='email'
                      type='email'
                      placeholder='Alex.Ray@example.com'
                      value={authUser.email}
                      readOnly
                      className='disabled-input'
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className='space-y-2'>
                  <label htmlFor='bio'>Bio</label>
                  <textarea
                    id='bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    maxLength={BIO_MAX_LENGTH}
                    placeholder='Tell us a little about yourself...'
                    className='textarea'
                  />
                  <p className='remaining-words'>
                    {bio.length} / {BIO_MAX_LENGTH}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className='form-actions'>
            <button type='button' onClick={handleCancel} className='cancel-btn'>
              Cancel
            </button>
            <button type='submit' className='submit-btn'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
