import mongoose from "mongoose";
const url =
  "mongodb+srv://sachinthokale999:xDfbLN5A3R3SYhjw@cluster0.glejrvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(url);
    console.log(`Database connected successfully to ${connection.host}`);
  } catch (error) {
    console.log(`Database connection error : ${error}`);
  }
};
export default connectDB;
