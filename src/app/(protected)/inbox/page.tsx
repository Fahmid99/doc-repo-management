"use client";
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CircularProgress, 
  Alert,
  Chip,
  Grid
} from '@mui/material';
import { useAuth } from '@/app/contexts/AuthContext'; // ✅ Use your auth context

const InboxPage = () => {
  const { user, loading: authLoading } = useAuth(); // ✅ Get user from context
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const authCredentials = localStorage.getItem("authCredentials");
        
        if (!authCredentials) {
          throw new Error("No authentication credentials found");
        }

        console.log("🚀 Fetching inbox data...");
        console.log("👤 Current user from useAuth:", user); // ✅ Debug user data
        
        const response = await fetch('/api/inbox', {
          headers: {
            'Authorization': `Basic ${authCredentials}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("📡 Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Inbox data received:", result);
        setData(result);
      } catch (err) {
        console.error("❌ Inbox fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Only fetch inbox when user is loaded
    if (!authLoading && user) {
      fetchInbox();
    } else if (!authLoading && !user) {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [user, authLoading]); // ✅ Depend on user and authLoading

  // ✅ Show loading while auth is loading OR inbox is loading
  if (authLoading || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>
          {authLoading ? "Authenticating..." : "Loading inbox..."}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <Typography variant="h6">Error loading inbox</Typography>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
    );
  }

  const { data: inboxItems, metadata } = data || { data: [], metadata: {} };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        📥 Your Inbox
      </Typography>

      {/* User Info from useAuth + API metadata */}
      <Card sx={{ mb: 3, bgcolor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Welcome, {user?.name || metadata.userName || 'User'}! {/* ✅ Use user from context */}
          </Typography>
          
          {/* ✅ Show roles from user context */}
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Your Roles (from useAuth):</strong> {
              user?.roles?.map(role => role.name).join(', ') || 'None'
            }
          </Typography>
          
          {/* Show what the API returned */}
          <Typography variant="body2">
            <strong>API Returned Roles:</strong> {metadata.userRoles?.join(', ') || 'None'}
          </Typography>
          
          <Typography variant="body2">
            <strong>Visible Statuses:</strong> {metadata.visibleStatuses?.join(', ') || 'None'}
          </Typography>
          <Typography variant="body2">
            <strong>Total Items:</strong> {metadata.totalCount || 0}
          </Typography>
        </CardContent>
      </Card>

      {/* Rest of your component stays the same */}
      {inboxItems.length === 0 ? (
        <Alert severity="info">
          <Typography variant="h6">No items in your inbox</Typography>
          <Typography>
            {metadata.message || "You don't have any pending items based on your role."}
          </Typography>
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {inboxItems.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={item.id || index}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title || `Item ${index + 1}`}
                  </Typography>
                  
                  <Chip 
                    label={item.status || 'Unknown Status'} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {item.description || 'No description available'}
                  </Typography>
                  
                  {item.priority && (
                    <Typography variant="caption" display="block">
                      Priority: {item.priority}
                    </Typography>
                  )}
                  
                  {item.createdBy && (
                    <Typography variant="caption" display="block">
                      Created by: {item.createdBy}
                    </Typography>
                  )}
                  
                  {item.createdAt && (
                    <Typography variant="caption" display="block">
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Enhanced Debug Info */}
      <Card sx={{ mt: 3, bgcolor: '#fafafa' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔍 Debug Information
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            User from useAuth:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem', overflow: 'auto', mb: 2 }}>
            {JSON.stringify(user, null, 2)}
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            API Response:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InboxPage;