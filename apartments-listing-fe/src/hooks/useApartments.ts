import { useEffect, useState } from "react";
import useNeverthrowAsync from "./useNeverthrowAsync";
import { Tables } from "@/types/supabase";
import { fetchApartments } from "@/lib/apis/apartmentsApis";

interface Config {
  search?: string;
}

export default function useApartments({ search }: Config = {}) {
  // state to store apartments
  const [apartments, setApartments] = useState<Tables<"apartments">[]>([]);

  // useNeverthrowAsync hook to fetch apartments using the fetchApartments function and handle loading state
  const [getApartments, loading] = useNeverthrowAsync(
    async function getApartments() {
      const result = await fetchApartments(search);

      // if the operation was successful, set apartments
      if (result.isOk()) {
        setApartments(result.value);
      }

      return result;
    },
    // won't show success message when successfuly fetching apartments
    {
      uiSuccessMessage: "",
      uiErrorMessage: "Failed to load apartments",
      // to start fetching apartments immediately
      immediate: true,
    }
  );
  // fetch on change of page and search
  useEffect(
    function getAndSetApartments() {
      getApartments();
    },
    [search]
  );
  // return apartments and loading
  return { apartments, loading };
}
