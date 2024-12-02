import { Router } from "express";
import {
  getApartments,
  getApartmentDetails,
  addApartment,
} from "../controllers/apartmentController";
import { SupabaseClient } from "@supabase/supabase-js";

const apartmentRoutes = (supabase: SupabaseClient) => {
  const router = Router();

  // Pass supabase client to controller functions
  router.get("/", getApartments(supabase));
  router.get("/:id", getApartmentDetails(supabase));
  router.post("/", addApartment(supabase));

  return router;
};

export default apartmentRoutes;
