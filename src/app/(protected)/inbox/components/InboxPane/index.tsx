import React, { useState } from "react";
import { useInbox } from "@/app/contexts/InboxContext";
import { Box, List } from "@mui/material";
import RequestCard from "./RequestCard";
// InboxPane/index.tsx
import InboxFilters from "./InboxFilters";

const InboxPane = () => {
  const { requests, selectedRequest, selectRequest } = useInbox();

  // Filter state
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    priority: "all",
  });

  // Define your filter configurations
  const filterConfigs = [
    {
      key: "role",
      label: "Role",
      options: [
        { value: "admin", label: "Admin", count: 5 },
        { value: "user", label: "User", count: 12 },
        { value: "manager", label: "Manager", count: 3 },
        {
          value: "Compliance Authority",
          label: "Compliance Authority",
          count: 3,
        },
        {
          value: "Document Controller",
          label: "Document Controller",
          count: 3,
        },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { value: "open", label: "Open", count: 8 },
        { value: "in-progress", label: "In Progress", count: 7 },
        { value: "completed", label: "Completed", count: 5 },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      options: [
        { value: "high", label: "High", count: 3 },
        { value: "medium", label: "Medium", count: 10 },
        { value: "low", label: "Low", count: 7 },
      ],
    },
  ];

  // Filter the requests
  const filteredRequests = requests.filter((request) => {
    if (filters.role !== "all" && request.data.assignedto !== filters.role)
      return false;
    if (filters.status !== "all" && request.status !== filters.status)
      return false;
    if (filters.priority !== "all" && request.priority !== filters.priority)
      return false;
    return true;
  });

  return (
    <Box>
      <InboxFilters
        filters={filters}
        onFilterChange={setFilters}
        filterConfigs={filterConfigs}
        totalCount={requests.length}
        filteredCount={filteredRequests.length}
      />

      <List>
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            isSelected={selectedRequest?.id === request.id}
            onSelect={selectRequest}
          />
        ))}
      </List>
    </Box>
  );
};

export default InboxPane;
