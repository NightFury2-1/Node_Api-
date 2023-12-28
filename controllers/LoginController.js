const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Staffs = require("../models/StaffModel");
const comResp = { M: "", A: 0, E: "", Result: {} };

const loginGo = asyncHandler(async (req, res) => {
  try {
    let resp = { ...comResp };
    const email = req.body.email;
    const password = req.body.password;
    const staff = await Staffs.findOne({ email: email });
    if (staff == null) {
      resp.E = "No staff with this email is found";
      resp.A = 0;
      resp.Result = staff;
      return res.status(200).send(resp);
    }
    if (await bcrypt.compare(password, staff.password)) {
      resp.M = "Logged In";
      resp.A = 1;
      resp.Result = staff;
      res.status(200).json(resp);
    } else {
      resp.E = "Invalid password";
      resp.A = 0;
      resp.Result.curntpass = password;
      resp.Result.dbpass = staff.password;
      res.status(200).send(resp);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const AddStaff = asyncHandler(async (req, res) => {
  try {
    let resp = { ...comResp };
    const newStaff = req.body;
    const sameStaff = await Staffs.findOne({ email: newStaff.email });
    if (sameStaff == null) {
      newStaff.password = await bcrypt.hash(newStaff.password, 10);
      const addedStaff = await Staffs.create(newStaff);
      resp.M = "Successfully Added";
      resp.A = 1;
      resp.Result = addedStaff;
      res.status(200).json(resp);
    } else {
      resp.E = "Email already exist";
      resp.A = 0;
      resp.Result = newStaff;
      res.status(400).send(resp);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateStaffpass = asyncHandler(async (req, res) => {
  try {
    const resp = { ...comResp };
    const obj = req.body;
    const staff = await Staffs.findOne({ email: obj.email });
    if (staff == null) {
      resp.E = "Invalid password or email";
      resp.A = 0;
      return res.status(400).send(resp);
    }
    const hashedpass = await bcrypt.hash(obj.password, 10);
    const myquery = { email: obj.email };
    const newValues = { $set: { password: hashedpass } };
    const updatedStaff = await Staffs.updateOne(myquery, newValues);
    resp.A = 1;
    resp.M = "Updated Successfully";
    resp.Result = updatedStaff;
    res.status(200).send(resp);
    // ,
    //   function (err, resp) {
    //     if (err) {
    //       resp.A = 0;
    //       resp.E = "Error in processing the request";
    //       res.status(500).send(resp);
    //       throw new Error(err.message);
    //     } else {
    //       console.log(resp);
    //       resp.A = 1;
    //       resp.M = "Updated Successfully";
    //       resp.Result.QueryResult = resp;
    //       resp.Result.UpdatedStaff = updatedStaff;
    //       res.status(200).send(resp);
    //     }
    //   }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = { AddStaff, loginGo, updateStaffpass };
