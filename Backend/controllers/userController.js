import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

// SignUp a new user
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exits" });
    }

    // create hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // create new user in db
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPass,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);

    res.json({ success: false, message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    let isPassCorrect = null;

    if (userData) {
      isPassCorrect = await bcrypt.compare(password, userData.password);
    }

    if (!isPassCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    res.json({
      success: true,
      userData,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);

    res.json({ success: false, message: error.message });
  }
};

// Update user profile details
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;

    const userId = req.user._id;

    let updatedUser;

    if (profilePic === "") {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic, bio, fullName },
        { new: true }
      );
    } else if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          bio,
          fullName,
        },
        { new: true }
      );
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Controller to check if user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};
