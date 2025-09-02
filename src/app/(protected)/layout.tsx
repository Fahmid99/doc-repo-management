'use client';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { user, loading } = useAuth();
  
  // ✅ Show loading while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }
  
  // ✅ Redirect to login if not authenticated
  if (!user) {
    redirect('/login');
    return null;
  }

  // ✅ User is authenticated - show sidebar + page
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;