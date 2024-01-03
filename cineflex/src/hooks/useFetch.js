import { useEffect, useState } from "react";

const useFetch = (fetchFn, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchFn()
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [fetchFn]);

  return { data, isLoaded };
};

export default useFetch;
