const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  department: { type: String, default: null },
  description: { type: String, default: null },
  user: {
    _id: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    favoriteColor: { type: String, default: "#00000" }
  },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TaskModel", TaskSchema);
