const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    unique: true,
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  description: {
    type: String,
    required: [true, "must provide description"],
    trim: true,
    minlength: [
      50,
      "description can not be less than 50 words (One paragraph)",
    ],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
