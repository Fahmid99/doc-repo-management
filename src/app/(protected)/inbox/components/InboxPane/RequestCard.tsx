// inbox/components/InboxPane/RequestCard.tsx
"use client";
import React from "react";
import { ChangeRequest } from "@/app/library/types/changeRequest";
import { Box, ListItem, Typography, Avatar } from "@mui/material";
import { FiberManualRecord, StarBorder, Person } from "@mui/icons-material";

interface RequestCardProps {
  request: ChangeRequest;
  isSelected: boolean;
  isPinned?: boolean;
  onSelect: (request: ChangeRequest) => void;
}

const RequestCard = ({
  request,
  isSelected,
  isPinned = false,
  onSelect,
}: RequestCardProps) => {
  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
    } catch {
      return "";
    }
  };

  // Get assignee initial
  const getAssigneeInitial = () => {
    const assignedTo = request.data?.assignedto || "";
    return assignedTo.charAt(0).toUpperCase() || "U";
  };

  // Get creation date
  const getCreationDate = () => {
    return request.created?.on || request.data?.dueDateComplete || "";
  };

  return (
    <Box>
      <Box
        button
        selected={isSelected}
        onClick={() => {
          console.log("RequestCard clicked:", request.id);
          onSelect(request);
        }}
        sx={{
          py: 1.5,
          px: 2,
          cursor: "pointer",
          backgroundColor: isPinned ? "#fffef7" : "transparent",
          borderBottom: "1px solid #f1f1f1",
          borderLeft: isPinned ? "3px solid #ff9800" : "none",
          ...(isSelected && {
            backgroundColor: "#e3f2fd",
            borderLeft: "3px solid #1976d2",
          }),
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          transition: "background-color 0.2s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            gap: 1.5,
          }}
        >
          {/* Status Indicator Dot */}
          <Box sx={{ pt: 0.5 }}></Box>

          {/* Assignee Avatar */}
          <Box sx={{ pt: 0.25 }}>
            <Avatar
              sx={{
                width: 20,
                height: 20,
                fontSize: "0.75rem",
                fontWeight: 500,
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              {getAssigneeInitial()}
            </Avatar>
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Header Row - Title and Date */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "text.primary",
                  lineHeight: 1.3,
                }}
              >
                {request.data?.title || "Company"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontSize: "0.75rem", ml: 1 }}
              >
                {formatDate(getCreationDate())}
              </Typography>
            </Box>

            {/* Status Line */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontSize: "0.75rem" }}
              >
                {request.data?.description || "No description provided"}
              </Typography>
            </Box>

            {/* Request Title/Number */}
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                fontSize: "0.875rem",
                fontWeight: 500,
                mb: 0.25,
              }}
            >
              {request.data.dueDateComplete}
            </Typography>

            {/* Description with Assignee */}
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.8rem",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {request.data?.assignedto && (
                <Person
                  sx={{
                    fontSize: "0.875rem",
                    mr: 0.5,
                    verticalAlign: "middle",
                  }}
                />
              )}
              {request.data?.description
                ? `Requested by ${request.created.by.name}`
                : "No description available"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Border divider */}
    </Box>
  );
};

export default RequestCard;
