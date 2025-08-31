// src/app/(protected)/layout.tsx  
'use client';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth'; // You'll create this
import { redirect } from 'next/navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) redirect('/login');

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}