"use client";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { user, loading } = useAuth();

  // ✅ Show loading while checking auth
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  // ✅ Redirect to login if not authenticated
  if (!user) {
    redirect("/login");
    return null;
  }

  // ✅ BEST PRACTICE: CSS Grid with sticky sidebar
  return (
    <div 
      style={{ 
        display: "grid",
        gridTemplateColumns: "240px minmax(0, 1fr)",
        minHeight: "100vh",
        isolation: "isolate", // Creates new stacking context
      }}
    >
      {/* Sidebar Container */}
      <aside 
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        }}
      >
        <Sidebar />
      </aside>
      
      {/* Main Content Area */}
      <main 
        style={{
          minWidth: 0, // Prevents grid blowout
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;