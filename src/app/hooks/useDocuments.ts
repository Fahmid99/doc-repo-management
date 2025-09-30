import { useState, useEffect } from "react";
import { Document } from "../library/types/document";

interface useDocuments {
  documents: Document[];
  loading: boolean;
  error: string | null;
}

export function useDocuments(): useDocuments {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const authCredentials = localStorage.getItem("authCredentials");
      const response = await fetch("/api/documents", {
        headers: {
          Authorization: `Basic ${authCredentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();
      console.log(data)
      setDocuments(data.documents);
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { documents, loading, error };
}
