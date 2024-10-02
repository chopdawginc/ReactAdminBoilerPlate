import React, { useEffect } from "react";
import { COLLECTIONS, COLORS } from "constant";
import { BlissTipsCard, CBox } from "components";
import { Box, Grid, TextField, Typography, LinearProgress } from "@mui/material";
import { BlissTip } from "models/schema";
import useService from "hooks/useService";
import { auth } from "libs/firebase/@firebase";
import { Timestamp } from "firebase/firestore";
import useOnSnapshot from "hooks/useOnSnapshot";
import { QueryType } from "hooks/useService/types";
import LoadingButton from "@mui/lab/LoadingButton";
import { BlissTipsService } from "services/BlissTips.Services";
import { getDocumentReference } from "utils/firebaseUtils";

const BlissTipsData = () => {
  const [text, setText] = React.useState("");

  const { onRequest, data, isLoading } = useOnSnapshot({
    onRequestService: BlissTipsService.getBlissTips,
  });

  const saveBlissTip = useService({
    type: QueryType.MUTATION,
    onRequestService: BlissTipsService.storeBlissTip,
  });

  const deleteBlissTip = useService({
    type: QueryType.MUTATION,
    onRequestService: BlissTipsService.deleteBlissTipById,
  });

  useEffect(() => {
    onRequest();
  }, []);

  const handleSaveBlissTip = async () => {
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user found.");
    }

    const data: Omit<BlissTip, "id"> = {
      content: text,
      createdAt: Timestamp.now(),
      createdBy: getDocumentReference(COLLECTIONS.ADMINS, currentUser.uid),
    };
    await saveBlissTip.onRequest(data);
    setText("");
  };

  const handleDeleteBlissTip = async (id: string) => {
    await deleteBlissTip.onRequest({ id });
  };

  return (
    <React.Fragment>
      <Grid
        item
        md={3}
        sm={9}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        order={{ xs: 2, sm: 2, md: 1 }}
      >
        <Typography variant="h5_bold">Current Tips</Typography>
        <Box flex={1} overflow={"auto"}>
          <CBox col mr={2} mt={3}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              data?.map((tip, index) => {
                return (
                  <BlissTipsCard
                    text={tip.content}
                    key={index}
                    onDelete={() => handleDeleteBlissTip(tip.id)}
                  />
                );
              })
            )}
          </CBox>
        </Box>
      </Grid>

      <Grid item md={6} sm={9} px={4} order={{ xs: 1, sm: 1, md: 2 }}>
        <Typography variant="h5_bold">Create a Bliss Tips</Typography>
        <CBox bgcolor={COLORS.gray.thinner} mt={1} p={2}>
          <TextField
            rows={5}
            fullWidth
            multiline
            value={text}
            variant="outlined"
            inputProps={{ maxLength: 100 }}
            onChange={(e) => setText(e.target.value)}
            helperText={`${text.length}/100 characters`}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
              "& .MuiFormHelperText-root": {
                alignSelf: "flex-end",
                margin: 0,
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          />
        </CBox>
        <CBox je mt={2}>
          <LoadingButton
            variant="contained"
            onClick={handleSaveBlissTip}
            loading={saveBlissTip.isLoading}
            disabled={text.length == 0}
          >
            Save Tip
          </LoadingButton>
        </CBox>
      </Grid>
    </React.Fragment>
  );
};

export default BlissTipsData;
