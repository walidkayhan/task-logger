const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserModel", UserSchema);
