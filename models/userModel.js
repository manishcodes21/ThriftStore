import mongoose from 'mongoose'

const useSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      //ignores white spaces
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: {},
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  //saves timestamp when an user is created
  { timestamps: true }
);

//users collection already exists
export default mongoose.model('users',useSchema)