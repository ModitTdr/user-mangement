import { useState } from "react";

export const useMutation = <T1, T2>({ mutateFn }: { mutateFn: (data: T1) => Promise<T2> }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const mutate = async (data: T1) => {
    setIsLoading(true);
    try {
      const result = await mutateFn(data);
      setIsSuccess(true);
      return result;
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
  }
};