import { useEffect, useState, useCallback } from "react";

export default function useFetchDataHook<T>(url: string) {
  const [data, setData] = useState<{
    isLoading: boolean;
    isError: boolean;
    data: T | undefined;
  }>({
    isLoading: true,
    isError: false,
    data: undefined,
  });

  const fetchAnnouncements = useCallback(async () => {
    try {
      setData({
        isLoading: true,
        isError: false,
        data: undefined,
      });
      const response = await fetch(url);

      if (response.status !== 200) {
        throw "Error";
      }

      const data = await response.json();

      setData({
        isLoading: false,
        isError: false,
        data: data,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({
        isLoading: false,
        isError: true,
        data: undefined,
      });
    }
  }, [url]);

  const reloadData = useCallback(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return { data, reloadData };
}
