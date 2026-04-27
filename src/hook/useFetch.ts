import { useEffect, useState } from "react";

export const useFetch = <T>({ queryFn }: { queryFn: () => Promise<T> }) => {
  const [data, setData] = useState<T | []>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      setIsSuccess(false);
      setError(false);

      try {
        const data = await queryFn();
        setData(data);
        setIsSuccess(true);
      }
      catch {
        setError(true);
      }
      finally {
        setIsFetching(false);
      }

    }
    fetch();
  }, [queryFn]);

  return {
    data,
    setData,
    isFetching,
    isSuccess,
    error
  }

};