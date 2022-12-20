const asyncHandler = require("express-async-handler");

const Del = require("../models/userDetails");
const User = require("../models/setUser");

const getDel = asyncHandler(async (req, res) => {
  const del = await Del.find({ user: req.user.id });
  res.status(200).json(del);
});

const setDel = asyncHandler(async (req, res) => {
  console.log("setDel req.body=====>", req.body);

  if (!req.body) {
    res.status(400);
    throw new Error("Please Add Details");
  }

  const del = await Del.create({ ...req.body, user: req.user.id });

  res.json(del);
});

const updateDel = asyncHandler(async (req, res) => {
  const del = await Del.findById(req.params.id);

  if (!del) {
    res.status(400);
    throw new Error("Details Not Found!!!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  if (del.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updatedDel = await Del.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedDel);
});

const deleteDel = asyncHandler(async (req, res) => {
  const del = await Del.findById(req.params.id);

  if (!del) {
    res.status(400);
    throw new Error("Details Not Found!!!");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  if (del.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  await del.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDel,
  setDel,
  updateDel,
  deleteDel,
};
