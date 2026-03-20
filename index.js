// Importing modules
import express from 'express';
import morgan from 'morgan'; 
import cors from 'cors';
import { connectDB } from './config/connectDB.js';
import { errorHandler } from './middlewares/error.handler.js';

// Routes Import
import authRoutes from './routes/auth.routes.js';
import applicationRoutes from "./routes/application.routes.js";
import jobRoutes from "./routes/job.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import candidateProfileRoutes from "./routes/candidate.profile.routes.js";
import candidateDashboardRoutes from "./routes/candidate.dashboard.routes.js";


// Initializing app variable with express
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/candidate/profile", candidateProfileRoutes);
app.use("/api/v1", applicationRoutes);
app.use("/api/v1/candidate/dashboard", candidateDashboardRoutes);

// Global Error Handler
app.use(errorHandler);

// Starting server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`);
})