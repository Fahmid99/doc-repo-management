// inbox/components/TaskPane/TaskHeader.tsx
"use client";
import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  MoreVert,
  Person,
  CalendarToday,
  Flag,
  CheckCircleOutline,
  Schedule,
  ExpandMore,
  OpenInNew,
  Delete,
} from '@mui/icons-material';
import { ChangeRequest } from '@/app/library/types/changeRequest';

interface TaskHeaderProps {
  selectedRequest: ChangeRequest;
}

const TaskHeader = ({ selectedRequest }: TaskHeaderProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0', backgroundColor: 'white' }}>
      {/* Top Row - Title and Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '4px',
              backgroundColor: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'white', fontSize: '0.75rem', fontWeight: 500 }}>
              {selectedRequest.data?.changeType?.label?.[0] || 'W'}
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 400, fontSize: '1.5rem' }}>
            {selectedRequest.data?.title || 'Change Request'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" title="Open in new tab">
            <OpenInNew fontSize="small" />
          </IconButton>
          <IconButton size="small" title="Expand">
            <ExpandMore fontSize="small" />
          </IconButton>
          <IconButton size="small" title="Delete">
            <Delete fontSize="small" />
          </IconButton>
          <IconButton size="small" title="More options">
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Subtitle */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
        {selectedRequest.data?.description || 'Change request details and documentation'}
      </Typography>

      {/* Author and Date */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Avatar sx={{ width: 20, height: 20 }}>
          <Person sx={{ fontSize: '0.75rem' }} />
        </Avatar>
        <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
          {selectedRequest.data?.assignedto || selectedRequest.created?.by?.name || 'Unassigned'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          {selectedRequest.created?.on ? formatDate(selectedRequest.created.on) : 'Recently'}
        </Typography>
      </Box>

      {/* Metadata Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {/* Date Created */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarToday sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            <strong>Date Created:</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {selectedRequest.created?.on ? formatDate(selectedRequest.created.on) : 'Not set'}
          </Typography>
        </Box>

        {/* Assignee */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            <strong>Assign:</strong>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Avatar sx={{ width: 16, height: 16 }}>
              <Person sx={{ fontSize: '0.6rem' }} />
            </Avatar>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {selectedRequest.data?.assignedto || 'Unassigned'}
            </Typography>
          </Box>
        </Box>

        {/* Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleOutline sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            <strong>Status:</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {selectedRequest.data?.changeRequestStatus || 'Open'}
          </Typography>
        </Box>

        {/* Priority */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Flag sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            <strong>Priority:</strong>
          </Typography>
          <Chip 
            label={selectedRequest.data?.changePriority?.label || selectedRequest.data?.changePriority || 'Medium'}
            size="small"
            sx={{ 
              backgroundColor: '#ffebee', 
              color: '#d32f2f', 
              fontSize: '0.75rem',
              height: '20px'
            }}
          />
        </Box>

        {/* Due Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            <strong>Due Date:</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {selectedRequest.data?.dueDateComplete ? formatDate(selectedRequest.data.dueDateComplete) : 'Not set'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskHeader;