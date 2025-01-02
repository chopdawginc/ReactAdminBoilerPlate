import { useState, useEffect, useCallback, useRef } from "react";
import {
  Query,
  limit,
  startAfter,
  onSnapshot,
  Unsubscribe,
  DocumentData,
  FirestoreError,
  DocumentReference,
  query as firestoreQuery,
} from "firebase/firestore";

interface UseFirestorePaginationRealtimeProps<T> {
  query: Query<DocumentData>;
  pageSize: number;
  referenceFields?: string[];
  nestedReferenceFields?: string[];
  transformDataParams?: any;
  transformData?: (
    item: T,
    referenceFields: string[],
    nestedReferenceFields: string[],
    setRelatedListener: SetRelatedListener,
    transformDataParams?: any
  ) => Promise<T>;
}

type SetRelatedListener = (id: string, ref: DocumentReference) => void;

export interface UseFirestorePaginationRealtimeReturn<T> {
  data: T[];
  loading: boolean;
  error: FirestoreError | null;
  loadMore: () => void;
  refetch: () => void;
  hasMore: boolean;
}

export const useFirestorePaginationRealtime = <T,>({
  query,
  pageSize,
  referenceFields,
  nestedReferenceFields,
  transformData,
  transformDataParams,
}: UseFirestorePaginationRealtimeProps<T>): UseFirestorePaginationRealtimeReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const lastVisibleRef = useRef<DocumentData | null>(null);
  const relatedListeners = useRef<Record<string, Unsubscribe>>({});
  const referenceFieldsRef = useRef(referenceFields || []);
  const nestedReferenceFieldsRef = useRef(nestedReferenceFields || []);

  const setRelatedListener: SetRelatedListener = useCallback((id, ref) => {
    if (relatedListeners.current[id]) return;

    const unsubscribe = onSnapshot(ref, (relatedSnapshot) => {
      if (relatedSnapshot.exists()) {
        setData((prevData) =>
          prevData.map((item: any) => {
            const updatedItem = { ...item };
            for (const field of [
              ...referenceFieldsRef.current,
              ...nestedReferenceFieldsRef.current,
            ]) {
              if ((item as any)[field]?.id === id) {
                updatedItem[`${field}Data`] = relatedSnapshot.data();
              }
            }
            return updatedItem;
          })
        );
      }
    });

    relatedListeners.current[id] = unsubscribe;
  }, []);

  const cleanupListeners = useCallback(() => {
    Object.values(relatedListeners.current).forEach((unsubscribe) => unsubscribe());
    relatedListeners.current = {};
  }, []);

  const fetchData = useCallback(
    async (isLoadMore = false) => {
      setLoading(true);
      try {
        let currentQuery = firestoreQuery(query, limit(pageSize));
        if (isLoadMore && lastVisibleRef.current) {
          currentQuery = firestoreQuery(query, startAfter(lastVisibleRef.current), limit(pageSize));
        }

        const unsubscribe = onSnapshot(
          currentQuery,
          async (snapshot) => {
            if (!snapshot.empty) {
              const newData = await Promise.all(
                snapshot.docs.map(async (doc) => {
                  let item = doc.data() as T;
                  if (transformData) {
                    item = await transformData(
                      item,
                      referenceFieldsRef.current,
                      nestedReferenceFieldsRef.current,
                      setRelatedListener,
                      transformDataParams
                    );
                  }
                  return item;
                })
              );

              setData((prevData) => (isLoadMore ? [...prevData, ...newData] : newData));
              lastVisibleRef.current = snapshot.docs[snapshot.docs.length - 1];
              setHasMore(snapshot.size >= pageSize);
              setLoading(false);
            } else {
              setData([]);
              setHasMore(false);
              setLoading(false);
            }
          },
          (err: FirestoreError) => {
            setLoading(false);
            setError(err);
          }
        );

        return unsubscribe;
      } catch (err) {
        setError(err as FirestoreError);
        setLoading(false);
      } finally {
      }
    },
    [query, pageSize, transformData]
  );

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    const initializeFetch = async () => {
      unsubscribe = await fetchData();
    };
    initializeFetch();

    return () => {
      if (unsubscribe) unsubscribe();
      cleanupListeners();
    };
  }, [query, pageSize, fetchData, cleanupListeners]);

  const loadMore = useCallback(() => {
    if (hasMore) fetchData(true);
  }, [hasMore, fetchData]);

  const refetch = useCallback(() => {
    setData([]);
    lastVisibleRef.current = null;
    setHasMore(true);
    setError(null);
    cleanupListeners();
    fetchData();
  }, [cleanupListeners, fetchData]);

  return { data, loading, error, loadMore, refetch, hasMore };
};
