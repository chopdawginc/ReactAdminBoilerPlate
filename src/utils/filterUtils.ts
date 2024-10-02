import moment from "moment";
import { getNestedValue } from "./stringUtils";
import {
  BookingsType,
  CoordinatesType,
  IAddRatesFormType,
  UserType,
} from "types";
import { User } from "models/schema";

// User Search Filter
export const userFilter = (data: User[] | null, searchTerm: string) => {
  return data?.filter((user) => {
    const nameMatch = user?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = user?.email
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return nameMatch || emailMatch;
  });
};
// export const UserFilter = (data: UserType[], searchTerm: string) => {
//   return data?.filter((user) => {
//     const idMatch = user?.id?.toLowerCase().includes(searchTerm.toLowerCase());
//     const firstNameMatch = user?.firstName
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const lastNameMatch = user?.lastName
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const cityMatch = user?.address?.city
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     return idMatch || firstNameMatch || lastNameMatch || cityMatch;
//   });
// };

// Sort Filter
export const sortData = (
  data: any[],
  key: string,
  direction: "asc" | "desc"
) => {
  console.log("ticketSort", data);
  const sortedArray = [...data];
  sortedArray.sort((a, b) => {
    const aValue = getNestedValue(a, key);
    const bValue = getNestedValue(b, key);

    if (aValue === undefined || aValue === null) return 1;
    if (bValue === undefined || bValue === null) return -1;

    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sortedArray;
};

// Location Search Filter
export const LocationFilter = (
  data: IAddRatesFormType[],
  searchTerm: string
) => {
  if (!searchTerm) return data;

  return data.filter((location) => {
    const zipCodeMatch =
      location?.zipCode
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || false;
    const areaMatch =
      location?.area?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const cityMatch =
      location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const priceMatch =
      location?.bookingFee
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || false;

    const hasRelevantData =
      location?.zipCode ||
      location?.area ||
      location?.city ||
      location?.bookingFee;

    return (
      hasRelevantData && (zipCodeMatch || areaMatch || cityMatch || priceMatch)
    );
  });
};

// Sort Booking Data Function
export const sortBookingsData = (
  data: BookingsType[],
  key: string,
  direction: "asc" | "desc"
) => {
  const sortedArray = [...data];

  sortedArray.sort((a, b) => {
    const aValue = getNestedValue(a, key);
    const bValue = getNestedValue(b, key);

    // Check if values are undefined
    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    // Check if Dates or Not
    const aDate = aValue?.toDate
      ? moment(aValue.toDate())
      : moment(aValue, moment.ISO_8601, true);
    const bDate = bValue?.toDate
      ? moment(bValue.toDate())
      : moment(bValue, moment.ISO_8601, true);

    // If both values are valid dates, compare them as dates
    if (aDate.isValid() && bDate.isValid()) {
      if (aDate.isBefore(bDate)) return direction === "asc" ? -1 : 1;
      if (aDate.isAfter(bDate)) return direction === "asc" ? 1 : -1;
      return 0;
    }

    // Handle number comparison
    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      if (aValue.toLowerCase() < bValue.toLowerCase())
        return direction === "asc" ? -1 : 1;
      if (aValue.toLowerCase() > bValue.toLowerCase())
        return direction === "asc" ? 1 : -1;
      return 0;
    }

    return 0;
  });
  return sortedArray;
};

// Sort Coordinates Data Function
export const sortCoordinatesData = (
  data: CoordinatesType[],
  key: string,
  direction: "asc" | "desc"
) => {
  const sortedArray = [...data];

  sortedArray.sort((a, b) => {
    const aValue = getNestedValue(a, key);
    const bValue = getNestedValue(b, key);

    // Check if values are undefined
    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    // Check if Dates or Not
    const aDate = aValue?.toDate
      ? moment(aValue.toDate())
      : moment(aValue, moment.ISO_8601, true);
    const bDate = bValue?.toDate
      ? moment(bValue.toDate())
      : moment(bValue, moment.ISO_8601, true);

    // If both values are valid dates, compare them as dates
    if (aDate.isValid() && bDate.isValid()) {
      if (aDate.isBefore(bDate)) return direction === "asc" ? -1 : 1;
      if (aDate.isAfter(bDate)) return direction === "asc" ? 1 : -1;
      return 0;
    }

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      if (aValue.toLowerCase() < bValue.toLowerCase())
        return direction === "asc" ? -1 : 1;
      if (aValue.toLowerCase() > bValue.toLowerCase())
        return direction === "asc" ? 1 : -1;
      return 0;
    }

    return 0;
  });
  return sortedArray;
};

// Sort SitterApplication Data Function
export const sortSitterApplicationData = (
  data: UserType[],
  key: string,
  direction: "asc" | "desc"
) => {
  const sortedArray = [...data];

  sortedArray.sort((a, b) => {
    const aValue = getNestedValue(a, key);
    const bValue = getNestedValue(b, key);

    // Check if values are undefined
    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    // Check if Dates or Not
    const aDate = aValue?.toDate
      ? moment(aValue.toDate())
      : moment(aValue, moment.ISO_8601, true);
    const bDate = bValue?.toDate
      ? moment(bValue.toDate())
      : moment(bValue, moment.ISO_8601, true);

    // If both values are valid dates, compare them as dates
    if (aDate.isValid() && bDate.isValid()) {
      if (aDate.isBefore(bDate)) return direction === "asc" ? -1 : 1;
      if (aDate.isAfter(bDate)) return direction === "asc" ? 1 : -1;
      return 0;
    }

    // Handle number comparison
    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      console.log("string called");
      if (aValue.toLowerCase() < bValue.toLowerCase())
        return direction === "asc" ? -1 : 1;
      if (aValue.toLowerCase() > bValue.toLowerCase())
        return direction === "asc" ? 1 : -1;
      return 0;
    }

    return 0;
  });
  return sortedArray;
};
