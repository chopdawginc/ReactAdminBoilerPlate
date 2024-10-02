import { Button, Grid } from "@mui/material";
import { TextEditor } from "components";
import { useNotification } from "context/NotificationContext";
import { useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { auth } from "libs/firebase/@firebase";
import { AppContent } from "models/schema";
import { EAppContentSubType, EAppContentType } from "models/types";
import React, { useState } from "react";
import { ApplicationContentService } from "services/AppContent.Services";

const LegalContents = () => {
  const [tc, setTC] = useState<string>("");
  const [pp, setPP] = useState<string>("");
  const [md, setMD] = useState<string>("");

  const { setAlert } = useNotification();

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

  const legalContents = getAppContents.data?.filter((content) => {
    return content.type == EAppContentType.Legal;
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
      case EAppContentSubType.TC:
        params = { ...params, content: tc };
        break;
      case EAppContentSubType.PP:
        params = { ...params, content: pp };
        break;
      case EAppContentSubType.MD:
        params = { ...params, content: md };
        break;
      default:
        throw new Error("Invalid update type");
    }

    await updateAppContent.onRequest(params);
  };

  const tcData = legalContents?.find(
    (legalContent) => legalContent.subType == EAppContentSubType.TC
  );
  const ppData = legalContents?.find(
    (legalContent) => legalContent.subType == EAppContentSubType.PP
  );
  const mdData = legalContents?.find(
    (legalContent) => legalContent.subType == EAppContentSubType.MD
  );

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextEditor
          data={tcData?.content}
          title="Terms and Conditions"
          handleSave={() =>
            handleSave(EAppContentSubType.TC, tcData?.id ? tcData?.id : null)
          }
          onChange={(value) => setTC(value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextEditor
          data={ppData?.content}
          title="Privacy Policy"
          handleSave={() =>
            handleSave(EAppContentSubType.PP, ppData?.id ? ppData?.id : null)
          }
          onChange={(value) => setPP(value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextEditor
          data={mdData?.content}
          title="Medical Disclaimer"
          handleSave={() =>
            handleSave(EAppContentSubType.MD, mdData?.id ? mdData?.id : null)
          }
          onChange={(value) => setMD(value)}
        />
      </Grid>
    </React.Fragment>
  );
};

export default LegalContents;
