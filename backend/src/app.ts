import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { setupDatabase } from "./config/database";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Basic route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Health Tracker API" });
});

// Initialize database and start server
setupDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Failed to start server:", error);
    });
