"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Grid,
} from "@mui/material";
import { useAuth } from "@/app/contexts/AuthContext";

interface InboxResponse {
  success: boolean;
  requests: any[];
  totalCount: number;
}

const InboxPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [inboxData, setInboxData] = useState<InboxResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const authCredentials = localStorage.getItem("authCredentials");

        if (!authCredentials) {
          throw new Error("No authentication credentials found");
        }

        console.log("🚀 Fetching inbox data...");
        console.log("👤 Current user from useAuth:", user);

        const response = await fetch("/api/inbox", {
          headers: {
            Authorization: `Basic ${authCredentials}`, 
            "Content-Type": "application/json",
          },
        });

        console.log("📡 Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const result: InboxResponse = await response.json();
        console.log("✅ Inbox data received:", result);
        setInboxData(result);
      } catch (err: any) {
        console.error("❌ Inbox fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch inbox when user is loaded
    if (!authLoading && user) {
      fetchInbox();
    } else if (!authLoading && !user) {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [user, authLoading]);

  // Show loading while auth is loading OR inbox is loading
  if (authLoading || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
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

  // Extract user roles for display
  const userRoleNames =
    user?.effectiveroles?.map((role: any) => role.name) || [];
  const inboxRelevantRoles = [
    "Compliance Authority",
    "Document Controller",
    "Quality Manager",
  ];
  const userInboxRoles = userRoleNames.filter((roleName: string) =>
    inboxRelevantRoles.includes(roleName)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        📥 Your Inbox
      </Typography>

      {/* User Info Summary */}
      <Card sx={{ mb: 3, bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Welcome, {user?.name || "User"}!
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Your Inbox Roles:</strong>{" "}
            {userInboxRoles.length > 0
              ? userInboxRoles.join(", ")
              : "No inbox roles"}
          </Typography>

          <Typography variant="body2">
            <strong>Change Requests Found:</strong> {inboxData?.totalCount || 0}
          </Typography>

          {inboxData?.success && (
            <Chip
              label="✅ Successfully loaded"
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </CardContent>
      </Card>

      {/* Inbox Content */}
      {!inboxData?.requests || inboxData.requests.length === 0 ? (
        <Alert severity="info">
          <Typography variant="h6">No items in your inbox</Typography>
          <Typography>
            {userInboxRoles.length === 0
              ? "You don't have any roles that receive inbox items."
              : "You don't have any pending change requests based on your roles."}
          </Typography>
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {inboxData.requests.map((request: any, index: number) => (
            <Grid item xs={12} md={6} lg={4} key={request.id || index}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {request.title ||
                      `Change Request #${
                        request.changeRequestNumber || index + 1
                      }`}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={request.changeRequestStatus || "Unknown Status"}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    {request.changePriority && (
                      <Chip
                        label={`Priority: ${
                          request.changePriority.label || request.changePriority
                        }`}
                        color={
                          request.changePriority.label === "High" ||
                          request.changePriority === "High"
                            ? "error"
                            : request.changePriority.label === "Medium" ||
                              request.changePriority === "Medium"
                            ? "warning"
                            : "default"
                        }
                        size="small"
                      />
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {request.description || "No description available"}
                  </Typography>

                  {request.assignedTo && (
                    <Typography variant="caption" display="block">
                      <strong>Assigned To:</strong> {request.assignedTo}
                    </Typography>
                  )}

                  {request.changeType && (
                    <Typography variant="caption" display="block">
                      <strong>Change Type:</strong>{" "}
                      {request.changeType.label || request.changeType}
                    </Typography>
                  )}

                  {request.contributorsPrincipal && (
                    <Typography variant="caption" display="block">
                      <strong>Principal Contributor:</strong>{" "}
                      {request.contributorsPrincipal}
                    </Typography>
                  )}

                  {request.dueDateComplete && (
                    <Typography variant="caption" display="block">
                      <strong>Due Date:</strong>{" "}
                      {new Date(request.dueDateComplete).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Debug Information */}
      <Card sx={{ mt: 3, bgcolor: "#fafafa" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔍 Debug Information
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            User Roles (from useAuth):
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontSize: "0.8rem", overflow: "auto", mb: 2 }}
          >
            {JSON.stringify(userRoleNames, null, 2)}
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Inbox API Response:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontSize: "0.8rem", overflow: "auto" }}
          >
            {JSON.stringify(inboxData, null, 2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InboxPage;
