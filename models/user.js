const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, default: "" },
  fullname: { type: String, unique: true, default: "" },
  email: { type: String, unique: true },
  password: { type: String, default: "" },
  userImage: { type: String, default: "default.png" },
  facebook: { type: String, default: "" },
  fbTokens: Array,
  google: { type: String, default: "" },
  googleTokens: Array,
});

userSchema.pre("save", async function (next) {
  // if the password is NOT modified => no need to hash => jump to next middleware
  // *isModified and *isNew is a built-in function
  if (!this.isModified("password")) return next();

  // hash the pw with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  // delete the passwordConfirm field (this happens after the validation in the schema)
  //   this.passwordConfirm = undefined;

  next();
});

userSchema.methods.validateUserPassword = async function (password) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
