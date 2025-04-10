import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DateRangePickerProps {
  onFromDateChange: (date: Dayjs | null) => void;
  onToDateChange: (date: Dayjs | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onFromDateChange, onToDateChange }) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const handleFromDateChange = (newDate: Dayjs | null) => {
    setFromDate(newDate);
    onFromDateChange(newDate);
  };

  const handleToDateChange = (newDate: Dayjs | null) => {
    setToDate(newDate);
    onToDateChange(newDate);
  };

  return (
    <Box display="flex" alignItems="center">
      <DatePicker
        label="From Date"
        value={fromDate}
        onChange={handleFromDateChange}
        maxDate={toDate || undefined}
      />
      <Box mx={2}>-</Box>
      <DatePicker
        label="To Date"
        value={toDate}
        onChange={handleToDateChange}
        minDate={fromDate || undefined}
      />
    </Box>
  );
};

export default DateRangePicker;
