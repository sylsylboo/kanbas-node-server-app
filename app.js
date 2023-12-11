import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import mongoose from "mongoose";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";

import "dotenv/config";
import session from "express-session";


const CONNECTION_STRING = "mongodb+srv://sylviawing96:sylviawing72273@clusterkanbas.5ud86ou.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING); // connect to the kanbas db

const app = express();
// app.use(cors());

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
app.use(express.json()); // to parse JSON object

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.enable('trust proxy');
app.use(session(sessionOptions));

Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);   