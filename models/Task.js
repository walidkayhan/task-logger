const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  type: String,
  additionalInformation: String,
  user: { type: mongoose.ObjectId, required: true },
  startDate: Date,
  endDate: Date,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TaskModel", TaskSchema);
