// src/app/components/Sidebar.tsx
'use client';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inbox', href: '/inbox' },
    { label: 'Change Requests', href: '/change-requests' },
    { label: 'Review', href: '/review' },
  ];

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100vh' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}