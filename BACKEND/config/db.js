const mongoose=require("mongoose")

// const connectDB = async () => {
//   try {
//     // Replace 'yourDatabaseURL' with your actual MongoDB connection string
//     const dbURI = 'mongodb+srv://multer123:multer123@cluster0.ycvopqn.mongodb.net/multersample?retryWrites=true&w=majority';

//     await mongoose.connect(dbURI);

//     console.log('MongoDB Connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit with failure
//   }
// };

// const mongoose = require('mongoose');

// module.exports = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

const connectDB=()=>mongoose.connect("mongodb://127.0.0.1:27017/takecareDB")
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err))

module.exports=connectDB