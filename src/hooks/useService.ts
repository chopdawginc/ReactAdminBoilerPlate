import { useState, useEffect, useRef } from "react";

export enum QueryType {
  QUERY = "QUERY",
  MUTATION = "MUTATION",
}

export interface ParamsType {
  variables?: any;
  type: QueryType;
  onError?: (error: Error) => any;
  onSuccess?: (response: any) => any;
  onRequestService: (params?: any) => Promise<any>;
  useCache?: boolean;
}

export type ErrorState = {
  code: string;
  message: string;
} | null;

export interface ServiceState<T> {
  data: T | null;
  isLoading: boolean;
  error: ErrorState;
  setError: React.Dispatch<React.SetStateAction<ErrorState>>;
  refetch: () => void;
  onRequest: (params?: any) => Promise<T | undefined>;
}

const useService = <T>(params: ParamsType): ServiceState<T> => {
  const { type, onError, onSuccess, onRequestService, variables, useCache } = params;

  const [data, setData] = useState<T | null>(null);
  const hasFetched = useRef<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>(null);

  useEffect(() => {
    if (type === QueryType.QUERY) {
      if (useCache && hasFetched.current) return;
      onRequest();
    }
  }, [type, hasFetched]);

  const refetch = () => {
    hasFetched.current = false;
    onRequest(params);
  };

  const onRequest = async (params?: any): Promise<T | undefined> => {
    if (useCache && hasFetched.current) return;

    setLoading(true);
    setError(null);

    return new Promise(async (resolve, reject) => {
      try {
        const response = await onRequestService(variables || params);
        setData(response);
        setError(null);
        setLoading(false);
        onSuccess && onSuccess(response);
        hasFetched.current = true;
        resolve(response as T);
      } catch (error: any) {
        setError(error);
        setLoading(false);
        onError && onError(error);
        console.log(error);
        reject(error);
      }
    });
  };

  return { isLoading, error, data, onRequest, setError, refetch };
};

export default useService;
