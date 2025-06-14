import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    httpOnly: true,
   secure: true,
   sameSite: "none",
   maxAge: 15 * 24 * 60 * 60 * 1000, 
  });
};

export default generateToken;
