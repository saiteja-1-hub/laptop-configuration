const express = require("express");
const cors = require("cors");

const authRoutes =
    require("./routes/authRoutes");

const componentRoutes =
    require("./routes/componentRoutes");

const configurationRoutes =
    require("./routes/configurationRoutes");

const historyRoutes =
    require("./routes/historyRoutes");

const errorMiddleware =
    require("./middleware/errorMiddleware");

const app = express();


// CORS — allow the deployed frontend URL (set FRONTEND_URL in Render env vars)
// Falls back to allowing all origins for local development
const corsOptions = process.env.FRONTEND_URL
    ? {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
    : {};

app.use(cors(corsOptions));
app.use(express.json());


// Test route
app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
            "Laptop Configuration API is running"
    });

});


// API routes
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/components",
    componentRoutes
);

app.use(
    "/api/configurations",
    configurationRoutes
);

app.use(
    "/api/history",
    historyRoutes
);


// Error middleware
app.use(errorMiddleware);


module.exports = app;