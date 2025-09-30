import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface PageHeaderProps {
  title: string;
}


const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <Box sx={{ p: 6, width: "100%" }}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};


export default PageHeader;
