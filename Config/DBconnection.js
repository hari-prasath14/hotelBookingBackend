import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const connectionURL = process.env.ConnectionURL

export const connectDB =async()=>{

    try {
        const connection = await mongoose.connect(connectionURL)
        console.log("connected to database");
        return connection        
    } 
    catch (error) 
    {
        console.log(error);    
    }

}

