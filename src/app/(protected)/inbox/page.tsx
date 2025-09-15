// inbox/page.tsx
"use client";
import React from "react";
import { Box } from "@mui/material";
import { InboxProvider } from "@/app/contexts/InboxContext";
import InboxListPane from "./components/InboxListPane";
import TaskDetailPane from "./components/TaskDetailPane";

const InboxPage = () => {
  return (
    <InboxProvider>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#fafafa' }}>
        <Box 
          sx={{ 
            width: '400px', 
            borderRight: 1, 
            borderColor: 'divider',
            backgroundColor: 'white',
            overflow: 'hidden'
          }}
        >
          <InboxListPane />
        </Box>
        
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <TaskDetailPane />
        </Box>
      </Box>
    </InboxProvider>
  );
};

export default InboxPage;