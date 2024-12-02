import { useState } from "react";
import { Result } from "neverthrow";
import { useToast } from "./use-toast";

export type ErrorObject = {
  message: string;
  [key: string]: string;
};

type AsyncNeverthrowFunction = (
  ...params: any[]
) => Promise<Result<any, ErrorObject>>;

interface Config {
  uiErrorMessage?: string;
  uiSuccessMessage?: string;
  showToast?: boolean;
  showResultError?: boolean;
  immediate?: boolean;
}

export default function useNeverthrowAsync<T extends AsyncNeverthrowFunction>(
  asyncFunction: T,
  {
    uiErrorMessage = "The operation wasn't successful",
    uiSuccessMessage = "The operation was successful",
    showToast = true,
    immediate = false,
  }: Config = {}
) {
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState<null | string>(null);
  const { toast } = useToast();

  async function wrapper(
    ...args: Parameters<T>
  ): Promise<Awaited<Result<any, ErrorObject>>> {
    // reset to initial states
    setIsLoading(true);
    setError(null);

    const result = await asyncFunction(...args);
    if (result.isErr()) {
      setError(result.error.message);
      if (showToast && uiErrorMessage) {
        toast({
          variant: "destructive",
          description: `${uiErrorMessage}. ${
            result.error.code ? result.error.code : ""
          } ${result.error.message}`,
        });
      }
    } else {
      setError(null);
      if (showToast && uiSuccessMessage) {
        toast({
          variant: "success",
          description: uiSuccessMessage,
        });
      }
    }

    setIsLoading(false);
    return result;
  }

  const result: [
    (...args: Parameters<T>) => Promise<Awaited<Result<any, ErrorObject>>>,
    boolean,
    string | null
  ] = [wrapper, isLoading, error];
  return result;
}
