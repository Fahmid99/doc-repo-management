// contexts/InboxContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useAuthCredentials } from "../hooks/useAuthCredentials";

interface InboxResponse {
  success: boolean;
  requests: any[];
  totalCount: number;
}

interface InboxContextType {
  // Data
  requests: any[];
  totalCount: number;
  selectedRequest: any | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchInbox: () => Promise<void>;
  selectRequest: (request: any) => void;
  updateRequest: (requestId: string, updates: any) => void;
}

const InboxContext = createContext<InboxContextType | undefined>(undefined);

interface InboxProviderProps {
  children: ReactNode;
}

export const InboxProvider = ({ children }: InboxProviderProps) => {
  const { user, loading: authLoading } = useAuth();
  const { getCredentials } = useAuthCredentials();

  // State - This will be shared across all components
  const [inboxData, setInboxData] = useState<InboxResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  // Function to fetch inbox data
  const fetchInbox = useCallback(async () => {
    // Don't fetch if auth is still loading or user not authenticated
    if (authLoading || !user) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const authCredentials = getCredentials();

      const response = await fetch("/api/inbox", {
        headers: {
          Authorization: `Basic ${authCredentials}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      setInboxData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array to prevent infinite renders

  // Function to select a specific request
  const selectRequest = useCallback((request: any) => {
    console.log("InboxContext - selectRequest called with:", request);
    setSelectedRequest(request);
  }, []);

  // Function to update a specific request
  const updateRequest = useCallback((requestId: string, updates: any) => {
    setInboxData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        requests: prev.requests.map((req) =>
          req.id === requestId ? { ...req, ...updates } : req
        ),
      };
    });

    setSelectedRequest((prev) => {
      if (prev?.id === requestId) {
        return { ...prev, ...updates };
      }
      return prev;
    });
  }, []);

  // Auto-fetch data when auth is ready
  useEffect(() => {
    if (!authLoading && user) {
      fetchInbox();
    }
  }, [authLoading, user, fetchInbox]);

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading authentication...
      </div>
    );
  }

  // If no user after auth loading is done, don't render anything
  // (ProtectedLayout will handle redirect)
  if (!user) {
    return null;
  }

  // Create the context value
  const value: InboxContextType = {
    requests: inboxData?.requests || [],
    totalCount: inboxData?.totalCount || 0,
    selectedRequest,
    loading,
    error,
    fetchInbox,
    selectRequest,
    updateRequest,
  };

  return (
    <InboxContext.Provider value={value}>{children}</InboxContext.Provider>
  );
};

// Custom hook to use the inbox context
export const useInbox = (): InboxContextType => {
  const context = useContext(InboxContext);

  if (context === undefined) {
    throw new Error("useInbox must be used within an InboxProvider");
  }

  return context;
};