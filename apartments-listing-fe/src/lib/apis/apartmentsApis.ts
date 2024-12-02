import { Tables } from "@/types/supabase";
import axios from "axios";
import { err, ok, Result } from "neverthrow";
import dotenv from "dotenv";

// apis
export type PostgrestError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

// Load environment variables from .env file
dotenv.config();

// fetch all apartments from db
// export const fetchApartments = async (): Promise<
//   Result<Tables<"apartments">[], PostgrestError>
// > => {
//   try {
//     // get all rows from apartments table using /apartments route
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/apartments`
//     );
//     // return apartments
//     return ok(response.data);
//   } catch (error) {
//     console.error("Error fetching apartments:", error);
//     // return err object containing error message, this won't throw an error but makes sure useNeverthrowAsync hook shows an error toast
//     return err({ message: "Failed to fetch apartments" });
//   }
// };

export const fetchApartments = async (
  searchQuery?: string
): Promise<Result<Tables<"apartments">[], PostgrestError>> => {
  try {
    // initialize search params
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    console.log("searchQuerysearchQuery", searchQuery);
    console.log("params", params.toString());
    // fetch apartments using /apartments route including search params if passed
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/apartments?${params.toString()}`
    );

    // return apartments
    return ok(response.data);
  } catch (error: any) {
    console.error("Error fetching apartments:", error);

    // return error object with details
    return err({
      message: error?.response?.data?.message || "Failed to fetch apartments",
    });
  }
};

// fetch apartment details by id
export const fetchApartmentById = async (
  id: number
): Promise<Result<Tables<"apartments">, PostgrestError>> => {
  try {
    // get single row from apartments table matched by id using /apartments/:id route
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`
    );
    // return apartment
    return ok(response.data);
  } catch (error) {
    console.error("Error fetching apartment:", error);
    // return err object containing error message, this won't throw an error but makes sure useNeverthrowAsync hook shows an error toast
    return err({ message: "Failed to fetch apartment" });
  }
};

// add a new apartment
export const addApartment = async (
  apartmentData: Tables<"apartments">
): Promise<Result<Tables<"apartments">, PostgrestError>> => {
  try {
    // insert new row into apartments table using /apartments route
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/apartments`,
      apartmentData
    );
    // return apartment
    return ok(response.data);
  } catch (error) {
    console.error("Error creating apartment:", error);
    // return err object containing error message, this won't throw an error but makes sure useNeverthrowAsync hook shows an error toast
    return err({ message: "Failed to create apartment" });
  }
};
