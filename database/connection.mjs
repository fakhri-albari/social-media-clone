import mongoose from "mongoose";
import config from "../config.mjs";

const connect = async () => {
  try {
    await mongoose.connect(config.mongooseURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connect;
