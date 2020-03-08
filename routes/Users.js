const express = require("express");
const app = express.Router();
const { check, validationResult, param } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/User");

//@Request-Type: GET
//@Route: /api/users/
//@Description: Get all users
app.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json({ success: true, users });
  } catch (error) {
    console.erro(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//@Request-Type: GET
//@Route: /api/users/:id
//@Description: Get specified user details
app.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

//@Request-Type: POST
//@Route: /api/users/
//@Description: Add new user
app.post(
  "/",
  [
    check("username", "Please type in your username")
      .not()
      .isEmpty(),
    check("firstName", "Please type in your first name")
      .not()
      .isEmpty(),
    check("lastName", "Please type in your last name")
      .not()
      .isEmpty(),
    check("email", "Please type in a valid email").isEmail(),
    check("position", "Please type in your company position")
      .not()
      .isEmpty(),
    check("department", "Please type in the department you are in")
      .not()
      .isEmpty(),
    check("favoriteColor", "Please specify your favorite color")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const {
        username,
        firstName,
        lastName,
        email,
        position,
        department,
        favoriteColor
      } = req.body;

      const checkUsername = await User.findOne({ username });
      const checkEmail = await User.findOne({ email });

      if (checkUsername)
        return res.status(400).json({
          success: false,
          message:
            "This username is already taken, please choose a different one"
        });

      if (checkEmail)
        return res.status(400).json({
          success: false,
          message:
            "This email address is already taken, please choose a different one"
        });

      const user = new User({
        username,
        firstName,
        lastName,
        email,
        position,
        department,
        favoriteColor
      });

      const save = await user.save();

      if (save) {
        res
          .status(201)
          .json({ success: true, message: "User added succesfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

//@Request-Type: PUT
//@Route: /api/users/:id
//@Description: Edit user details
app.put(
  "/:id",
  [
    check("username", "Please type in your username")
      .not()
      .isEmpty(),
    check("firstName", "Please type in your first name")
      .not()
      .isEmpty(),
    check("lastName", "Please type in your last name")
      .not()
      .isEmpty(),
    check("email", "Please type in a valid email").isEmail(),
    check("position", "Please type in your company position")
      .not()
      .isEmpty(),
    check("favoriteColor", "Please specify your favorite color")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const {
        username,
        firstName,
        lastName,
        email,
        position,
        favoriteColor
      } = req.body;

      const checkUsername = await User.findOne({ username });
      const checkEmail = await User.findOne({ email });

      //   if (checkUsername)
      //     return res.status(400).json({
      //       success: false,
      //       message:
      //         "This username is already taken, please choose a different one"
      //     });

      //   if (checkEmail)
      //     return res.status(400).json({
      //       success: false,
      //       message:
      //         "This email address is already taken, please choose a different one"
      //     });

      const updated = await User.findOneAndUpdate(
        { username: req.params.id },
        { username, firstName, lastName, email, position, favoriteColor },
        { useFindAndModify: false }
      );

      if (updated) {
        const updatedUser = await User.findOne({ username });
        res.status(200).json({
          success: true,
          message: "User information succesfully updated",
          user: updatedUser
        });
      } else {
        res.status(200).json({
          success: false,
          message: "User information not updated, please try again"
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

//@Request-Type: DELETE
//@Route: /api/users/
//@Description: Delete user
app.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete(
      { username: req.params.id },
      { useFindAndModify: false }
    );

    if (deleted) {
      res
        .status(200)
        .json({ success: true, message: "User deleted succesfully" });
    } else {
      res.status(200).json({
        success: false,
        message: "User not deleted, please try again"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = app;
