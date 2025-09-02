import { Box, Modal } from "@mui/material";
import React from "react";

const ChangeRequestModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 300,
          padding: 2,
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        <h2>Custom Modal</h2>
        <p>This is a custom modal content.</p>
      </Box>
    </Modal>
  );
};

export default ChangeRequestModal;
