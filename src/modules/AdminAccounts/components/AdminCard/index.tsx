import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import { CBox } from "components";
import { Admin } from "models/schema";
import { useModal, useService } from "hooks";
import BasicModal from "components/BasicModal";
import { QueryType } from "hooks/useService/types";
import { ClientService } from "services/Client.Services";
import { useDataContext } from "context/DataContext";

type AdminCardProps = {
  data: Admin;
};

const AdminCard: React.FC<AdminCardProps> = ({ data }) => {
  const {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    data: modalData,
    setData,
  } = useModal();

  const deleteAdmin = useService<string>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.deleteAdmin,
  });

  const { getAdmins } = useDataContext();

  const onDelete = async () => {
    await deleteAdmin.onRequest({ uid: data.id });
    getAdmins.refetch();
    closeModal();
  };

  return (
    <>
      <Card sx={{ backgroundColor: "#f5f5f5", padding: 2, borderRadius: 2 }}>
        <CardContent>
          <CBox jsb ac wrp>
            <Typography variant="h5_bold">{data.role}</Typography>
            <Typography variant="h5_bold" textTransform={"capitalize"}>
              {data.currentStatus.status}
            </Typography>
          </CBox>
          <CBox wrp jsb as height={"150px"} gap={0.5}>
            <CBox col mt={2}>
              <Typography variant="h5">{data.name}</Typography>
              <Typography variant="h5">{data.email}</Typography>
              <Typography variant="h5">{data.phone}</Typography>
            </CBox>
            <CBox mt={2}>
              <IconButton aria-label="edit">
                <img src="/assets/icons/edit-btn.svg" />
              </IconButton>

              <IconButton aria-label="delete" onClick={openModal}>
                <img src="/assets/icons/close-btn.svg" />
              </IconButton>
            </CBox>
          </CBox>
        </CardContent>
      </Card>
      <BasicModal
        open={isOpen}
        onClose={closeModal}
        description={"Are you sure you want to delete?"}
        heading={"Delete Account"}
        btnLeftText={"No"}
        btnRightText={"Yes"}
        btnRightClick={onDelete}
        loading={deleteAdmin.isLoading}
      />
    </>
  );
};

export default AdminCard;
