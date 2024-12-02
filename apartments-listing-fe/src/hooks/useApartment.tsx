import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import useNeverthrowAsync from "./useNeverthrowAsync";
import { fetchApartmentById } from "@/lib/apis/apartmentsApis";

export default function useApartment(apartmentId: number) {
  // state to store apartment
  const [apartment, setApartment] = useState<Tables<"apartments"> | null>(null);

  // useNeverthrowAsync hook to fetch apartment using the fetchApartmentById function and handle loading state
  const [getApartment, loading] = useNeverthrowAsync(
    async function getApartment() {
      const fetchApartmentResult = await fetchApartmentById(apartmentId);

      // if the operation was successful, set apartment
      if (fetchApartmentResult.isOk()) {
        setApartment(fetchApartmentResult.value);
      }

      return fetchApartmentResult;
    },
    // won't show success message when successfuly fetching apartment
    {
      uiSuccessMessage: "",
      uiErrorMessage: "Failed to load apartment",
      immediate: true,
    }
  );

  // fetch on change of id
  useEffect(() => {
    getApartment();
  }, [apartmentId]);

  // return apartment and loading
  return { apartment, loading };
}
