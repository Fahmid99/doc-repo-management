import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { ChangeRequest } from "@/app/library/types/changeRequest";
import { useAuthCredentials } from "@/app/hooks/useAuthCredentials";
interface InboxResponse {
  success: boolean;
  requests: ChangeRequest[];
  totalCount: number;
}

export const useInbox = () => {
  const { user } = useAuth();
  const [inboxData, setInboxData] = useState<InboxResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const { getCredentials } = useAuthCredentials();

  const fetchInbox = useCallback(async () => {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const selectRequest = useCallback((request: any) => {
    setSelectedRequest(request);
  }, []);

  const updateRequest = useCallback((requestId: string, updates: any) => {
    setInboxData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        requests: prev.requests.map((req) =>
          req.id === requestId
            ? {
                ...req,
                ...updates,
              }
            : req
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

  useEffect(() => {
    fetchInbox();
  }, [fetchInbox]);

  return {
    requests: inboxData?.requests || [],
    totalCount: inboxData?.totalCount || 0,
    selectedRequest,
    loading,
    error,
    fetchInbox,
    selectRequest,
    updateRequest,
  };
};
