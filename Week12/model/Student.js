const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email:
  {
    type: String,
    required: true,
    unique: true
  },
  course:
  {
    type: String,
    required: true
  },
  enrolledDate:
  {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model("Student", studentSchema);
