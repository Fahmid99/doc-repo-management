"use client";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { useRef } from "react";
import { DCRFormData, CatalogEntry } from "@/app/library/types/changeRequest";
import { useDocuments } from "@/app/hooks/useDocuments";
import { useAuth } from "@/app/contexts/AuthContext";
import { CloudUpload } from "@mui/icons-material";

// Functionality options
const FUNCTIONALITY_OPTIONS: CatalogEntry[] = [
  { id: "1", label: "Bug Fix", value: "bug_fix" },
  { id: "2", label: "New Feature", value: "new_feature" },
  { id: "3", label: "Improvement", value: "improvement" },
  { id: "4", label: "Security Update", value: "security" },
  { id: "5", label: "Compliance", value: "compliance" },
];

interface DCREntryFormProps {
  formData: DCRFormData;
  setFormData: React.Dispatch<React.SetStateAction<DCRFormData>>;
  isSubmitting: boolean;
  uploadedFile: File | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const DCREntryForm = ({
  formData,
  setFormData,
  isSubmitting,
  uploadedFile,
  setUploadedFile,
  error,
  setError,
}: DCREntryFormProps) => {
  const { user } = useAuth();
  const { documents, loading } = useDocuments();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a .txt, .doc, .docx, or .pdf file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setUploadedFile(file);
      setError(null);

      // Read text file content
      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setFormData((prev) => ({ ...prev, scopeOfChange: content }));
        };
        reader.readAsText(file);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleNewDocumentChange = (checked: boolean) => {
    setFormData({
      ...formData,
      newDocument: checked,
      documents: checked ? [] : formData.documents,
    });
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
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
          Entry Information
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "#666" }}>
          Provide the basic details for your document change request
        </Typography>

        <Stack spacing={3}>
          {/* Scope of Change */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
              Scope of Change *
            </Typography>
            <TextField
              fullWidth
              rows={6}
              multiline
              value={formData.scopeOfChange}
              onChange={(e) =>
                setFormData({ ...formData, scopeOfChange: e.target.value })
              }
              placeholder="Describe what will be changed and the expected impact..."
              disabled={isSubmitting || !!uploadedFile}
            />
          </Box>

          {/* File Upload */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
              Or Upload Scope Document
            </Typography>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.doc,.docx,.pdf"
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              onClick={handleUploadClick}
              disabled={isSubmitting}
            >
              {uploadedFile ? uploadedFile.name : "Upload File"}
            </Button>
            {uploadedFile && (
              <Button
                size="small"
                onClick={() => setUploadedFile(null)}
                sx={{ ml: 2 }}
                disabled={isSubmitting}
              >
                Remove
              </Button>
            )}
            <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#666" }}>
              Supported formats: .txt, .doc, .docx, .pdf (Max 5MB)
            </Typography>
          </Box>

          {/* New Document Checkbox */}
          <Box>
            <FormControlLabel
              label="Is this a new document?"
              control={
                <Checkbox
                  checked={formData.newDocument}
                  onChange={(e) => handleNewDocumentChange(e.target.checked)}
                  disabled={isSubmitting}
                />
              }
            />
            <Typography variant="caption" sx={{ display: "block", color: "#666", ml: 4 }}>
              {formData.newDocument
                ? "Document selection is disabled for new documents"
                : "Check this if you're creating a new document"}
            </Typography>
          </Box>

          {/* Select Document */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
              Select Document(s) {!formData.newDocument && "*"}
            </Typography>
            <Autocomplete
              multiple
              fullWidth
              disablePortal
              disabled={loading || isSubmitting || formData.newDocument}
              loading={loading}
              options={documents || []}
              getOptionLabel={(option) => option.data.name}
              value={
                formData.documents
                  .map((doc) => documents?.find((d) => d.id === doc.id))
                  .filter(Boolean) as any[]
              }
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  documents: newValue.map((doc) => ({
                    id: doc.id,
                    label: doc.data.name,
                    value: doc.id,
                  })),
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    formData.newDocument
                      ? "Disabled for new documents"
                      : loading
                      ? "Loading documents..."
                      : "Search and select documents..."
                  }
                />
              )}
            />
          </Box>

          {/* Functionality */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
              Functionality *
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.functionality.value}
                onChange={(e) => {
                  const selected = FUNCTIONALITY_OPTIONS.find(
                    (opt) => opt.value === e.target.value
                  );
                  setFormData({
                    ...formData,
                    functionality: selected || { id: "", label: "", value: "" },
                  });
                }}
                displayEmpty
                disabled={isSubmitting}
              >
                <MenuItem value="">Select functionality</MenuItem>
                {FUNCTIONALITY_OPTIONS.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Requestor Name */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
              Requestor Name *
            </Typography>
            <TextField
              fullWidth
              value={formData.requestor}
              onChange={(e) =>
                setFormData({ ...formData, requestor: e.target.value })
              }
              placeholder="Enter your name"
              disabled={isSubmitting}
              InputProps={{
                readOnly: !!user?.name,
              }}
              helperText={user?.name ? "Auto-filled from your account" : ""}
            />
          </Box>

          {/* Requestor Email */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
              Requestor Email *
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={formData.requestorEmail}
              onChange={(e) =>
                setFormData({ ...formData, requestorEmail: e.target.value })
              }
              placeholder="your.email@example.com"
              disabled={isSubmitting}
              InputProps={{
                readOnly: !!user?.email,
              }}
              helperText={user?.email ? "Auto-filled from your account" : ""}
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default DCREntryForm;