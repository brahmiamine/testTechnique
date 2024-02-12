import mongoose from 'mongoose'
require("dotenv").config();


/**
 * The function connects to a MongoDB database using the provided connection string and logs a success message if the connection is
 * successful, otherwise it logs an error message and exits the process.
 */
const connectDB = async () => {
    const connectionString = process.env.MONGO_URL
    try {
        await mongoose.connect(connectionString as string);
        console.log('Connected to MongoDB: 🆗');
    } catch (error) {
        console.error('Could not connect to MongoDB 🚫', error);
        process.exit(1);
    }
};

export default connectDB;
