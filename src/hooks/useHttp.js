import { useCallback, useEffect, useState } from "react";

// Reusable HTTP request function
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // use null for better conditional checks

  function clearData() {
    setData(initialData); // reset to initial value, not empty string
  }

  const sendRequest = useCallback(
    async function (bodyData = null) {
      setIsLoading(true);
      setError(null);

      try {
        const finalConfig = { ...config };

        // Add body only if it exists and method is not GET
        if (bodyData && config.method !== "GET") {
          finalConfig.body = JSON.stringify(bodyData);
        }

        const resData = await sendHttpRequest(url, finalConfig);
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }

      setIsLoading(false);
    },
    [url, config]
  );

  // Auto-trigger for GET requests
  useEffect(() => {
    if (config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
