// inbox/components/TaskPane/ComplianceTask.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Comment,
} from "@mui/icons-material";
import { ChangeRequest } from '@/app/library/types/changeRequest';

interface ComplianceTaskProps {
  selectedRequest: ChangeRequest;
}

const ComplianceTask = ({ selectedRequest }: ComplianceTaskProps) => {
  const [comments, setComments] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAccept = () => {
    if (!comments.trim()) {
      setErrorMessage("Please provide comments before accepting the compliance task.");
      setShowError(true);
      return;
    }

    // Handle accept logic here
    console.log("Accepting compliance task with comments:", comments);
    setShowSuccess(true);
    
    // Reset form after successful action
    setTimeout(() => {
      setComments("");
      setShowSuccess(false);
    }, 3000);
  };

  const handleReject = () => {
    if (!comments.trim()) {
      setErrorMessage("Please provide comments explaining the rejection reason.");
      setShowError(true);
      return;
    }

    // Handle reject logic here
    console.log("Rejecting compliance task with comments:", comments);
    setShowSuccess(true);
    
    // Reset form after successful action
    setTimeout(() => {
      setComments("");
      setShowSuccess(false);
    }, 3000);
  };

  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComments(event.target.value);
    // Hide error when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
          Compliance Review
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please review the change request details above and provide your decision with comments.
        </Typography>
      </Box>

      {/* Review Comments Field */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
          Review Comments*
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          value={comments}
          onChange={handleCommentsChange}
          placeholder="Enter your review comments here... Include specific details about compliance requirements, any issues found, recommendations for improvement, or approval rationale."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
              "& fieldset": {
                border: "none",
              },
              "&:hover": {
                backgroundColor: "#f1f3f4",
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                border: "2px solid #1976d2",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "0.875rem",
              lineHeight: 1.5,
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#999",
              opacity: 1,
            },
          }}
          helperText={`${comments.length}/1000 characters`}
          inputProps={{ maxLength: 1000 }}
          FormHelperTextProps={{
            sx: {
              fontSize: "0.75rem",
              color: "#666",
              mt: 1,
            }
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box 
        sx={{ 
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          pt: 3,
          borderTop: "1px solid #f0f0f0",
          mt: 3,
        }}
      >
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            size="large"
            startIcon={<Cancel />}
            onClick={handleReject}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderColor: "#dc3545",
              color: "#dc3545",
              minWidth: 140,
              "&:hover": {
                borderColor: "#c82333",
                backgroundColor: "#dc3545",
                color: "white",
              },
              "&:focus": {
                boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.25)",
              },
            }}
          >
            Reject
          </Button>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<CheckCircle />}
            onClick={handleAccept}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              backgroundColor: "#1976d2",
              minWidth: 140,
      
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 4px 12px #1976d2",
              },
              "&:focus": {
                boxShadow: "0 0 0 3px #1976d2",
              },
            }}
          >
            Accept
          </Button>
        </Stack>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 2, 
            textAlign: "center",
            fontSize: "0.8rem"
          }}
        >
          Please ensure you have reviewed all requirements before making your decision
        </Typography>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Review submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplianceTask;