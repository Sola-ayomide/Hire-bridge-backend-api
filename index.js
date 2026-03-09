import dotenv from 'dotenv';
dotenv.config();
// Importing modules
import express from 'express';
import morgan from 'morgan'; 
import { connectDB } from './config/connectDB.js';
import { errorHandler } from './middlewares/middlewareFile.js';
import authRoutes from './routes/auth.routes.js';

// Initializing app variable with express
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json()); // Parsing objects to the req.body
app.use(morgan('dev')); // logger
app.use(errorHandler); // Global error handler  

// Introductory Message
const message = `
    <div style='min-height: 100vh; display: flex; flex-direction: column; place-items: center; place-content: center;'>
        <h1 style='font-size: 52px; text-align: center;'>
            Hello from Backend!
        </h1>
    </div>
`;



// Sending welcome message from the root route
app.get('/api/v1', (req, res) => {
    res.status(200).send(message)
});

// Auth routes
app.use("/api/v1/auth", authRoutes);


// Starting server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`);
})
