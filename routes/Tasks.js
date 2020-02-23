const express = require("express");
const app = express.Router();
const { check, validationResult, param } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Task = require("../models/Task");

//@Request-Type: GET
//@Route: /api/tasks/
//@Description: Get all tasks
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//@Request-Type: GET
//@Route: /api/tasks/:id
//@Description: Get specified task
app.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .json({ success: false, message: "Task ID is invalid" });

    const found = await Task.findById(req.params.id);

    if (found) {
      res.status(200).json({ success: true, task });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//@Request-Type: POST
//@Route: /api/tasks/
//@Description: Add new task
app.post(
  "/",
  [
    check("title", "Please type in the task title")
      .not()
      .isEmpty(),
    check("user", "Please specify the user")
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
        title,
        type,
        additionalInformation,
        user,
        startDate,
        endDate
      } = req.body;

      const task = new Task({
        title,
        type,
        additionalInformation,
        user,
        startDate,
        endDate
      });

      const saved = await task.save();

      if (saved) {
        res
          .status(201)
          .json({ success: true, message: "Task added succesfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

//@Request-Type: PUT
//@Route: /api/tasks/:id
//@Description: Edit task
app.put(
  "/:id",
  [
    check("title", "Please type in the task title")
      .not()
      .isEmpty(),
    check("user", "Please specify the user")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const {
        title,
        type,
        additionalInformation,
        user,
        startDate,
        endDate
      } = req.body;
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = app;
