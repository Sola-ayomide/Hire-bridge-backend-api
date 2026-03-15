import mongoose from 'mongoose';
import 'dotenv/config';


export const connectDB  = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected:", conn.connection.host);
        console.log("Database:", conn.connection.name);
        
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}