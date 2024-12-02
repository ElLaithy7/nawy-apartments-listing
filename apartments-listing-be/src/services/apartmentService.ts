import { SupabaseClient } from "@supabase/supabase-js";
import { Tables } from "../types/supabase";

// fetch all apartments
export const fetchApartments = (
  supabase: SupabaseClient,
  searchQuery: string = ""
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = supabase.from("apartments").select("*");

      // match search query using ilike operator to match all cases
      if (searchQuery.trim() !== "") {
        query = query.or(
          `name.ilike.%${searchQuery}%,project.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        reject(new Error(error.message));
      } else {
        resolve(data);
      }
    } catch (err) {
      reject(err);
    }
  });
};
// fetch apartment details by id
export const fetchApartmentById = async (
  supabase: SupabaseClient,
  id: string
) => {
  // get single row from apartments table matched by id
  const { data, error } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", id)
    .single();

  console.log("fetched apartment", data);

  if (error) {
    console.log("Error fetching apartment", error);
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error(`Apartment with id ${id} not found`);
  }
  return data;
};

// add a new apartment
export const createApartment = async (
  supabase: SupabaseClient,
  apartmentData: Tables<"apartments">
) => {
  // insert new row into apartments table
  const { data, error } = await supabase
    .from("apartments")
    .insert([apartmentData])
    .single();

  console.log("created apartment", data);
  if (error) {
    console.log("Error creating apartment", error);
    throw new Error(error.message);
  }
  return data;
};
