const mongoose = require('mongoose');

const DB = "mongodb+srv://ravishekharvfirst:Anaconda@mailspace.odp28.mongodb.net/home-decor?retryWrites=true&w=majority&appName=mailspace";

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
