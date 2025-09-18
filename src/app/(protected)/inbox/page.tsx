// inbox/page.tsx
"use client";
import React from "react";
import { Box } from "@mui/material";
import { InboxProvider } from "@/app/contexts/InboxContext";
import InboxListPane from "./components/InboxListPane";
import TaskDetailPane from "./components/TaskDetailPane";
import InboxPane from "./components/InboxPane";
import TaskPane from "./components/TaskPane";

const InboxPage = () => {
  return (
    <InboxProvider>
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: "#fafafa" }}
      >
        <Box
          sx={{
            width: "400px",
            borderRight: 1,
            borderColor: "divider",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <InboxPane />
        </Box>

        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <TaskPane />
        </Box>
      </Box>
    </InboxProvider>
  );
};

export default InboxPage;
