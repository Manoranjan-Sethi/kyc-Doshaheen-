const asyncHandler = require("express-async-handler");
const User = require("../models/userDetails");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  console.log("registerUser req.body=====>", req.body);
  const { email, password, name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please Add A Name");
  }
  if (!email) {
    res.status(400);
    throw new Error("Please Add An Email");
  }
  if (!password) {
    res.status(400);
    throw new Error("Please Add A Password");
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
