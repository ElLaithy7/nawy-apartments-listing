import { Request, Response } from "express";
import {
  fetchApartments,
  fetchApartmentById,
  createApartment,
} from "../services/apartmentService";
import { SupabaseClient } from "@supabase/supabase-js";

// get all apartments
export const getApartments =
  (supabase: SupabaseClient) => async (req: Request, res: Response) => {
    try {
      // Extract search query from request
      const searchQuery = (req.query.search as string) || "";

      console.log("Search Query:", searchQuery);

      // Fetch apartments using the search query
      const data = await fetchApartments(supabase, searchQuery);

      res.status(200).json(data);
    } catch (error) {
      // Handle errors gracefully
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      console.error("Error fetching apartments:", errorMessage);

      res.status(500).json({ message: errorMessage });
    }
  };
// get apartment details
export const getApartmentDetails =
  (supabase: SupabaseClient) => async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await fetchApartmentById(supabase, id);
      res.json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  };
// add apartment
export const addApartment =
  (supabase: SupabaseClient) => async (req: Request, res: Response) => {
    try {
      const data = await createApartment(supabase, req.body);
      res.status(201).json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  };
