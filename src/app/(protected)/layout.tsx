// src/app/(protected)/layout.tsx
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}