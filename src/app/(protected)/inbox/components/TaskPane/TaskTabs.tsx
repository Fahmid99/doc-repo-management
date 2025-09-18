// inbox/components/TaskPane/TaskTabs.tsx
"use client";
import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

interface TaskTabsProps {
  activeTab: number;
  onTabChange: (newTab: number) => void;
}

const TaskTabs = ({ activeTab, onTabChange }: TaskTabsProps) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "white" }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          px: 3,
          "& .MuiTab-root": {
            fontSize: "0.875rem",
            fontWeight: 400,
            textTransform: "none",
            minHeight: "48px",
          },
        }}
      >
        <Tab label="Task" />
        <Tab label="Change Request Details" />
        <Tab label="Scope Document" />
        <Tab label="Participants" />
        <Tab label="Workflow Status" />
      </Tabs>
    </Box>
  );
};

export default TaskTabs;
