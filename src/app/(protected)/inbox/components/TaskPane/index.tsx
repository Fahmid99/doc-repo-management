// inbox/components/TaskPane/index.tsx
"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import { useInbox } from '@/app/contexts/InboxContext';
import TaskHeader from './TaskHeader';
import TaskTabs from './TaskTabs';
import OverviewTab from './OverviewTab';
import DocumentDetailsTab from './DocumentDetailsTab';
import ParticipantsTab from './ParticipantsTab';

const TaskPane = () => {
  const { selectedRequest } = useInbox();
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab changes
  const handleTabChange = (newTab: number) => {
    setActiveTab(newTab);
  };

  // Empty state when no request is selected
  if (!selectedRequest) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          p: 3,
          backgroundColor: '#fafafa'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Assignment sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Select a change request to view details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose an item from the inbox to see its full information and edit the details
          </Typography>
        </Box>
      </Box>
    );
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <OverviewTab selectedRequest={selectedRequest} />;
      case 1:
        return <DocumentDetailsTab selectedRequest={selectedRequest} />;
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">Scope Document</Typography>
            <Typography variant="body2" color="text.secondary">
              Scope document details will be implemented here.
            </Typography>
          </Box>
        );
      case 3:
        return <ParticipantsTab selectedRequest={selectedRequest} />;
      case 4:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">Workflow Status</Typography>
            <Typography variant="body2" color="text.secondary">
              Workflow status and progress tracking will be implemented here.
            </Typography>
          </Box>
        );
      default:
        return <OverviewTab selectedRequest={selectedRequest} />;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TaskHeader selectedRequest={selectedRequest} />
      <TaskTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default TaskPane;