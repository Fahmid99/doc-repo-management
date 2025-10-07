import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DCREntryTabFormData } from "@/app/library/types/changeRequest";

const DCREntryForm = () => {
  const [formData, setFormData] = useState<DCREntryTabFormData>({
    scopeOfChange: "",
    documents: [],
    newDocument: false,
    Functionality: { id: "", label: "", value: "" },
    Requestor: "",
    requestorEmail: "",
  });

  return (
    <Box sx={{ p: 4, maxWidth: "90%", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "white",
          border: "1px solid #f0f0f0",
        }}
      >
        {/* Header */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
          Document Change Request Scope
        </Typography>

        <Box component="form" onSubmit={() => console.log("test")}>
          <Stack spacing={3}>
            {/* Title */}

            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Scope of Change
            </Typography>

            <TextField rows={3} multiline />
          </Stack>
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              or
            </Typography>
            <Button variant="contained">Upload Scope</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DCREntryForm;
