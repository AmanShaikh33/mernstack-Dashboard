import { User } from '../models/userModel.js'


export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in myProfile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// controller/userController.js
export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Avatar updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update avatar" });
  }
};
