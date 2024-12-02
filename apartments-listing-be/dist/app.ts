import dotenv from "dotenv";
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const apartmentRoutes = require("./routes/apartmentRoutes");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

// load environment variables from .env file
dotenv.config();

// initialize the Express app
const app = express();

app.use(express.json());

// initialize the supabase client with environment variables
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

// to allow cross origin access
app.use(cors(corsOptions));
// pass supabase client to routes
app.use("/api/apartments", apartmentRoutes(supabase));

// start the server on port 8080
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
