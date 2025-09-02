'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography
} from '@mui/material';

// ✅ TypeScript Learning: Interface for modal props
interface DocumentSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelectNew: () => void;
  onSelectExisting: () => void;
}

const DocumentSelectionModal = ({ 
  open, 
  onClose, 
  onSelectNew, 
  onSelectExisting 
}: DocumentSelectionModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create Change Request
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: '#6b7280' }}>
          Would you like to create a change request for a new or existing document?
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
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
      </DialogContent>
    </Dialog>
  );
};

export default DocumentSelectionModal;