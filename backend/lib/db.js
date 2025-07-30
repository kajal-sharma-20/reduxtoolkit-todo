import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
  }
};


