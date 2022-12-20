const mongoose = require("mongoose");

const userDetails = mongoose.Schema({
  userName: String,
  Age: Number,
  KYC: String,
  passport: Number,
  city: String,
  state: String,
  country: String,
});

const Users = mongoose.model("data", userDetails);

module.exports = Users;
