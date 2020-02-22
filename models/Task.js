let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let TaskSchema = new Schema({
  title: { type: String, required: true },
  type: String,
  additionalInformation: String,
  user: { type: mongoose.ObjectId, required: true },
  startDate: Date,
  endDate: Date,
  created: { type: Date, default: Date.now }
});

export default TaskModel = mongoose.model("TaskModel", TaskSchema);
