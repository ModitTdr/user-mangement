import { useEffect, useState } from "react";

export const useFetch = <T>({ queryFn }: { queryFn: () => Promise<T> }) => {
  const [data, setData] = useState<T>([] as T);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await queryFn();
        setData(data);
        setIsSuccess(true);
      }
      catch {
        setError(true);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [queryFn]);

  return {
    data,
    setData,
    isLoading,
    isSuccess,
    error
  }

};