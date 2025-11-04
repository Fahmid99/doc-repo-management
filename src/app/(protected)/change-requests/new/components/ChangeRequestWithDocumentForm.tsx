"use client";
import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Paper, Button, Alert } from "@mui/material";
import { DCRFormData } from "@/app/library/types/changeRequest";
import { useAuth } from "@/app/contexts/AuthContext";
import DCREntryForm from "./DCREntryForm";
import DCRDetailsForm from "./DCRDetailsForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dcr-tabpanel-${index}`}
      aria-labelledby={`dcr-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ChangeRequestWithDocumentForm = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Unified form state for all tabs
  const [formData, setFormData] = useState<DCRFormData>({
    // Entry tab fields
    scopeOfChange: "",
    documents: [],
    newDocument: false,
    functionality: { id: "", label: "", value: "" },
    requestor: "",
    requestorEmail: "",
    
    // Details tab fields
    urgency: { id: "", label: "", value: "" },
    releaseTime: null,
    draftDocumentName: "",
    releaseAuthority: "",
    reviewers: [],
    author: { id: "", label: "", value: "" },
    authorTimeFrame: null,
    reviewerTimeframe: null,
    contributors: [],
    contributorsTimeFrame: null,
    documentType: { id: "", label: "", value: "" },
    documentReadRequirement: { id: "", label: "", value: "" },
    reviewPeriod: { id: "", label: "", value: "" },
  });

  // Removed uploadedFile state - not needed for JSON API

  // Pre-fill requestor info from auth
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        requestor: user.name || "",
        requestorEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Validation - only required fields from Entry tab
  const validateForm = (): string | null => {
    if (!formData.scopeOfChange) {
      return "Please provide scope of change";
    }
    if (!formData.newDocument && formData.documents.length === 0) {
      return "Please select at least one document or mark as new document";
    }
    if (!formData.requestor) {
      return "Please enter requestor name";
    }
    if (!formData.requestorEmail) {
      return "Please enter requestor email";
    }
    if (!formData.functionality.value) {
      return "Please select functionality";
    }
    return null;
  };

  // Single submit handler
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }

      const authCredentials = localStorage.getItem("authCredentials");

      // Determine how many change requests to create
      if (formData.newDocument) {
        // New document - create ONE change request
        await createChangeRequest(null, authCredentials);
      } else {
        // Existing documents - create ONE change request PER document
        for (const document of formData.documents) {
          await createChangeRequest(document.id, authCredentials);
        }
      }

      // Success!
      setSuccess(true);
      
      // Reset form (preserve user info)
      setFormData({
        scopeOfChange: "",
        documents: [],
        newDocument: false,
        functionality: { id: "", label: "", value: "" },
        requestor: user?.name || "",
        requestorEmail: user?.email || "",
        urgency: { id: "", label: "", value: "" },
        releaseTime: null,
        draftDocumentName: "",
        releaseAuthority: "",
        reviewers: [],
        author: { id: "", label: "", value: "" },
        authorTimeFrame: null,
        reviewerTimeframe: null,
        contributors: [],
        contributorsTimeFrame: null,
        documentType: { id: "", label: "", value: "" },
        documentReadRequirement: { id: "", label: "", value: "" },
        reviewPeriod: { id: "", label: "", value: "" },
      });
      
      // Reset to first tab
      setActiveTab(0);

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to create a single change request
  const createChangeRequest = async (
    existingDocumentId: string | null,
    authCredentials: string | null
  ) => {
    // Prepare the payload WITHOUT documents field
    const payload = {
      // Entry tab data
      scopeOfChange: formData.scopeOfChange,
      newDocument: formData.newDocument,
      existingDocumentId: existingDocumentId, // The document this CR is for (null if new)
      functionality: formData.functionality.value,
      requestor: formData.requestor,
      requestorEmail: formData.requestorEmail,
      
      // Details tab data (only if provided)
      ...(formData.urgency?.value && { urgency: formData.urgency.value }),
      ...(formData.documentType?.value && { documentType: formData.documentType.value }),
      ...(formData.draftDocumentName && { draftDocumentName: formData.draftDocumentName }),
      ...(formData.releaseAuthority && { releaseAuthority: formData.releaseAuthority }),
      ...(formData.author?.value && { author: formData.author.value }),
      ...(formData.reviewers.length > 0 && { reviewers: formData.reviewers }),
      ...(formData.contributors.length > 0 && { contributors: formData.contributors }),
      ...(formData.releaseTime && { releaseTime: formData.releaseTime }),
      ...(formData.authorTimeFrame && { authorTimeFrame: formData.authorTimeFrame }),
      ...(formData.reviewerTimeframe && { reviewerTimeframe: formData.reviewerTimeframe }),
      ...(formData.contributorsTimeFrame && { contributorsTimeFrame: formData.contributorsTimeFrame }),
      ...(formData.documentReadRequirement?.value && { 
        documentReadRequirement: formData.documentReadRequirement.value 
      }),
      ...(formData.reviewPeriod?.value && { reviewPeriod: formData.reviewPeriod.value }),
    };

    const response = await fetch("/api/change-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authCredentials}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit change request");
    }

    return response.json();
  };

  const handleCancel = () => {
    // Reset form (preserve user info)
    setFormData({
      scopeOfChange: "",
      documents: [],
      newDocument: false,
      functionality: { id: "", label: "", value: "" },
      requestor: user?.name || "",
      requestorEmail: user?.email || "",
      urgency: { id: "", label: "", value: "" },
      releaseTime: null,
      draftDocumentName: "",
      releaseAuthority: "",
      reviewers: [],
      author: { id: "", label: "", value: "" },
      authorTimeFrame: null,
      reviewerTimeframe: null,
      contributors: [],
      contributorsTimeFrame: null,
      documentType: { id: "", label: "", value: "" },
      documentReadRequirement: { id: "", label: "", value: "" },
      reviewPeriod: { id: "", label: "", value: "" },
    });
    setUploadedFile(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Success/Error Messages */}
      <Box sx={{ mb: 2, px: 4, pt: 2 }}>
        {success && (
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Change request submitted successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="DCR form tabs"
          sx={{
            px: 4,
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: 160,
            },
          }}
        >
          <Tab label="Entry" />
          <Tab label="Details" />
        </Tabs>
      </Paper>

      <TabPanel value={activeTab} index={0}>
        <DCREntryForm 
          formData={formData}
          setFormData={setFormData}
          isSubmitting={isSubmitting}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <DCRDetailsForm 
          formData={formData}
          setFormData={setFormData}
          isSubmitting={isSubmitting}
        />
      </TabPanel>

      {/* Submit/Cancel Buttons - Visible on ALL tabs */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          p: 4,
          backgroundColor: "white",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Button
          variant="outlined"
          size="medium"
          onClick={handleCancel}
          disabled={isSubmitting}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="medium"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Change Request"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeRequestWithDocumentForm;