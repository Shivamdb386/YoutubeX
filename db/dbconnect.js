import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectdb = async ()=>{
try {
   const connectioninst = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB connected on HOST ${connectioninst.connection.host}`);
} catch (error) {
    console.log('MongoDB connection error' , error);
    process.exit(1);
}

}
export default connectdb