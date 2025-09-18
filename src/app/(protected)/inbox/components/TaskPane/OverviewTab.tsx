// inbox/components/TaskPane/OverviewTab.tsx
"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Grid,
  Divider,
  Chip,
  Alert,
  Card,
  CardContent,
  Stack,
  FormControlLabel,
  Checkbox,
  Fade,
  Snackbar,
  Paper,
} from '@mui/material';
import {
  Save,
  Edit,
  Cancel,
  Person,
  Assignment,
  Schedule,
  Flag,
  Info,
  CheckCircle,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { ChangeRequest, CatalogEntry } from '@/app/library/types/changeRequest';
import { useInbox } from '@/app/contexts/InboxContext';

interface OverviewTabProps {
  selectedRequest: ChangeRequest;
}

const OverviewTab = ({ selectedRequest }: OverviewTabProps) => {
  const { updateRequest } = useInbox();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [formData, setFormData] = useState({
    title: selectedRequest.data?.title || '',
    description: selectedRequest.data?.description || '',
    changeRequestStatus: selectedRequest.data?.changeRequestStatus || '',
    changePriority: selectedRequest.data?.changePriority?.label || selectedRequest.data?.changePriority || '',
    assignedto: selectedRequest.data?.assignedto || '',
    changeType: selectedRequest.data?.changeType?.label || selectedRequest.data?.changeType || '',
    dueDateComplete: selectedRequest.data?.dueDateComplete || '',
    scopeOfChange: selectedRequest.data?.scopeOfChange || '',
    reasonForChange: selectedRequest.data?.reasonForChange?.label || selectedRequest.data?.reasonForChange || '',
    contributors: selectedRequest.data?.contributors || '',
  });

  const originalData = React.useRef(formData);

  useEffect(() => {
    const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(originalData.current);
    setHasChanges(hasFormChanges);
  }, [formData]);

  const handleInputChange = (field: string) => (event: any) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Update the request in context
      updateRequest(selectedRequest.id, {
        data: {
          ...selectedRequest.data,
          ...formData,
          // Handle nested objects properly
          changePriority: { label: formData.changePriority },
          changeType: { label: formData.changeType },
          reasonForChange: { label: formData.reasonForChange },
        }
      });
      originalData.current = { ...formData };
      setIsEditing(false);
      setHasChanges(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleCancel = () => {
    setFormData(originalData.current);
    setIsEditing(false);
    setHasChanges(false);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'in progress': return 'info';
      case 'under review': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  // Field component for consistent styling
  const FieldDisplay = ({ label, value, isRequired = false }: { label: string; value: string; isRequired?: boolean }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
        {label}{isRequired && '*'}
      </Typography>
      <Typography variant="body1" sx={{ color: value ? '#666' : '#999', fontStyle: value ? 'normal' : 'italic' }}>
        {value || 'Not specified'}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Change Request Details
          </Typography>
          {!isEditing && (
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip 
                label={formData.changeRequestStatus || 'No Status'}
                size="small"
                color={getStatusColor(formData.changeRequestStatus)}
              />
              <Chip 
                label={`Priority: ${formData.changePriority || 'Not Set'}`}
                size="small"
                color={getPriorityColor(formData.changePriority)}
                icon={<Flag />}
              />
            </Stack>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isEditing ? (
            <Button
              variant="contained"
              size="medium"
              startIcon={<Edit />}
              onClick={() => setIsEditing(true)}
              sx={{ minWidth: 100 }}
            >
              Edit
            </Button>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="medium"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={!hasChanges}
                color="primary"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                size="medium"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>
          )}
        </Box>
      </Box>

      {isEditing && (
        <Fade in={isEditing}>
          <Alert 
            severity="info" 
            icon={<Info />}
            sx={{ mb: 3 }}
          >
            You are editing this change request. {hasChanges ? 'Unsaved changes detected.' : 'No changes made yet.'}
          </Alert>
        </Fade>
      )}

      {/* Form Fields */}
      <Box sx={{ '& > *:not(:last-child)': { borderBottom: '1px solid #f0f0f0', pb: 3, mb: 3 } }}>
        
        {/* Basic Information Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
            Basic Information
          </Typography>

          {!isEditing ? (
            <>
              <FieldDisplay label="Name" value={formData.title} isRequired />
              <FieldDisplay label="Priority" value={formData.changePriority} />
              <FieldDisplay label="Description" value={formData.description} />
            </>
          ) : (
            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Name*
                </Typography>
                <TextField
                  fullWidth
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  variant="outlined"
                  placeholder="Enter change request title"
                  error={!formData.title}
                  size="medium"
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Priority
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.changePriority}
                    onChange={handleInputChange('changePriority')}
                    displayEmpty
                    size="medium"
                  >
                    <MenuItem value="">Select priority</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  variant="outlined"
                  placeholder="Provide a detailed description of the requested changes..."
                />
              </Box>
            </Stack>
          )}
        </Box>

        {/* Status & Assignment Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
            Status & Assignment
          </Typography>

          {!isEditing ? (
            <>
              <FieldDisplay label="Status" value={formData.changeRequestStatus} />
              <FieldDisplay label="Assigned To" value={formData.assignedto} />
              <FieldDisplay label="Due Date" value={formData.dueDateComplete ? new Date(formData.dueDateComplete).toLocaleDateString() : ''} />
            </>
          ) : (
            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Status
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.changeRequestStatus}
                    onChange={handleInputChange('changeRequestStatus')}
                    displayEmpty
                    size="medium"
                  >
                    <MenuItem value="">Select status</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Under Review">Under Review</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Assigned To
                </Typography>
                <TextField
                  fullWidth
                  value={formData.assignedto}
                  onChange={handleInputChange('assignedto')}
                  variant="outlined"
                  placeholder="Enter assignee name"
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Due Date
                </Typography>
                <TextField
                  fullWidth
                  type="datetime-local"
                  value={formData.dueDateComplete}
                  onChange={handleInputChange('dueDateComplete')}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Stack>
          )}
        </Box>

        {/* Change Details Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
            Change Details
          </Typography>

          {!isEditing ? (
            <>
              <FieldDisplay label="Change Type" value={formData.changeType} />
              <FieldDisplay label="Reason for Change" value={formData.reasonForChange} />
              <FieldDisplay label="Scope of Change" value={formData.scopeOfChange} />
              <FieldDisplay label="Contributors" value={formData.contributors} />
            </>
          ) : (
            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Change Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.changeType}
                    onChange={handleInputChange('changeType')}
                    displayEmpty
                    size="medium"
                  >
                    <MenuItem value="">Select change type</MenuItem>
                    <MenuItem value="Minor">Minor</MenuItem>
                    <MenuItem value="Major">Major</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                    <MenuItem value="Emergency">Emergency</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Reason for Change
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.reasonForChange}
                    onChange={handleInputChange('reasonForChange')}
                    displayEmpty
                    size="medium"
                  >
                    <MenuItem value="">Select reason</MenuItem>
                    <MenuItem value="Improvement">Improvement</MenuItem>
                    <MenuItem value="Bug Fix">Bug Fix</MenuItem>
                    <MenuItem value="New Feature">New Feature</MenuItem>
                    <MenuItem value="Compliance">Compliance</MenuItem>
                    <MenuItem value="Security">Security</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Scope of Change
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.scopeOfChange}
                  onChange={handleInputChange('scopeOfChange')}
                  variant="outlined"
                  placeholder="Describe what will be changed and the expected impact..."
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Contributors
                </Typography>
                <TextField
                  fullWidth
                  value={formData.contributors}
                  onChange={handleInputChange('contributors')}
                  variant="outlined"
                  placeholder="List of people involved in this change"
                />
              </Box>
            </Stack>
          )}
        </Box>

        {/* Metadata Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
            Metadata
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                Request ID
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                {selectedRequest.id || 'N/A'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                Created
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                {selectedRequest.created?.on ? new Date(selectedRequest.created.on).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                Created By
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                {selectedRequest.created?.by?.name || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Change request updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OverviewTab;