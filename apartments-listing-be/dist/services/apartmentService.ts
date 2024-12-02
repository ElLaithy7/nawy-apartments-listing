import { Tables } from "./../../src/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

// fetch all apartments
const fetchApartments = (
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
const fetchApartmentById = (supabase: SupabaseClient, id: number) => {
  return new Promise(async (resolve, reject) => {
    // get single row from apartments table matched by id

    const { data, error } = await supabase
      .from("apartments")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      reject(new Error(error.message));
    } else if (!data) {
      reject(new Error(`Apartment with id ${id} not found`));
    } else {
      resolve(data);
    }
  });
};

// add a new apartment
const createApartment = (
  supabase: SupabaseClient,
  apartmentData: Tables<"apartments">
) => {
  return new Promise(async (resolve, reject) => {
    // insert new row into apartments table

    const { data, error } = await supabase
      .from("apartments")
      .insert(apartmentData)
      .single();
    if (error) {
      reject(new Error(error.message));
    } else {
      resolve(data);
    }
  });
};

module.exports = { fetchApartments, fetchApartmentById, createApartment };
