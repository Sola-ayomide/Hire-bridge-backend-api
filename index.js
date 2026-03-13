// Importing modules
import express from 'express';
import morgan from 'morgan'; 
import { connectDB } from './config/connectDB.js';
import { errorHandler } from './middlewares/error.handler.js';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from "./routes/job.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { protect, authorize } from "./middlewares/auth.middleware.js";
import cors from 'cors';

// Initializing app variable with express
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json()); // Parsing objects to the req.body
app.use(express.urlencoded({ extended: true })); // For form data
app.use(morgan('dev')); // logger
app.use(cors()); // Cross Origin Resource Sharing

// Introductory Message
const message = `
    <div style='min-height: 100vh; display: flex; flex-direction: column; place-items: center; place-content: center;'>
        <h1 style='font-size: 52px; text-align: center;'>
            Hello from Hire Bridge Backend!
        </h1>
    </div>
`;



// Sending welcome message from the root route
app.get('/', (req, res) => {
    res.status(200).send(message)
});

// routes
app.use("/api/v1/auth", authRoutes); // auth routes
app.use("/api/v1/jobs", protect, authorize("recruiter"), jobRoutes); // job routes
app.use("/api/v1/dashboard", protect, authorize("recruiter"), dashboardRoutes); // dashboard routes
app.use(errorHandler); // Global error handler  


// Starting server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`);
})

