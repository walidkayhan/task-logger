let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  position: { type: String, required: true },
  favoriteColor: { String, required: true },
  created: { type: Date, default: Date.now }
});

export default UserModel = mongoose.model("UserModel", UserSchema);
