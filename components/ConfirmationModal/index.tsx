import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface ConfirmationModalProps {
  text: string;
  openModal: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function ConfirmationModal({
  text,
  openModal,
  handleClose,
  handleConfirm,
}: ConfirmationModalProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Não
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-shop-btn-bg hover:bg-shop-btn-bg hover:brightness-110 transition duration-300 text-shop-text-default"
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
