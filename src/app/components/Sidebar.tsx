"use client";
import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { Home, Inbox, Add, Assignment, Person } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

// ✅ TypeScript Learning: Interface for menu items
interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const pathname = usePathname();

  const { user, logout } = useAuth();
  console.log("User in Sidebar:", user);
  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "No email";

  // ✅ TypeScript Learning: Array with specific type
  const menuItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      href: "/dashboard",
      icon: <Home />,
    },
    {
      id: "inbox",
      label: "Inbox",
      href: "/inbox",
      icon: <Inbox />,
    },
    {
      id: "new-request",
      label: "New Change Request",
      href: "/change-requests/new",
      icon: <Add />,
    },
    {
      id: "ongoing-requests",
      label: "Ongoing Requests",
      href: "/change-requests",
      icon: <Assignment />,
    },
  ];

  // ✅ TypeScript Learning: Function with return type
  const isActiveRoute = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "#fafafa",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#3b82f6",
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            >
              📄
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "#111827", fontSize: 16 }}
            >
              Document Lifecycle Management
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    bgcolor: isActive ? "#f3f4f6" : "transparent",
                    border: isActive
                      ? "1px solid #e5e7eb"
                      : "1px solid transparent",
                    color: isActive ? "#111827" : "#6b7280",
                    "&:hover": {
                      bgcolor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      color: "#111827",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      minWidth: 36,
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 500 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Profile Section at Bottom */}
      <Box sx={{ borderTop: "1px solid #e0e0e0", p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={logout}
            sx={{
              borderRadius: 2,
              py: 1.5,
              px: 2,
              "&:hover": {
                bgcolor: "#f9fafb",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 48 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#6366f1",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </Avatar>
            </ListItemIcon>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 500,
                  color: "#111827",
                  fontSize: 14,
                  lineHeight: 1.3,
                  mb: 0.2,
                }}
              >
                {userName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6b7280",
                  fontSize: 12,
                  lineHeight: 1.2,
                }}
              >
                {userEmail}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "#9ca3af", fontSize: 16 }}>⋯</Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
