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
  Divider,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRoles } from "@/app/hooks/useRoles";
import { useSubmitChangeRequest } from "@/app/hooks/useSubmitChangeRequest";

const ChangeRequestForm = () => {
  const { roles } = useRoles();
  const { submitChangeRequest } = useSubmitChangeRequest();
  const [formData, setFormData] = useState<ChangeRequestFormData>({
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

    submissionData.changerequeststatus = "compliance authority review";
    submitChangeRequest(submissionData);
    console.log("Form submitted:", submissionData);
    // Add your submission logic here
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      mb={4}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 1000, boxShadow: "none" }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* Basic Information Section */}
          <Typography variant="h6" sx={{ mb: 2, mt: 3, color: "primary.main" }}>
            Basic Information
          </Typography>
          <Grid container spacing={3}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={handleChange("title")}
                helperText="Enter a descriptive title for the change request"
                variant="outlined"
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={handleChange("description")}
                helperText="Provide a detailed description of the requested changes"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Identity"
                value={formData.identity}
                onChange={handleChange("identity")}
                helperText="Document or system identity"
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Related Folder"
                value={formData.relatedFolder}
                onChange={handleChange("relatedFolder")}
                helperText="Associated folder or location"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Change Details Section */}
          <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
            Change Details
          </Typography>
          <Grid container spacing={3}>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Change Type"
                value={formData.changeType}
                onChange={handleChange("changeType")}
                helperText="Type of change being requested"
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Change Priority"
                value={formData.changePriority}
                onChange={handleChange("changePriority")}
                helperText="Priority level of the change"
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Reason for Change"
                value={formData.reasonForChange}
                onChange={handleChange("reasonForChange")}
                helperText="Primary reason for requesting this change"
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Other Reason"
                value={formData.reasonForChangeOther}
                onChange={handleChange("reasonForChangeOther")}
                helperText="Additional details if 'Other' reason selected"
                variant="outlined"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Scope of Change"
                value={formData.scopeOfChange}
                onChange={handleChange("scopeOfChange")}
                helperText="Define the scope and boundaries of the change"
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={formData.dueDateComplete}
                onChange={handleChange("dueDateComplete")}
                helperText="Target completion date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.preapproved}
                    onChange={handleChange("preapproved")}
                  />
                }
                label="Pre-approved Change"
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* People & Responsibilities Section */}
          <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
            People & Responsibilities
          </Typography>
          <Grid container spacing={3}>
            <Grid size={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Change Authority</InputLabel>
                <Select
                  value={formData.changeAuthority}
                  onChange={(event) =>
                    handleChange("changeAuthority")(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  label="Change Authority"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Person with authority to approve changes
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Release Authority</InputLabel>
                <Select
                  value={formData.releaseAuthority}
                  onChange={(event) =>
                    handleChange("releaseAuthority")(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  label="Release Authority"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Person with authority to release changes
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Principle Contributer</InputLabel>
                <Select
                  value={formData.principleContributor}
                  onChange={(event) =>
                    handleChange("principleContributor")(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  label="Principle Contributer"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Main person responsible for implementing changes
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Contributors"
                value={formData.contributors}
                onChange={handleChange("contributors")}
                helperText="All people contributing to this change (comma-separated)"
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Reviewers"
                value={formData.reviewers}
                onChange={handleChange("reviewers")}
                helperText="People responsible for reviewing the changes (comma-separated)"
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ px: 6, py: 1.5 }}
            >
              Submit Change Request
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangeRequestForm;
