const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://hbeaton:zD4ltDcCQfLjq43q@studentdb.0jdda8x.mongodb.net/?retryWrites=true&w=majority&appName=studentDB');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
