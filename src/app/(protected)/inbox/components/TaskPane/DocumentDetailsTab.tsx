import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
  Alert,
  Card,
  CardContent,
  Chip,
  Grid,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Comment,
  Assignment,
  Schedule,
  Person,
  Priority,
} from "@mui/icons-material";

const ComplianceTask = () => {
  const [comments, setComments] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAccept = () => {
    if (!comments.trim()) {
      setAlertType("error");
      setAlertMessage("Please provide comments before accepting the compliance task.");
      setShowAlert(true);
      return;
    }

    // Handle accept logic here
    console.log("Accepting compliance task with comments:", comments);
    setAlertType("success");
    setAlertMessage("Compliance task accepted successfully!");
    setShowAlert(true);
    
    // Reset form after successful action
    setTimeout(() => {
      setComments("");
      setShowAlert(false);
    }, 3000);
  };

  const handleReject = () => {
    if (!comments.trim()) {
      setAlertType("error");
      setAlertMessage("Please provide comments explaining the rejection reason.");
      setShowAlert(true);
      return;
    }

    // Handle reject logic here
    console.log("Rejecting compliance task with comments:", comments);
    setAlertType("success");
    setAlertMessage("Compliance task rejected successfully!");
    setShowAlert(true);
    
    // Reset form after successful action
    setTimeout(() => {
      setComments("");
      setShowAlert(false);
    }, 3000);
  };

  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComments(event.target.value);
    // Hide alert when user starts typing
    if (showAlert) {
      setShowAlert(false);
    }
  };

  // Mock compliance task data - replace with actual data
  const complianceTask = {
    id: "CT-2024-001",
    title: "Security Compliance Review",
    description: "Review and approve security compliance documentation for the new authentication system implementation.",
    priority: "High",
    dueDate: "2024-12-31",
    assignedTo: "John Doe",
    status: "Pending Review",
    category: "Security",
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}>
          Compliance Task Review
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please review the compliance task details and provide your decision with comments.
        </Typography>
      </Box>

      {/* Alert */}
      {showAlert && (
        <Alert
          severity={alertType}
          sx={{ mb: 3 }}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      )}

      {/* Task Details */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 3 }}>
            <Assignment color="primary" sx={{ mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {complianceTask.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={complianceTask.id} size="small" variant="outlined" />
                <Chip 
                  label={complianceTask.status} 
                  size="small" 
                  color="warning"
                />
                <Chip 
                  label={`Priority: ${complianceTask.priority}`} 
                  size="small" 
                  color="error"
                  icon={<Priority />}
                />
              </Stack>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            {complianceTask.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Task Metadata */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Category
                </Typography>
                <Typography variant="body1">
                  {complianceTask.category}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Assigned To
                </Typography>
                <Typography variant="body1">
                  {complianceTask.assignedTo}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Due Date
                </Typography>
                <Typography variant="body1">
                  {new Date(complianceTask.dueDate).toLocaleDateString()}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Priority
                </Typography>
                <Typography variant="body1">
                  {complianceTask.priority}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Comment color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Review Comments
            </Typography>
            <Typography variant="body2" color="error" sx={{ fontWeight: 600 }}>
              *Required
            </Typography>
          </Stack>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please provide detailed comments about your review decision. Explain your reasoning 
            for acceptance or rejection, and include any recommendations or concerns.
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
                "& fieldset": {
                  borderColor: comments.trim() ? "success.main" : "divider",
                },
              },
            }}
            helperText={`${comments.length}/1000 characters`}
            inputProps={{ maxLength: 1000 }}
          />
        </CardContent>
      </Card>

      {/* Action Footer */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          backgroundColor: "#f8f9fa",
          borderTop: "3px solid",
          borderColor: "primary.main",
          position: "sticky",
          bottom: 0,
          zIndex: 1
        }}
      >
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2} 
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Review Decision Required
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please provide comments and select Accept or Reject
            </Typography>
          </Box>
          
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2}
            sx={{ minWidth: { sm: "300px" } }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<Cancel />}
              onClick={handleReject}
              sx={{
                borderColor: "error.main",
                color: "error.main",
                "&:hover": {
                  borderColor: "error.dark",
                  backgroundColor: "error.main",
                  color: "white",
                },
                flex: 1,
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
                backgroundColor: "success.main",
                "&:hover": {
                  backgroundColor: "success.dark",
                },
                flex: 1,
              }}
            >
              Accept
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ComplianceTask;