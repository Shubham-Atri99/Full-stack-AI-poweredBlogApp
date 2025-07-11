import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectMongo from "./connection.js";
import adminRouter from "./routes/adminLogin.js";
import blogrouter from "./routes/Blogroute.js";
import cors from 'cors';


const app= express();
const port= process.env.PORT || 3069;

//middleware
app.use(express.json());
app.use(cors())

//db connection;
connectMongo("mongodb://localhost:27017/fullStack1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

//routes
app.use("/api/admin",adminRouter);
app.use("/api/blog",blogrouter);




app.listen(port,()=> console.log(`Server started at PORT ${port}`))

