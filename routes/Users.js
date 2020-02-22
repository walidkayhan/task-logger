const express = require("express");
const app = express.Router();

//@Request-Type: GET
//@Route: /api/users/
//@Description: Get all active users
app.get("/", (req, res) => {});

module.exports = app;
