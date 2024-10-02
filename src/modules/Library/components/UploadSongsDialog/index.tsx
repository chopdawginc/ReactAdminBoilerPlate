import React, { useState, ChangeEvent, FC, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { useForm, FormProvider } from "react-hook-form";
import {
  BlissTipsCard,
  CBox,
  CustomDropdown,
  CustomTextField,
  PhoneNumberInput,
} from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import AddProvider from "../AddProviderDialog";
import useOnSnapshot from "hooks/useOnSnapshot";
import { Provider, Song } from "models/schema";
import { LibraryService } from "services/Library.Services";
import { useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { useAuthContext } from "context/AuthContext";
import { useDataContext } from "context/DataContext";

interface UploadSongsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const schema = yup.object().shape({
  provider: yup.string().required("Provider is required"),
  bpm: yup.string().required("BPM is required"),
});

const UploadSongsDialog: FC<UploadSongsDialogProps> = ({
  open,
  onClose,
  selectedFiles,
  setSelectedFiles,
}) => {
  const [addProviderModal, setAddProviderModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const { user } = useAuthContext();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      provider: "",
      bpm: "",
    },
  });

  const { getProviders, getSongs } = useDataContext();

  const { handleSubmit } = methods;

  const handleAddSongs = async (data: any) => {
    await uploadSongs.onRequest({
      ...data,
      setProgress,
      audioFiles: selectedFiles,
      userId: user?.id,
    });
    methods.reset();
    setProgress(0);
    onClose();
    getSongs.refetch();
  };

  const uploadSongs = useService<string>({
    type: QueryType.MUTATION,
    onRequestService: LibraryService.uploadSongs,
  });

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth={"lg"}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: "30px 8px 24px 8px",
        },
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleAddSongs)}>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <CBox wrp gap={8}>
              <CBox col gap={0.5} flex={1}>
                <CustomDropdown
                  name="provider"
                  label="Provider"
                  options={
                    getProviders.data
                      ? getProviders.data?.map((option) => ({
                          name: option.name,
                          value: option.id,
                        }))
                      : []
                  }
                />

                <Typography
                  textAlign={"end"}
                  variant="h5_bold"
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setAddProviderModal(true)}
                >
                  Add New Provider
                </Typography>
              </CBox>
              <Box flex={1}>
                <CustomTextField name="bpm" label="Enter BPM" />
              </Box>
            </CBox>
            <CBox wrp>
              {selectedFiles.map((song, i) => {
                return (
                  <BlissTipsCard
                    key={i}
                    text={song.name}
                    onDelete={() => handleRemoveFile(i)}
                  />
                );
              })}
            </CBox>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              disabled={
                uploadSongs.isLoading ||
                selectedFiles.length == 0 ||
                !methods.formState.isValid
              }
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "20%" }}
            >
              Upload
            </Button>
          </DialogActions>
          {progress > 0 && <LinearProgressWithLabel value={progress} />}
        </form>
      </FormProvider>
      <AddProvider
        open={addProviderModal}
        onClose={() => setAddProviderModal(false)}
      />
    </Dialog>
  );
};

export default UploadSongsDialog;

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
