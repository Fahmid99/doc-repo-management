import { Box, Modal, Button, Typography } from "@mui/material";
import React from "react";

interface ChangeRequestModalProps {
  open: boolean;
  handleClose: () => void;
  onSelectNew: () => void;
  onSelectExisting: () => void;
}

const ChangeRequestModal = ({ 
  open, 
  handleClose, 
  onSelectNew, 
  onSelectExisting 
}: ChangeRequestModalProps) => {
  return (
    <Modal 
      open={open} 
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
          outline: 'none',
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
          Create Change Request
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: '#666' }}>
          Would you like to create a change request for a new or existing document?
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onSelectNew}
            sx={{ py: 2 }}
          >
            New Document
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={onSelectExisting}
            sx={{ py: 2 }}
          >
            Existing Document
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeRequestModal;