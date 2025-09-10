import React from "react";
import ChangeRequestForm from "./components/ChangeRequestForm";
import PageHeader from "@/app/components/PageHeader";
import { Box } from "@mui/material";

const NewChangeRequestPage = () => {
  return (
    <Box>
      <PageHeader title="New Change Request" />
      <ChangeRequestForm />
    </Box>
  );
};

export default NewChangeRequestPage;
