const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, default: null },
  additionalInformation: { type: String, default: null },
  user: { type: mongoose.ObjectId, required: true },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TaskModel", TaskSchema);
