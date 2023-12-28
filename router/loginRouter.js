const express = require("express");
const {
  loginGo,
  AddStaff,
  updateStaffpass,
} = require("../controllers/LoginController");

const LoginRouter = express.Router();

LoginRouter.post("/", loginGo);
LoginRouter.post("/addstaff", AddStaff);
LoginRouter.post("/UpdateStaff", updateStaffpass);

module.exports = LoginRouter;
