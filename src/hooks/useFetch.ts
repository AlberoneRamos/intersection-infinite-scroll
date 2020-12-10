import { useState, useEffect } from 'react';
import axios from 'axios';

type Data = Array<{
  [key: string]: string
}>;

const useFetch = (url: string) => {
  const [data, setData] = useState<Data>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData((data) => [...data, ...res.data]);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        return e;
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading
  };
};

export default useFetch;