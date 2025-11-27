const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE);
    console.log("The Database connected successfully");
  } catch (err) {
    console.log(`MongoDB Error: ${err}`.bgGreen.white);
  }
};

module.exports = dbconnect;
