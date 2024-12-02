import { SupabaseClient } from "@supabase/supabase-js";
const express = require("express");
const {
  getApartments,
  getApartmentDetails,
  addApartment,
} = require("../controllers/apartmentController");

const apartmentRoutes = (supabase: SupabaseClient) => {
  // create router instance
  const router = express.Router();

  // pass supabase client to controller functions
  router.get("/", getApartments(supabase)); // Getting all apartments
  router.get("/:id", getApartmentDetails(supabase)); // Getting apartment details by ID
  router.post("/", addApartment(supabase)); // Adding a new apartment

  return router;
};

module.exports = apartmentRoutes;
