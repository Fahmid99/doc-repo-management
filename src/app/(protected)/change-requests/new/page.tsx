import React from "react";
   import ChangeRequestWithDocumentForm from "./components/ChangeRequestWithDocumentForm";
   import PageHeader from "@/app/components/PageHeader";
   import { Box } from "@mui/material";

   const NewChangeRequestPage = () => {
     return (
       <Box>
         <PageHeader title="New Change Request" />
         <ChangeRequestWithDocumentForm />
       </Box>
     );
   };

   export default NewChangeRequestPage;