"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { ChangeRequestFormData } from "../../library/types/changeRequest";

const NewChangeRequestForm = () => {
  const [formData, setFormData] = useState<ChangeRequestFormData>({
    changeAuthority: "",
    changePriority: "",
    changeRequestNumber: 0,
    changeRequestStatus: "Pending",
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
    rejectionReason: "",
    rejectionReasonComments: "",
    relatedFolder: "",
    releaseAuthority: "",
    reviewers: "",
    scopeOfChange: "",
    title: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setMessage("");

    try {
      // TODO: Replace with actual API call
      console.log("Submitting change request:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage("Change request created successfully!");
      setIsSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        window.location.href = "/change-requests";
      }, 1500);
    } catch (error) {
      setMessage("Failed to create change request");
      setIsSuccess(false);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#1f2937", mb: 1 }}
        >
          New Change Request
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280" }}>
          Fill out the form below to create a new change request
        </Typography>
      </Box>

      {/* Name & Change Details Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1f2937", mb: 0.5 }}
        >
          Name & Change Details
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mb: 3 }}>
          Basic information and detailed description of the change request
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder="Brief description of the change"
            variant="outlined"
            size="medium"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            required
            disabled={loading}
            placeholder="Detailed description of what needs to be changed..."
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Scope of Change"
            name="scopeOfChange"
            value={formData.scopeOfChange}
            onChange={handleInputChange}
            multiline
            rows={4}
            disabled={loading}
            placeholder="Describe the scope and impact of this change..."
          />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Related Folder"
                name="relatedFolder"
                value={formData.relatedFolder}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Folder path or location"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identity"
                name="identity"
                value={formData.identity}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Document or project identifier"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Change Classification */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1f2937", mb: 0.5 }}
        >
          Change Classification
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mb: 3 }}>
          Categorize and prioritize your change request
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required disabled={loading}>
              <InputLabel>Change Type</InputLabel>
              <Select
                name="changeType"
                value={formData.changeType}
                onChange={(e) =>
                  handleSelectChange("changeType", e.target.value)
                }
                label="Change Type"
              >
                <MenuItem value="Content Update">Content Update</MenuItem>
                <MenuItem value="Format Change">Format Change</MenuItem>
                <MenuItem value="Structure Revision">
                  Structure Revision
                </MenuItem>
                <MenuItem value="Policy Update">Policy Update</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required disabled={loading}>
              <InputLabel>Priority</InputLabel>
              <Select
                name="changePriority"
                value={formData.changePriority}
                onChange={(e) =>
                  handleSelectChange("changePriority", e.target.value)
                }
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Reason for Change</InputLabel>
              <Select
                name="reasonForChange"
                value={formData.reasonForChange}
                onChange={(e) =>
                  handleSelectChange("reasonForChange", e.target.value)
                }
                label="Reason for Change"
              >
                <MenuItem value="Error Correction">Error Correction</MenuItem>
                <MenuItem value="Policy Update">Policy Update</MenuItem>
                <MenuItem value="Process Improvement">
                  Process Improvement
                </MenuItem>
                <MenuItem value="Regulatory Change">Regulatory Change</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reason for Change (Other)"
              name="reasonForChangeOther"
              value={formData.reasonForChangeOther}
              onChange={handleInputChange}
              disabled={loading || formData.reasonForChange !== "Other"}
              placeholder="Specify if 'Other' selected above"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Settings */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1f2937", mb: 0.5 }}
        >
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mb: 3 }}>
          Configure additional options for this change request
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              name="preapproved"
              checked={formData.preapproved}
              onChange={handleInputChange}
              disabled={loading}
              sx={{
                color: "#3b82f6",
                "&.Mui-checked": {
                  color: "#3b82f6",
                },
              }}
            />
          }
          label={
            <Box>
              <Typography sx={{ fontWeight: 500, color: "#1f2937" }}>
                Preapproved Change
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                This change has already been pre-approved and can be
                fast-tracked
              </Typography>
            </Box>
          }
          sx={{ alignItems: "flex-start", ml: 0 }}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Authority & People */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1f2937", mb: 0.5 }}
        >
          Authority & People
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mb: 3 }}>
          Assign responsibilities and authorities for this change
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Change Authority</InputLabel>
              <Select
                name="changeAuthority"
                value={formData.changeAuthority}
                onChange={(e) =>
                  handleSelectChange("changeAuthority", e.target.value)
                }
                label="Change Authority"
              >
                <MenuItem value="Document Controller">Document Controller</MenuItem>
                <MenuItem value="Compliance Authority">Compliance Authority</MenuItem>
                <MenuItem value="Quality Manager">Quality Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Release Authority"
              name="releaseAuthority"
              value={formData.releaseAuthority}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Person authorized to release this change"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Principal Contributor"
              name="contributorsPrincipal"
              value={formData.contributorsPrincipal}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Main person responsible for this change"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contributors"
              name="contributors"
              value={formData.contributors}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Additional contributors (comma-separated)"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reviewers"
              name="reviewers"
              value={formData.reviewers}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="People who will review this change"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Due Date"
              name="dueDateComplete"
              type="date"
              value={formData.dueDateComplete}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={loading}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "flex-end",
          pt: 3,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={() => window.history.back()}
          disabled={loading}
          sx={{
            px: 4,
            py: 1.5,
            color: "#6b7280",
            borderColor: "#d1d5db",
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={
            loading || !formData.title.trim() || !formData.description.trim()
          }
          sx={{
            px: 4,
            py: 1.5,
            backgroundColor: "#3b82f6",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
            "&:disabled": {
              backgroundColor: "#d1d5db",
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
              Creating...
            </>
          ) : (
            "Create Change Request"
          )}
        </Button>
      </Box>

      {message && (
        <Alert severity={isSuccess ? "success" : "error"} sx={{ mt: 4 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default NewChangeRequestForm;