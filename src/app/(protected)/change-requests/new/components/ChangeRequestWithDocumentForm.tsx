"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import ChangeRequestForm from "./ChangeRequestForm";
import DocumentDetailsForm from "./DocumentDetailsForm";
import DCREntryForm from "./DCREntryForm";

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
      id={`change-request-tabpanel-${index}`}
      aria-labelledby={`change-request-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ChangeRequestWithDocumentForm = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          aria-label="change request form tabs"
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
          <Tab label="Change Request" />
          <Tab label="Document Details" />
          <Tab label="Entry Tab" />
        </Tabs>
      </Paper>

      <TabPanel value={activeTab} index={0}>
        <ChangeRequestForm />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <DocumentDetailsForm />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <DCREntryForm />
      </TabPanel>
    </Box>
  );
};

export default ChangeRequestWithDocumentForm;
