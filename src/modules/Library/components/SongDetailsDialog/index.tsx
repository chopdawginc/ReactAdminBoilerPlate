import { useModal, useService } from "hooks";
import React, { FC, useEffect } from "react";
import { Song, User } from "models/schema";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  Box,
} from "@mui/material";
import { SongWithProviderName } from "../LibraryTable";
import { CBox } from "components";
import { CheckBox } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { ESongStatus } from "models/types";
import { QueryType } from "hooks/useService/types";
import { LibraryService } from "services/Library.Services";
import { useDataContext } from "context/DataContext";
import { formatDuration } from "utils/formatSongDuration";
import dayjs from "dayjs";

interface SongDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  data: Song;
}

const SongDetailsDialog: FC<SongDetailsDialogProps> = ({ open, onClose, data }) => {
  const modal = useModal();

  const [isActive, setIsActive] = React.useState("");
  const [name, setName] = React.useState("");
  const [isEditName, setIsEditName] = React.useState(false);

  const updateSong = useService({
    type: QueryType.MUTATION,
    onRequestService: LibraryService.updateSong,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsActive(ESongStatus.Active);
    } else if (!event.target.checked) {
      setIsActive(ESongStatus.Inactive);
    }
  };

  useEffect(() => {
    data?.status && setIsActive(data.status);
    data?.title && setName(data.title);
  }, [data]);

  const handleClose = () => {
    setIsEditName(false);
    setIsActive("");
    setName("");
    onClose();
  };

  const { getSongs, getProviders } = useDataContext();

  const handleUpdateSong = async () => {
    await updateSong.onRequest({
      title: name,
      status: isActive,
      docId: data.id,
    });
    getSongs.refetch();
    handleClose();
  };

  const provider = getProviders.data?.find((provider) => provider.id == data?.provider?.id);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth={"lg"}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: "30px 8px 24px 8px",
        },
      }}
    >
      <DialogContent>
        <CBox jsb>
          <CBox col flex={1}>
            <CBox ac>
              <Typography variant="h4_bold">Song ID</Typography>
              <IconButton aria-label="edit" onClick={() => setIsEditName(true)}>
                <EditIcon />
              </IconButton>
            </CBox>
            {isEditName ? (
              <TextField
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
              />
            ) : (
              <Typography variant="h4_bold" sx={{ paddingRight: 2 }}>
                {data?.title}
              </Typography>
            )}
          </CBox>
          <CBox col flex={1}>
            <Typography variant="h4_bold">Provider Company</Typography>
            <Typography variant="h2_bold">{provider?.name}</Typography>
          </CBox>
          <CBox col flex={1}>
            <Typography variant="h4_bold">Provider ID</Typography>
            <Typography variant="h2_bold">{provider?.id}</Typography>
          </CBox>
        </CBox>

        <CBox mt={5} jsb>
          <CBox col flex={1}>
            <Typography variant="h4_bold">Song Length</Typography>
            <Typography variant="h2_bold">{formatDuration(data?.duration)}</Typography>
          </CBox>
          <CBox col flex={1}>
            <Typography variant="h4_bold">Times Skipped</Typography>
            <Typography variant="h2_bold">{data?.timesSkipped}</Typography>
          </CBox>
          <CBox col flex={1}>
            <Typography variant="h4_bold">Times Played</Typography>
            <Typography variant="h2_bold">{data?.timesPlayed}</Typography>
          </CBox>
        </CBox>

        <CBox mt={5} jsb>
          <CBox col flex={1}>
            <Typography variant="h4_bold">BPM</Typography>
            <Typography variant="h2_bold">{data?.bpm}</Typography>
          </CBox>
          <CBox col flex={1}>
            <Typography variant="h4_bold">Song Added on</Typography>
            <Typography variant="h2_bold">
              {dayjs(data?.createdAt?.toDate()).format("MM DD YYYY")}
            </Typography>
          </CBox>
          <CBox col flex={1}>
            <Typography variant="h4_bold">Status</Typography>
            <Box>
              <FormControlLabel
                sx={{ marginLeft: 0 }}
                value={isActive}
                control={
                  <Switch
                    checked={isActive == ESongStatus.Active}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Active"
                labelPlacement="start"
              />
            </Box>
          </CBox>
        </CBox>
      </DialogContent>
      <CBox jc>
        <Button variant="contained" disabled={updateSong.isLoading} onClick={handleUpdateSong}>
          Save
        </Button>
      </CBox>
    </Dialog>
  );
};

export default SongDetailsDialog;
