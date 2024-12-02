import { createClient } from "@supabase/supabase-js";
import express from "express";
import apartmentRoutes from "./routes/apartmentRoutes";
import dotenv from "dotenv";
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

// load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// initalize supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

// to allow cross origin access
app.use(cors(corsOptions));
// pass supabase to routes
app.use("/api/apartments", apartmentRoutes(supabase));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
