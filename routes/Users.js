const express = require("express");
const app = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/User");

//@Request-Type: GET
//@Route: /api/users/
//@Description: Get all active users
app.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json({ success: true, users });
  } catch (error) {
    console.erro(error.message);
    res.status(500).send("Server Error");
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
    check("password", "Please type in your password")
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
        password,
        firstName,
        lastName,
        email,
        position,
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
        password,
        firstName,
        lastName,
        email,
        position,
        favoriteColor
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const save = await user.save();

      if (save) {
        res
          .status(200)
          .json({ success: true, message: "User added succesfully" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = app;
