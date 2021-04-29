import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  facebookId: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
