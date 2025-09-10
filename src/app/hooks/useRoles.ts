import { useState, useEffect } from "react";
import { Role } from "../library/types/role";

interface useRoles {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

export function useRoles(): useRoles {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const authCredentials = localStorage.getItem("authCredentials");
      const response = await fetch("/api/roles", {
        headers: {
          Authorization: `Basic ${authCredentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();

      setRoles(data.roles);
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { roles, loading, error };
}
