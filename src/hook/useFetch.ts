import { useEffect, useState } from "react";

export const useFetch = <T>({ queryFn }: { queryFn: () => Promise<T> }) => {
  const [data, setData] = useState<T | []>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      setIsSuccess(false);
      setError(null);

      try {
        const data = await queryFn();
        setData(data);
        setIsSuccess(true);
      }
      catch (error) {
        setError(error);
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