import TryCatch from '../utils/TryCatch.js'
import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

export const registerUser = TryCatch(async (req,res) => {
   
    const {name , email , password , dob , phone} = req.body;

    if(!name || !email || !password || !dob || !phone) {
        return res.status(400).json({
            message: "Please give all values",
        });
    }

    let user = await User.findOne({ email });

    if(user) 
        return res.status(400).json({
        message:"User already exists",
        });
    
    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashPassword,
        dob,
        phone
    });

    generateToken(user._id,res);

    res.status(201).json({
        message: "user created successfully",
        user,
    });
})

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  generateToken(user._id, res);

  res.json({
    message: "User Logged in",
    user,
  });
});

export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  res.json({
    message: "Logged out successfully",
  });
});