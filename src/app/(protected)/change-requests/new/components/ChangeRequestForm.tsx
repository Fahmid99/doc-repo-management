"use client";
import React, { useState } from "react";
import { ChangeRequestFormData } from "@/app/library/types/changeRequest";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
} from "@mui/material";
import { useRoles } from "@/app/hooks/useRoles";
import { useSubmitChangeRequest } from "@/app/hooks/useSubmitChangeRequest";

const ChangeRequestForm = () => {
  const { roles } = useRoles();
  const { submitChangeRequest } = useSubmitChangeRequest();
  const [formData, setFormData] = useState<ChangeRequestFormData>({
    assignedTo: "",
    changeAuthority: "",
    changePriority: "",
    changeRequestStatus: "",
    changeType: "",
    contributors: "",
    contributorsPrincipal: "",
    description: "",
    dueDateComplete: "",
    identity: "",
    participants: [],
    preapproved: false,
    principleContributor: "",
    reasonForChange: "",
    reasonForChangeOther: "",
    relatedFolder: "",
    releaseAuthority: "",
    reviewers: "",
    scopeOfChange: "",
    title: "",
  });

  const handleChange =
    (field: keyof ChangeRequestFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setFormData({
        ...formData,
        [field]: value,
      });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Convert formData keys to lowercase and filter out empty values
    const submissionData = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof ChangeRequestFormData];

      // Skip empty values
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return acc;
      }

      acc[key.toLowerCase()] = value;
      return acc;
    }, {} as Record<string, any>);

    submissionData.assignedTo = "Compliance Authority";
    submitChangeRequest(submissionData);
    console.log("Form submitted:", submissionData);
  };

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
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 1, color: "#333" }}
        >
          Create new change request
        </Typography>
      
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Title */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Title
              </Typography>
              <TextField
                fullWidth
                value={formData.title}
                onChange={handleChange("title")}
                placeholder="Enter title"
                variant="outlined"
                size="medium"
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
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 0.5,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {formData.title.length}/100
                </Typography>
              </Box>
            </Box>

            {/* Description */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange("description")}
                placeholder="Enter Description"
                variant="outlined"
                size="medium"
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
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 0.5,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {formData.description.length}/500
                </Typography>
              </Box>
            </Box>

            {/* Priority */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Priority
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.changePriority}
                  onChange={(event) =>
                    handleChange("changePriority")(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  displayEmpty
                  size="medium"
                  sx={{
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
                  }}
                >
                  <MenuItem value="">Select priority</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Change Type */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Change Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.changeType}
                  onChange={(event) =>
                    handleChange("changeType")(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  displayEmpty
                  size="medium"
                  sx={{
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
                  }}
                >
                  <MenuItem value="">Select change type</MenuItem>
                  <MenuItem value="Minor">Minor</MenuItem>
                  <MenuItem value="Major">Major</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Date Fields */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                >
                  Start Date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value=""
                  placeholder="Select start date"
                  variant="outlined"
                  size="medium"
                  InputLabelProps={{ shrink: true }}
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
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                >
                  End date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={formData.dueDateComplete}
                  onChange={handleChange("dueDateComplete")}
                  placeholder="Select end date"
                  variant="outlined"
                  size="medium"
                  InputLabelProps={{ shrink: true }}
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
                  }}
                />
              </Grid>
            </Grid>

            {/* Assignee */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Select assignee
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.principleContributor}
                  onChange={(event) =>
                    handleChange("principleContributor")(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  displayEmpty
                  size="medium"
                  sx={{
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
                  }}
                >
                  <MenuItem value="">Select assignee</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Change Authority */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Change Authority
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.changeAuthority}
                  onChange={(event) =>
                    handleChange("changeAuthority")(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  displayEmpty
                  size="medium"
                  sx={{
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
                  }}
                >
                  <MenuItem value="">Select change authority</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Scope of Change */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Scope of Change
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={formData.scopeOfChange}
                onChange={handleChange("scopeOfChange")}
                placeholder="Define the scope and boundaries of the change"
                variant="outlined"
                size="medium"
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
                }}
              />
            </Box>

            {/* Contributors */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Contributors
              </Typography>
              <TextField
                fullWidth
                value={formData.contributors}
                onChange={handleChange("contributors")}
                placeholder="List contributors (comma-separated)"
                variant="outlined"
                size="medium"
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
                }}
              />
            </Box>

            {/* Reviewers */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Reviewers
              </Typography>
              <TextField
                fullWidth
                value={formData.reviewers}
                onChange={handleChange("reviewers")}
                placeholder="List reviewers (comma-separated)"
                variant="outlined"
                size="medium"
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
                }}
              />
            </Box>

            {/* Pre-approved checkbox */}
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.preapproved}
                    onChange={handleChange("preapproved")}
                    sx={{ color: "#666" }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "#333" }}>
                    Pre-approved Change
                  </Typography>
                }
              />
            </Box>

            {/* Submit Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  px: 3,
                  borderColor: "#ddd",
                  color: "#666",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                onClick={handleSubmit}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  px: 3,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                  },
                }}
              >
                Create Change Request
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangeRequestForm;