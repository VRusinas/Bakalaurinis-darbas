const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  surname:{
    type: String,
    required: true,
  },
  userType:{
    type: String,
    required: true,
  }
});



userSchema.statics.signup = async function (email, password,  name, surname, userType) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ email });

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10); 

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash,  name, surname, userType});

  return user;
};

userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("The email you is incorrect");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("The password is incorrect");
  }
  return user;
};

const user = mongoose.model("User", userSchema);

module.exports = user;