import React, { useState, useEffect } from "react";

interface UseOnSnapshotDataProps<T> {
  onRequestService: (params: any) => Promise<{ data: T; unsubscribe?: () => void }>;
  onError?: (error: any) => void;
  onSuccess?: (data: T) => void;
}

export interface UseOnSnapshotReturn<T> {
  isLoading: boolean;
  error: any | null;
  setError: React.Dispatch<React.SetStateAction<any | null>>;
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  onRequest: (params?: any) => Promise<T>;
}

const useOnSnapshot = <T,>({
  onRequestService,
  onError,
  onSuccess,
}: UseOnSnapshotDataProps<T>): UseOnSnapshotReturn<T> => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Uncomment and use unsubscribe state if needed in the future
  // const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);

  // Uncomment if you want to handle cleanup for the unsubscribe function
  // useEffect(() => {
  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, [unsubscribe]);

  const dataCallback = (data: T) => {
    setData(data);
    onSuccess && onSuccess(data);
  };

  const errorCallback = (error: any) => {
    setError(error);
    onError && onError(error);
  };

  const onRequest = async (params: any): Promise<T> => {
    setLoading(true);

    try {
      const response = await onRequestService({
        ...params,
        dataCallback,
        errorCallback,
      });
      setLoading(false);
      // Uncomment if you want to use the unsubscribe functionality
      // setUnsubscribe(response.unsubscribe);
      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { isLoading, error, setError, data, setData, onRequest };
};

export default useOnSnapshot;
