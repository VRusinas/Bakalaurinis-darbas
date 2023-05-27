const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};
const fetchUser = async (req, res) => {
  const {email} = req.body;
  const user = await User.find({email: email});
  res.status(200).json({ user: user });
};

const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, name, surname } = req.body;
  const userType = "CLIENT";
  try {
    const user = await User.signup(email, password,  name, surname, userType);
    
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  fetchUser
};
