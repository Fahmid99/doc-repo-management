// inbox/components/InboxListPane.tsx
"use client";
import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import {
  Search,
  FilterList,
  Person,
  StarBorder,
  FiberManualRecord,
} from '@mui/icons-material';
import { useInbox } from '@/app/contexts/InboxContext';

const InboxListPane = () => {
  const { requests, selectedRequest, selectRequest, loading, error } = useInbox();

  // Define pinned and regular requests
  const pinnedRequests = requests.filter((req: any) => req.favorite === true);
  const sortedRegularRequests = requests
    .filter((req: any) => !req.favorite)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.created?.on || a.dueDateComplete || 0).getTime();
      const dateB = new Date(b.created?.on|| b.dueDateComplete || 0).getTime();
      return dateB - dateA;
    });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress size={24} />
        <Typography sx={{ ml: 2 }} variant="body2">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error" size="small">
          Error loading inbox
        </Alert>
      </Box>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '1.1rem' }}>
          Inbox
        </Typography>
        <IconButton size="small" sx={{ ml: 'auto' }}>
          <FilterList fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <Search fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {/* Filter Tabs */}
      <Box sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
        <Box
          sx={{
            px: 2,
            py: 1.5,
            cursor: 'pointer',
            borderBottom: '2px solid #1976d2',
            backgroundColor: '#f8f9fa',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2', fontSize: '0.875rem' }}>
            Activity
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 1.5, cursor: 'pointer' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Unread
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 1.5, cursor: 'pointer' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Archive
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 1.5, cursor: 'pointer' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Sent
          </Typography>
        </Box>
      </Box>

      {/* Pinned Section */}
      <Box sx={{ px: 2, py: 1, backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarBorder sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Pinned
          </Typography>
        </Box>
      </Box>

      {/* Request List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {requests.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No items in your inbox
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {/* Pinned Requests */}
            {pinnedRequests.map((request, index) => {
              const isSelected = selectedRequest?.id === request.id;
              
              return (
                <React.Fragment key={`pinned-${request.id || index}`}>
                  <ListItem
                    button
                    selected={isSelected}
                    onClick={() => {
                      console.log('Clicked pinned request:', request);
                      selectRequest(request);
                    }}
                    sx={{
                      py: 1.5,
                      px: 2,
                      alignItems: 'flex-start',
                      backgroundColor: '#fffef7', // Light yellow background for pinned
                      borderLeft: '3px solid #ff9800', // Orange left border for pinned
                      '&.Mui-selected': {
                        backgroundColor: '#e3f2fd',
                        borderLeft: '3px solid #1976d2',
                      },
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', gap: 1.5 }}>
                      {/* Status Indicator */}
                      <Box sx={{ pt: 0.5 }}>
                        <FiberManualRecord 
                          sx={{ 
                            fontSize: '0.5rem', 
                            color: request.changeRequestStatus === 'In Development' ? '#ff9800' : '#4caf50'
                          }} 
                        />
                      </Box>

                      {/* Icon */}
                      <Box sx={{ pt: 0.25 }}>
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
                            {request.changeType?.label?.[0] || 'C'}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Header Row */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              color: 'text.primary',
                              lineHeight: 1.3
                            }}
                          >
                            {request.title || 'Company'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', ml: 1 }}>
                            {formatDate(request.createdOn || request.dueDateComplete)}
                          </Typography>
                        </Box>

                        {/* Status Line */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <StarBorder sx={{ fontSize: '0.875rem', color: '#ff9800', mr: 0.5 }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                            Status changed to "{request.changeRequestStatus || 'In Development'}"
                          </Typography>
                        </Box>

                        {/* Title */}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.primary',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            mb: 0.25
                          }}
                        >
                          {request.title || `Change Request #${request.changeRequestNumber || index + 1}`}
                        </Typography>

                        {/* Description */}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {request.assignedTo && (
                            <Person sx={{ fontSize: '0.875rem', mr: 0.5, verticalAlign: 'middle' }} />
                          )}
                          {request.assignedTo && `${request.assignedTo} `}
                          {request.description ? `Tagged you in "${request.description.substring(0, 50)}..."` : 'No description available'}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                </React.Fragment>
              );
            })}

            {/* Divider between pinned and regular if there are pinned items */}
            {pinnedRequests.length > 0 && sortedRegularRequests.length > 0 && (
              <Divider sx={{ my: 1, borderColor: '#e0e0e0' }} />
            )}

            {/* Regular Requests (sorted by date) */}
            {sortedRegularRequests.map((request, index) => {
              const isSelected = selectedRequest?.id === request.id;
              
              return (
                <React.Fragment key={`regular-${request.id || index}`}>
                  <ListItem
                    button
                    selected={isSelected}
                    onClick={() => {
                      console.log('Clicked request:', request);
                      selectRequest(request);
                    }}
                    sx={{
                      py: 1.5,
                      px: 2,
                      alignItems: 'flex-start',
                      '&.Mui-selected': {
                        backgroundColor: '#e3f2fd',
                        borderLeft: '3px solid #1976d2',
                      },
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', gap: 1.5 }}>
                      {/* Status Indicator */}
                      <Box sx={{ pt: 0.5 }}>
                        <FiberManualRecord 
                          sx={{ 
                            fontSize: '0.5rem', 
                            color: request.changeRequestStatus === 'In Development' ? '#ff9800' : '#4caf50'
                          }} 
                        />
                      </Box>

                      {/* Icon */}
                      <Box sx={{ pt: 0.25 }}>
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
                            {request.changeType?.label?.[0] || 'C'}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Header Row */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              color: 'text.primary',
                              lineHeight: 1.3
                            }}
                          >
                            {request.title || 'Company'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', ml: 1 }}>
                            {formatDate(request.createdOn || request.dueDateComplete)}
                          </Typography>
                        </Box>

                        {/* Status Line */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <StarBorder sx={{ fontSize: '0.875rem', color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                            Status changed to "{request.changeRequestStatus || 'In Development'}"
                          </Typography>
                        </Box>

                        {/* Title */}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.primary',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            mb: 0.25
                          }}
                        >
                          {request.title || `Change Request #${request.changeRequestNumber || index + 1}`}
                        </Typography>

                        {/* Description */}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {request.assignedTo && (
                            <Person sx={{ fontSize: '0.875rem', mr: 0.5, verticalAlign: 'middle' }} />
                          )}
                          {request.assignedTo && `${request.assignedTo} `}
                          {request.description ? `Tagged you in "${request.description.substring(0, 50)}..."` : 'No description available'}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default InboxListPane;