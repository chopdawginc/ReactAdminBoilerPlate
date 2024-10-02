export enum QueryType {
   QUERY = 'QUERY',
   MUTATION = 'MUTATION',
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
