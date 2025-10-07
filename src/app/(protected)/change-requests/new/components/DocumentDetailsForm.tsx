"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

interface DocumentDetailsFormData {
  name: string;
  audience: string;
  category: string;
  classification: string;
  documentStatus: string;
  external: boolean;
  publishdate: string;
  releasedate: string;
  reviewdate: string;
  type: string;
  version: number;
  versionstatus: string;
  downloadoriginalfiletype: boolean;
  showindocumentrepository: boolean;
}

const DocumentDetailsForm = () => {
  const [formData, setFormData] = useState<DocumentDetailsFormData>({
    name: "",
    audience: "",
    category: "",
    classification: "",
    documentStatus: "",
    external: false,
    publishdate: "",
    releasedate: "",
    reviewdate: "",
    type: "",
    version: 1,
    versionstatus: "",
    downloadoriginalfiletype: false,
    showindocumentrepository: true,
  });

  const handleChange =
    (field: keyof DocumentDetailsFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      const target = event.target as HTMLInputElement;
      const value = target.type === "checkbox" ? target.checked : target.value;
      
      setFormData({
        ...formData,
        [field]: value,
      });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Document details submitted:", formData);
    // Add your submission logic here
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
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
          Document Details
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#666" }}>
          Provide comprehensive details about the document
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Document Name */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Document Name *
              </Typography>
              <TextField
                fullWidth
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Enter document name"
                variant="outlined"
                size="medium"
                required
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

            {/* Document Type */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Document Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.type}
                  onChange={(event) =>
                    handleChange("type")(
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
                  <MenuItem value="">Select document type</MenuItem>
                  <MenuItem value="Policy">Policy</MenuItem>
                  <MenuItem value="Procedure">Procedure</MenuItem>
                  <MenuItem value="Form">Form</MenuItem>
                  <MenuItem value="Guide">Guide</MenuItem>
                  <MenuItem value="Manual">Manual</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Category */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Category
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.category}
                  onChange={(event) =>
                    handleChange("category")(
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
                  <MenuItem value="">Select category</MenuItem>
                  <MenuItem value="Quality">Quality</MenuItem>
                  <MenuItem value="Security">Security</MenuItem>
                  <MenuItem value="Compliance">Compliance</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                  <MenuItem value="HR">Human Resources</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Audience */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Audience
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.audience}
                  onChange={(event) =>
                    handleChange("audience")(
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
                  <MenuItem value="">Select audience</MenuItem>
                  <MenuItem value="All Staff">All Staff</MenuItem>
                  <MenuItem value="Management">Management</MenuItem>
                  <MenuItem value="Department Specific">Department Specific</MenuItem>
                  <MenuItem value="External">External</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Classification */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Classification
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.classification}
                  onChange={(event) =>
                    handleChange("classification")(
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
                  <MenuItem value="">Select classification</MenuItem>
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="Confidential">Confidential</MenuItem>
                  <MenuItem value="Restricted">Restricted</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Document Status */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Document Status
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.documentStatus}
                  onChange={(event) =>
                    handleChange("documentStatus")(
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
                  <MenuItem value="">Select status</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Under Review">Under Review</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Published">Published</MenuItem>
                  <MenuItem value="Archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Version Status */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Version Status
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.versionstatus}
                  onChange={(event) =>
                    handleChange("versionstatus")(
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
                  <MenuItem value="">Select version status</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                  <MenuItem value="Superseded">Superseded</MenuItem>
                  <MenuItem value="Obsolete">Obsolete</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Version Number */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
              >
                Version Number
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.version}
                onChange={handleChange("version")}
                placeholder="1"
                variant="outlined"
                size="medium"
                inputProps={{ min: 1, step: 0.1 }}
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

            {/* Dates Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#333" }}
              >
                Important Dates
              </Typography>
              <Stack spacing={3}>
                {/* Publish Date */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                  >
                    Publish Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={formData.publishdate}
                    onChange={handleChange("publishdate")}
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
                </Box>

                {/* Release Date */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                  >
                    Release Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={formData.releasedate}
                    onChange={handleChange("releasedate")}
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
                </Box>

                {/* Review Date */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                  >
                    Review Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={formData.reviewdate}
                    onChange={handleChange("reviewdate")}
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
                </Box>
              </Stack>
            </Box>

            {/* Checkboxes */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#333" }}
              >
                Additional Options
              </Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.external}
                      onChange={handleChange("external")}
                      sx={{ color: "#666" }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "#333" }}>
                      External Document
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.downloadoriginalfiletype}
                      onChange={handleChange("downloadoriginalfiletype")}
                      sx={{ color: "#666" }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "#333" }}>
                      Download Original File Type
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.showindocumentrepository}
                      onChange={handleChange("showindocumentrepository")}
                      sx={{ color: "#666" }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "#333" }}>
                      Show in Document Repository
                    </Typography>
                  }
                />
              </Stack>
            </Box>

            {/* Submit Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
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
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Save Document Details
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default DocumentDetailsForm;