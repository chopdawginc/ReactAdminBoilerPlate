import { collection, DocumentData, query, where } from "firebase/firestore";
import { useFirestorePagination, UseFirestorePaginationReturn } from "hooks/useFirestorePagination";
import useOnSnapshot, { UseOnSnapshotReturn } from "hooks/useOnSnapshot";
import useService, { ServiceState } from "hooks/useService";
import { ErrorState, ParamsType, QueryType } from "hooks/useService/types";
import { firestore } from "libs/firebase/@firebase";
import { Admin, Provider, Song, User } from "models/schema";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ClientService } from "services/Client.Services";
import { LibraryService } from "services/Library.Services";
import { UsersData } from "types";

interface DataContextType {
  getUsers: ServiceState<User[]>;
  getAdmins: ServiceState<Admin[]>;
  getSongs: UseFirestorePaginationReturn<Song>;
  getProviders: UseOnSnapshotReturn<Provider[]>;
  getUsersData: ServiceState<UsersData>;
  getUsersDataByDateRange: ServiceState<UsersData>;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Fetch all users
  const getUsers = useService<User[]>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getAllUsers,
    useCache: true,
  });

  // Fetch all admins
  const getAdmins = useService<Admin[]>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getAllAdmins,
    useCache: true,
  });

  // Fetch Songs
  const getSongs = useFirestorePagination<Song>({
    query: LibraryService.getAllSongsQuery,
    pageSize: 20,
  });

  // Get Providers
  const getProviders = useOnSnapshot<Provider[]>({
    onRequestService: LibraryService.getProviders,
  });

  // Dashboard data
  const getUsersData = useService<UsersData>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getUsersData,
    useCache: true,
  });

  const getUsersDataByDateRange = useService<UsersData>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getUsersDataByDateRange,
  });

  return (
    <DataContext.Provider
      value={{ getUsers, getAdmins, getSongs, getProviders, getUsersData, getUsersDataByDateRange }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
