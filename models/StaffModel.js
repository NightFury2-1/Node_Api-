const { text } = require("express");
const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    status: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const Staffs = mongoose.model("Staffs", StaffSchema);
module.exports = Staffs;
