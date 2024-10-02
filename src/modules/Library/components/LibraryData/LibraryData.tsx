import { DateRange } from "types";
import React, { useRef, useState } from "react";
import LibraryTable from "../LibraryTable";
import { Button, Typography, Box } from "@mui/material";
import { CBox, DateRangePicker } from "components";
import UploadSongsDialog from "../UploadSongsDialog";

const LibraryData: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadSongsModal, setUploadSongsModal] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
      filesArray.forEach((file) => {
        console.log(file);
      });
      setUploadSongsModal(true);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCloseSongsModal = () => {
    setUploadSongsModal(false);
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <React.Fragment>
      <CBox jsb as wrp>
        <DateRangePicker
          onFromDateChange={(val) =>
            setDateRange((prevState) => ({ ...prevState, from: val }))
          }
          onToDateChange={(val) =>
            setDateRange((prevState) => ({ ...prevState, to: val }))
          }
        />
        <CBox as>
          <CBox col>
            <Button variant="contained">
              <span style={{ marginRight: "10px" }}>Filter:</span> |{" "}
              <span style={{ marginLeft: "10px" }}>Music Company 1</span>
            </Button>
            <CBox ac>
              <Typography>Download Report (CSV or PDF)</Typography>
              <img
                src="/assets/icons/download-btn.svg"
                onClick={() => alert("clicked")}
              />
            </CBox>
          </CBox>
          <Box>
            <input
              hidden
              multiple
              type="file"
              accept="audio/*"
              ref={fileInputRef}
              id="audio-upload-input"
              onChange={handleFileChange}
            />
            <Button variant="contained" onClick={handleUploadClick}>
              Upload Songs
            </Button>
          </Box>
        </CBox>
      </CBox>
      <LibraryTable dateRange={dateRange} />
      <UploadSongsDialog
        open={uploadSongsModal}
        onClose={handleCloseSongsModal}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </React.Fragment>
  );
};

export default LibraryData;
