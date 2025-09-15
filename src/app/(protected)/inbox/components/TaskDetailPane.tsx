// inbox/components/TaskDetailPane.tsx
"use client";
import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  Divider,
} from '@mui/material';
import {
  MoreVert,
  Person,
  CalendarToday,
  Flag,
  Assignment,
  Description,
  CheckCircleOutline,
  Schedule,
  Group,
  ExpandMore,
  OpenInNew,
  Delete,
} from '@mui/icons-material';
import { useInbox } from '@/app/contexts/InboxContext';

const TaskDetailPane = () => {
  const { selectedRequest } = useInbox();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
            Choose an item from the inbox to see its full information
          </Typography>
        </Box>
      </Box>
    );
  }

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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        {/* Top Row */}
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
                W
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 400, fontSize: '1.5rem' }}>
              {selectedRequest.data.title || 'Homepage Redesign Brief'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small">
              <OpenInNew fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ExpandMore fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <Delete fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Subtitle */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
          Documentation for Authentication's Access token and ID Tokens.
        </Typography>

        {/* Author and Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Avatar sx={{ width: 20, height: 20 }}>
            <Person sx={{ fontSize: '0.75rem' }} />
          </Avatar>
          <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {selectedRequest.assignedTo || selectedRequest.contributorsPrincipal || 'Jack Smith'}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            Yesterday
          </Typography>
        </Box>

        {/* Metadata */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday sx={{ fontSize: '1rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              <strong>Date Created:</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {formatDate(selectedRequest.dueDateComplete) || 'Mon 5 May 05:00PM'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
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
                {selectedRequest.assignedTo || selectedRequest.contributorsPrincipal || 'Jack Smith'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleOutline sx={{ fontSize: '1rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              <strong>Status:</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {selectedRequest.changeRequestStatus || 'on going'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Flag sx={{ fontSize: '1rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              <strong>Priority:</strong>
            </Typography>
            <Chip 
              label={selectedRequest.changePriority?.label || selectedRequest.changePriority || 'High'}
              size="small"
              sx={{ 
                backgroundColor: '#ffebee', 
                color: '#d32f2f', 
                fontSize: '0.75rem',
                height: '20px'
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule sx={{ fontSize: '1rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              <strong>Due Date:</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {formatDate(selectedRequest.dueDateComplete) || 'Sat 17 May 05:00PM'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            px: 3,
            '& .MuiTab-root': {
              fontSize: '0.875rem',
              fontWeight: 400,
              textTransform: 'none',
              minHeight: '48px',
            }
          }}
        >
          <Tab label="Overview" />
          <Tab label="Messages" />
          <Tab label="Attachments" />
          <Tab label="+ New" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3, backgroundColor: '#fafafa' }}>
        {tabValue === 0 && (
          <Box>
            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                Description
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                {selectedRequest.description || "We're updating the homepage to align with our evolving product vision and enhance initial user experiences. Our aim is to design a more streamlined layout that effectively conveys our value proposition, showcases essential features, and drives sign-ups."}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                {selectedRequest.scopeOfChange || "The revamped design will focus on quicker load times, improved mobile compatibility, and a more seamless onboarding process for new users. We're drawing on insights from user feedback regarding clarity, trust indicators, and navigation."}
              </Typography>
            </Box>

            {/* Subtasks */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                Subtasks
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Schedule sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Mon, 5 May
                  </Typography>
                </Box>
                
                <Box sx={{ ml: 3, mb: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>
                    Kickoff: Review project brief & goals
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    9:00 AM - 9:30 AM
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                    {[1, 2, 3].map((i) => (
                      <Avatar key={i} sx={{ width: 20, height: 20, fontSize: '0.7rem' }}>
                        {i}
                      </Avatar>
                    ))}
                  </Box>
                </Box>

                <Box sx={{ ml: 3, mb: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>
                    Homepage audit: capture pain points & improvement areas
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    10:00 AM - 11:00 AM
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                    {[1, 2, 3].map((i) => (
                      <Avatar key={i} sx={{ width: 20, height: 20, fontSize: '0.7rem' }}>
                        {i}
                      </Avatar>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Schedule sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Tue, 6 May
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6">Messages</Typography>
            <Typography variant="body2" color="text.secondary">
              Messages content will go here
            </Typography>
          </Box>
        )}
        
        {tabValue === 2 && (
          <Box>
            <Typography variant="h6">Attachments</Typography>
            <Typography variant="body2" color="text.secondary">
              Attachments content will go here
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskDetailPane;