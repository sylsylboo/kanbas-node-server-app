import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import "dotenv/config";



const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON object

Hello(app);
Lab5(app);
CourseRoutes(app);
app.listen(process.env.PORT || 4000);   