import React, { useEffect, useState } from "react";
import {
  Box,
  Link,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  LinearProgress,
} from "@mui/material";
import { SearchBar } from "components";
import useService from "hooks/useService";
import { QueryType } from "hooks/useService/types";
import { ClientService } from "services/Client.Services";
import { User } from "models/schema";
import { useDataContext } from "context/DataContext";
import { userFilter } from "utils";
import { useModal } from "hooks";
import UserDetailsDialog from "../UserDetailsDialog";

interface RowData {
  email: string;
  name: string;
  subscriptionType: string;
  registrationDate: string;
  details: string;
}

const createData = (
  email: string,
  name: string,
  subscriptionType: string,
  registrationDate: string,
  details: string
): RowData => {
  return { email, name, subscriptionType, registrationDate, details };
};

// Dummy data
const rows: RowData[] = [
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
  createData(
    "AJohnson@gmail.com",
    "Abigail Johnson",
    "Monthly Active",
    "Jan 9 2024",
    "View Details"
  ),
];

const ManageUserData: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, setData, isOpen, toggleModal } = useModal();
  const { getUsers } = useDataContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClickDetails = (row: User) => {
    setData(row);
    toggleModal();
  };

  useEffect(() => {
    getUsers.onRequest();
  }, []);

  const filteredUsers = userFilter(getUsers.data, searchQuery);

  if (getUsers.isLoading) {
    return <LinearProgress />;
  }

  return (
    <React.Fragment>
      <Box>
        <SearchBar
          placeholder="Search User by Email, First or Last Name"
          onChange={handleSearch}
        />
      </Box>
      <Box flex={1} overflow={"auto"} mb={2}>
        <TableContainer component={Paper}>
          <Table
            className="user__table"
            sx={{ minWidth: 650 }}
            aria-label="subscription table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Subscription Type</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers &&
                filteredUsers?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Typography>
                        {/* {row.subscriptionType.split(" ")[0]} */}
                        Subscription Type
                      </Typography>
                      <Typography>
                        {/* {row.subscriptionType.split(" ")[1]} */}
                        Sub Status
                      </Typography>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell
                      onClick={() => handleClickDetails(row)}
                      sx={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      {"View Details"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <UserDetailsDialog open={isOpen} onClose={toggleModal} data={data} />
    </React.Fragment>
  );
};

export default ManageUserData;
