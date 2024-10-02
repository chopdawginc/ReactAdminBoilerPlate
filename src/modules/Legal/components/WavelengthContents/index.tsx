import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { CBox, CustomTextField, TextEditor } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EAppContentSubType, EAppContentType } from "models/types";
import { useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { ApplicationContentService } from "services/AppContent.Services";
import { AppContent } from "models/schema";
import { auth } from "libs/firebase/@firebase";
import { useNotification } from "context/NotificationContext";

const schema = yup.object().shape({});

const WavelengthContents = () => {
  const [stressLess, setStressLess] = useState<string>("");
  const [findFocus, setFindFocus] = useState<string>("");
  const [moveMotivated, setMoveMotivated] = useState<string>("");

  const { setAlert } = useNotification();

  const methodsForMonthly = useForm({
    // resolver: yupResolver(schema),
  });

  const methodsForAnnual = useForm({
    // resolver: yupResolver(schema),
  });

  const handleUpdateMonthly = (data: any) => {
    console.log(data);
  };

  const handleUpdateAnnual = (data: any) => {
    console.log(data);
  };

  //   const handleSave = async (updateType: EAppContentSubType) => {
  //    // Define the update functions map
  //    const updateFns: Record<EAppContentSubType, (params: any) => Promise<unknown>> = {
  //      [EAppContentSubType.StressLess]: updateStressLess.onRequest,
  //      [EAppContentSubType.FindFocus]: updateFindFocus.onRequest,
  //      [EAppContentSubType.MoveMotivated]: updateMoveMotivated.onRequest,
  //      [EAppContentSubType.TC]: updateMoveMotivated.onRequest,
  //      [EAppContentSubType.PP]: updateMoveMotivated.onRequest,
  //      [EAppContentSubType.MD]: updateMoveMotivated.onRequest,
  //    };

  //    // Get the correct update function based on updateType
  //    const updateFn = updateFns[updateType];

  //    // Define params based on the updateType and corresponding state
  //    let params: any = {};

  //    switch (updateType) {
  //      case EAppContentSubType.StressLess:
  //        params = { content: stressLess };
  //        break;
  //      case EAppContentSubType.FindFocus:
  //        params = { content: findFocus };
  //        break;
  //      case EAppContentSubType.MoveMotivated:
  //        params = { content: moveMotivated };
  //        break;
  //      default:
  //        throw new Error("Invalid update type");
  //    }

  //    // Call the update function with the appropriate params
  //    await updateFn(params);

  //  };

  const updateAppContent = useService<AppContent>({
    type: QueryType.MUTATION,
    onRequestService: ApplicationContentService.updateAppContent,
    onSuccess: (data) =>
      setAlert({
        show: true,
        variant: "success",
        message: "App content updated!",
      }),
  });

  const getAppContents = useService<AppContent[]>({
    type: QueryType.QUERY,
    onRequestService: ApplicationContentService.getAppContents,
  });

  const wavelengthContents = getAppContents.data?.filter((content) => {
    return content.type == EAppContentType.Wavelength;
  });

  const handleSave = async (
    updateType: EAppContentSubType,
    docId: string | null
  ) => {
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user found.");
    }
    if (!docId) {
      throw new Error("Invalid document ID.");
    }

    let params: any = {
      docId,
      adminId: currentUser.uid,
    };

    switch (updateType) {
      case EAppContentSubType.StressLess:
        params = { ...params, content: stressLess };
        break;
      case EAppContentSubType.FindFocus:
        params = { ...params, content: findFocus };
        break;
      case EAppContentSubType.MoveMotivated:
        params = { ...params, content: moveMotivated };
        break;
      default:
        throw new Error("Invalid update type");
    }

    await updateAppContent.onRequest(params);
  };

  const stressLessData = wavelengthContents?.find(
    (wavelengthContent) =>
      wavelengthContent.subType == EAppContentSubType.StressLess
  );
  const findFocusData = wavelengthContents?.find(
    (wavelengthContent) =>
      wavelengthContent.subType == EAppContentSubType.FindFocus
  );
  const moveMotivatedData = wavelengthContents?.find(
    (wavelengthContent) =>
      wavelengthContent.subType == EAppContentSubType.MoveMotivated
  );

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <TextEditor
          data={stressLessData?.content}
          previewBtn
          title="Stress Less"
          handleSave={() =>
            handleSave(
              EAppContentSubType.StressLess,
              stressLessData?.id ? stressLessData?.id : null
            )
          }
          handlePreview={() => alert("preview")}
          onChange={(value) => setStressLess(value)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <TextEditor
          data={findFocusData?.content}
          previewBtn
          title="Find Focus"
          handleSave={() =>
            handleSave(
              EAppContentSubType.FindFocus,
              findFocusData?.id ? findFocusData?.id : null
            )
          }
          handlePreview={() => alert("preview")}
          onChange={(value) => setFindFocus(value)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <TextEditor
          data={moveMotivatedData?.content}
          previewBtn
          title="Move Motivated"
          handleSave={() =>
            handleSave(
              EAppContentSubType.MoveMotivated,
              moveMotivatedData?.id ? moveMotivatedData?.id : null
            )
          }
          handlePreview={() => alert("preview")}
          onChange={(value) => setMoveMotivated(value)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <Box display={"flex"} flexDirection={"column"} p={2} gap={2}>
          <Typography variant="h5_bold">Subscription Pricing</Typography>
          <Box>
            <FormProvider {...methodsForMonthly}>
              <form
                onSubmit={methodsForMonthly.handleSubmit(handleUpdateMonthly)}
              >
                <CBox ae gap={5} wrp>
                  <CustomTextField
                    defaultValue="$9.95"
                    name="monthly"
                    containerStyles={{ flex: 1 }}
                    label="Monthly Subscription"
                  />
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ width: "100px" }}
                  >
                    Save
                  </Button>
                </CBox>
              </form>
            </FormProvider>
            <FormProvider {...methodsForAnnual}>
              <form
                onSubmit={methodsForAnnual.handleSubmit(handleUpdateAnnual)}
              >
                <CBox ae gap={5} mt={4} wrp>
                  <CustomTextField
                    defaultValue="$6.95"
                    name="annual"
                    label="Annual Subscription"
                    containerStyles={{ flex: 1 }}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ width: "100px" }}
                  >
                    Save
                  </Button>
                </CBox>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default WavelengthContents;
