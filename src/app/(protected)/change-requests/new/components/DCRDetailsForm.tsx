"use client";
import {
  Autocomplete,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React from "react";
import { DCRFormData, CatalogEntry } from "@/app/library/types/changeRequest";
import { useUsers } from "@/app/hooks/useUsers";

interface DCRDetailsFormProps {
  formData: DCRFormData;
  setFormData: React.Dispatch<React.SetStateAction<DCRFormData>>;
  isSubmitting: boolean;
}

const DCRDetailsForm = ({ formData, setFormData, isSubmitting }: DCRDetailsFormProps) => {
  const { users } = useUsers();

  // Urgency options
  const urgencyOptions: CatalogEntry[] = [
    { id: "1", label: "Low", value: "low" },
    { id: "2", label: "Medium", value: "medium" },
    { id: "3", label: "High", value: "high" },
    { id: "4", label: "Critical", value: "critical" },
  ];

  // Document Type options
  const documentTypeOptions: CatalogEntry[] = [
    { id: "1", label: "Policy", value: "policy" },
    { id: "2", label: "Procedure", value: "procedure" },
    { id: "3", label: "Form", value: "form" },
    { id: "4", label: "Guide", value: "guide" },
    { id: "5", label: "Manual", value: "manual" },
    { id: "6", label: "Standard", value: "standard" },
  ];

  // Document Read Requirement options
  const documentReadRequirementOptions: CatalogEntry[] = [
    { id: "1", label: "Mandatory", value: "mandatory" },
    { id: "2", label: "Recommended", value: "recommended" },
    { id: "3", label: "Optional", value: "optional" },
  ];

  // Review Period options
  const reviewPeriodOptions: CatalogEntry[] = [
    { id: "1", label: "1 Week", value: "1_week" },
    { id: "2", label: "2 Weeks", value: "2_weeks" },
    { id: "3", label: "1 Month", value: "1_month" },
    { id: "4", label: "3 Months", value: "3_months" },
    { id: "5", label: "6 Months", value: "6_months" },
    { id: "6", label: "1 Year", value: "1_year" },
  ];

  // Convert users to CatalogEntry format for Autocomplete
  const userOptions: CatalogEntry[] = users.map((user) => ({
    id: user.id || "",
    label: user.name,
    value: user.email || user.name,
  }));

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
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
          Document Details
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "#666" }}>
          Additional details about the document and review process
        </Typography>

        <Stack spacing={3}>
          {/* Urgency */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Urgency *
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.urgency?.value || ""}
                onChange={(e) => {
                  const selected = urgencyOptions.find(
                    (opt) => opt.value === e.target.value
                  );
                  setFormData({
                    ...formData,
                    urgency: selected || { id: "", label: "", value: "" },
                  });
                }}
                displayEmpty
                disabled={isSubmitting}
              >
                <MenuItem value="">Select urgency</MenuItem>
                {urgencyOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Document Type */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Document Type *
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.documentType?.value || ""}
                onChange={(e) => {
                  const selected = documentTypeOptions.find(
                    (opt) => opt.value === e.target.value
                  );
                  setFormData({
                    ...formData,
                    documentType: selected || { id: "", label: "", value: "" },
                  });
                }}
                displayEmpty
                disabled={isSubmitting}
              >
                <MenuItem value="">Select document type</MenuItem>
                {documentTypeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Draft Document Name */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Draft Document Name
            </Typography>
            <TextField
              fullWidth
              value={formData.draftDocumentName}
              onChange={(e) =>
                setFormData({ ...formData, draftDocumentName: e.target.value })
              }
              placeholder="Enter draft document name"
              disabled={isSubmitting}
            />
          </Box>

          {/* Release Authority */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Release Authority
            </Typography>
            <TextField
              fullWidth
              value={formData.releaseAuthority}
              onChange={(e) =>
                setFormData({ ...formData, releaseAuthority: e.target.value })
              }
              placeholder="Enter release authority"
              disabled={isSubmitting}
            />
          </Box>

          {/* Author */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Author *
            </Typography>
            <Autocomplete
              fullWidth
              options={userOptions}
              getOptionLabel={(option) => option.label}
              value={formData.author?.id ? formData.author : null}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  author: newValue || { id: "", label: "", value: "" },
                });
              }}
              disabled={isSubmitting}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select author" />
              )}
            />
          </Box>

          {/* Author Timeframe */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Author Timeframe
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={
                formData.authorTimeFrame
                  ? new Date(formData.authorTimeFrame).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  authorTimeFrame: e.target.value ? new Date(e.target.value) : null,
                })
              }
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Reviewers (Multiple) */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Reviewers
            </Typography>
            <Autocomplete
              multiple
              fullWidth
              options={userOptions}
              getOptionLabel={(option) => option.label}
              value={formData.reviewers || []}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  reviewers: newValue,
                });
              }}
              disabled={isSubmitting}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select reviewers" />
              )}
            />
          </Box>

          {/* Reviewer Timeframe */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Reviewer Timeframe
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={
                formData.reviewerTimeframe
                  ? new Date(formData.reviewerTimeframe).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reviewerTimeframe: e.target.value ? new Date(e.target.value) : null,
                })
              }
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Contributors (Multiple) */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Contributors
            </Typography>
            <Autocomplete
              multiple
              fullWidth
              options={userOptions}
              getOptionLabel={(option) => option.label}
              value={formData.contributors || []}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  contributors: newValue,
                });
              }}
              disabled={isSubmitting}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select contributors" />
              )}
            />
          </Box>

          {/* Contributors Timeframe */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Contributors Timeframe
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={
                formData.contributorsTimeFrame
                  ? new Date(formData.contributorsTimeFrame).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contributorsTimeFrame: e.target.value ? new Date(e.target.value) : null,
                })
              }
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Release Time */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Release Time
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={
                formData.releaseTime
                  ? new Date(formData.releaseTime).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  releaseTime: e.target.value ? new Date(e.target.value) : null,
                })
              }
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Document Read Requirement */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Document Read Requirement
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.documentReadRequirement?.value || ""}
                onChange={(e) => {
                  const selected = documentReadRequirementOptions.find(
                    (opt) => opt.value === e.target.value
                  );
                  setFormData({
                    ...formData,
                    documentReadRequirement: selected || { id: "", label: "", value: "" },
                  });
                }}
                displayEmpty
                disabled={isSubmitting}
              >
                <MenuItem value="">Select read requirement</MenuItem>
                {documentReadRequirementOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Review Period */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Review Period
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.reviewPeriod?.value || ""}
                onChange={(e) => {
                  const selected = reviewPeriodOptions.find(
                    (opt) => opt.value === e.target.value
                  );
                  setFormData({
                    ...formData,
                    reviewPeriod: selected || { id: "", label: "", value: "" },
                  });
                }}
                displayEmpty
                disabled={isSubmitting}
              >
                <MenuItem value="">Select review period</MenuItem>
                {reviewPeriodOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default DCRDetailsForm;