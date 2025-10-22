// src/app/components/Providers.tsx
"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../library/theme";
import { AuthProvider } from "../contexts/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}