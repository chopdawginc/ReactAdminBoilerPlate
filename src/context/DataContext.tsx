import useService, { ServiceState } from 'hooks/useService'
import { ErrorState, ParamsType, QueryType } from 'hooks/useService/types'
import { Admin, Provider, Song, User } from 'collections/schema'
import React, { createContext, useState, useContext, ReactNode } from 'react'
import { ClientService } from 'services/Client.Services'
import { UsersData } from 'types'

interface DataContextType {
  getUsers: ServiceState<User[]>
  getAdmins: ServiceState<Admin[]>
  getUsersData: ServiceState<UsersData>
  getUsersDataByDateRange: ServiceState<UsersData>
}

interface DataProviderProps {
  children: ReactNode
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Fetch all users
  const getUsers = useService<User[]>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getAllUsers,
    useCache: true,
  })

  // Fetch all admins
  const getAdmins = useService<Admin[]>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getAllAdmins,
    useCache: true,
  })

  // Dashboard data
  const getUsersData = useService<UsersData>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getUsersData,
    useCache: true,
  })

  const getUsersDataByDateRange = useService<UsersData>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.getUsersDataByDateRange,
  })

  return (
    <DataContext.Provider
      value={{
        getUsers,
        getAdmins,
        getUsersData,
        getUsersDataByDateRange,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}
