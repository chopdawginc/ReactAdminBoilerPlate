import { useState, useEffect, useCallback } from "react";
import {
  Query,
  DocumentData,
  getDocs,
  query as firestoreQuery,
  limit,
  startAfter,
  QuerySnapshot,
} from "firebase/firestore";

interface UseFirestorePaginationProps {
  query: Query<DocumentData>;
  pageSize: number;
}

export interface UseFirestorePaginationReturn<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  loadMore: () => void;
  refetch: () => void;
  hasMore: boolean;
}

export const useFirestorePagination = <T,>({
  query,
  pageSize,
}: UseFirestorePaginationProps): UseFirestorePaginationReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchData = async (isLoadMore: boolean = false) => {
    setLoading(true);
    try {
      let currentQuery = query;

      if (lastVisible && isLoadMore) {
        currentQuery = firestoreQuery(query, startAfter(lastVisible), limit(pageSize));
      } else {
        currentQuery = firestoreQuery(query, limit(pageSize));
      }

      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(currentQuery);

      if (!querySnapshot.empty) {
        const newData = querySnapshot.docs.map((doc) => doc.data() as T);

        setData((prevData) => [...prevData, ...newData]);

        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisible(lastDoc);

        if (querySnapshot.size < pageSize) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      fetchData(true);
    }
  }, [isLoadingMore, hasMore]);

  const refetch = useCallback(() => {
    setData([]);
    setLastVisible(null);
    setHasMore(true);
    setError(null);
    fetchData(false);
  }, [query, pageSize]);

  return { data, loading, error, loadMore, refetch, hasMore };
};
