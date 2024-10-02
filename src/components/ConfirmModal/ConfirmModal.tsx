import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { COLORS } from "constant";
import { LoadingButton } from "@mui/lab";

type Props = {
  title: string;
  subtitle?: string;
  cancelText: string;
  isLoading: boolean;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  icon?: React.ReactNode;
  isConfirmModal: boolean;
};

const ConfirmModal = (props: Props) => {
  const {
    icon,
    title,
    onCancel,
    subtitle,
    onConfirm,
    isLoading,
    cancelText,
    confirmText,
    isConfirmModal,
  } = props || {};

  const onClose = () => !isLoading && onCancel();

  return (
    <div>
      <Modal
        onClose={onClose}
        open={isConfirmModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box p={1} display={"flex"} justifyContent={"space-between"}>
            <Typography fontSize={16} fontWeight={600}>
              {subtitle && subtitle}
            </Typography>
            <ClearOutlinedIcon
              sx={{ color: COLORS.gray.main, cursor: "pointer" }}
              onClick={onClose}
            />
          </Box>
          <Box px={5} pt={2} pb={5}>
            {icon && (
              <Box display={"flex"} justifyContent={"center"}>
                {icon}
              </Box>
            )}
            <Typography
              my={3}
              fontSize={20}
              fontWeight={700}
              textAlign={"center"}
            >
              {title}
            </Typography>
            <LoadingButton
              fullWidth
              onClick={onConfirm}
              variant="contained"
              loading={isLoading}
              disabled={!!isLoading}
            >
              {confirmText}
            </LoadingButton>
            <Button
              fullWidth
              onClick={onClose}
              variant="outlined"
              sx={{ mt: 2, py: 2 }}
              disabled={!!isLoading}
            >
              {cancelText}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmModal;

const style = {
  width: 500,
  top: "50%",
  left: "50%",
  boxShadow: 0,
  border: "none",
  borderRadius: "10px",
  bgcolor: "background.paper",
  position: "absolute" as "absolute",
  transform: "translate(-50%, -50%)",
};
