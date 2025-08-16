import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

// SignUp a new user
export const signUp = async (req, res) => {
  const { fullname, email, password, bio } = req.body;

  try {
    if (!fullname || !email || !password || !bio) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "Account already exits" });
    }

    // create hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // create new user in db
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPass,
      bio,
    });

    const token = generateToken(newUser._id);

    res.status(200).json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });

    const isPassCorrect = await bcrypt.compare(password, userData.password);

    if (!isPassCorrect) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    res.status(200).json({
      success: true,
      userData,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to check if user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// Update user profile details
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullname } = req.body;

    const userId = req.user._id;

    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findById(
        userId,
        { bio, fullname },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      console.log(upload);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          bio,
          fullname,
        },
        { new: true }
      );
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
