import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './src/db/index.js';
import userRoute from './src/routes/user.routes.js';
import categoryRoute from './src/routes/category.routes.js';
import savingsRoute from './src/routes/savings.routes.js';

dotenv.config({
    path: "./src/.env"
});

const app = express();

// Middleware
app.use(cors({
    origin: "https://expenztrack-frontend.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/savings', savingsRoute);

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'public' }); // Ensure 'public' contains your 'index.html'
});

// Connect to MongoDB and start server
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5500, () => {
            console.log(`Server connected at port ${process.env.PORT || 5500}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB connection failed: ', error);
    });

export { app };
