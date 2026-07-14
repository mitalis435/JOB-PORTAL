import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({});
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//   origin: ["http://localhost:5173","https://job-portal-bay-two-88.vercel.app"],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 5001;
 
// //api's

// app.use("/api/user", userRoute);
// app.use("/api/company", companyRoute);
// app.use("/api/job", jobRoute);
// app.use("/api/application", applicationRoute);
const corsOptions = {
  origin: ["http://localhost:5173", "https://job-portal-bay-two-88.vercel.app", "https://job-portal-7lnijfcq7-mitalis423-4195s-projects.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 

const PORT = process.env.PORT || 5001;
 
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

