
'use client'
import React from "react";
// Add these imports to your dashboard
import { useState } from "react";
import { useRouter } from "next/navigation";
import DocumentSelectionModal from "../components/DocumentSelectionModal";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { Add, Assignment, Description } from "@mui/icons-material";
import Link from "next/link";

// ✅ TypeScript Learning: Interface for action buttons
interface ActionButton {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "success" | "warning" | "info";
}

const DashboardPage = () => {
  // ✅ TypeScript Learning: Array with specific interface type
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  // ✅ TypeScript Learning: Functions with specific return types
  const handleCreateRequestClick = (): void => {
    setModalOpen(true); // Open the modal instead of direct navigation
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const handleSelectNew = (): void => {
    setModalOpen(false);
    router.push("/change-requests/new-document"); // Navigate to new document form
  };

  const handleSelectExisting = (): void => {
    setModalOpen(false);
    router.push("/change-requests/existing-document"); // Navigate to existing document form
  };
  const actionButtons: ActionButton[] = [
    {
      id: "create-request",
      title: "Create New Change Request",
      description: "Submit a new document change request",
      href: "#", // ✅ Change to # since we're using onClick
      icon: <Add sx={{ fontSize: 40 }} />,
      color: "primary",
    },
    {
      id: "existing-requests",
      title: "Existing Change Requests",
      description: "View and manage ongoing requests",
      href: "/change-requests",
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: "warning",
    },
    {
      id: "view-documents",
      title: "View Documents",
      description: "Browse and search documents",
      href: "/documents",
      icon: <Description sx={{ fontSize: 40 }} />,
      color: "info",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: "#111827",
            mb: 2,
          }}
        >
          Document Lifecycle Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#6b7280",
            fontWeight: 400,
          }}
        >
          What would you like to do today?
        </Typography>
      </Box>

      {/* Action Buttons Row */}
      <Grid container spacing={3} justifyContent="center">
        {actionButtons.map((button) => (
          <Grid item xs={12} sm={6} md={4} key={button.id}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                border: "2px solid transparent",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  borderColor: `${button.color}.main`,
                },
              }}
              component={Link}
              href={button.href}
              style={{ textDecoration: "none" }}
            >
              <CardContent
                sx={{
                  
                  textAlign: "center",
                  py: 4,
                  px: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: `${button.color}.light`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    color: `${button.color}.main`,
                  }}
                >
                  {button.icon}
                </Box>

                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  {button.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7280",
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  {button.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats Section (Optional) */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#111827",
            mb: 3,
            textAlign: "center",
          }}
        >
          Quick Overview
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", py: 2 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  12
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  Pending Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", py: 2 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "warning.main" }}
                >
                  8
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  In Review
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", py: 2 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "success.main" }}
                >
                  156
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  Total Documents
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage;
