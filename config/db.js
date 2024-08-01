import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDb ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;
