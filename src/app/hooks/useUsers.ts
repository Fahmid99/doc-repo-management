import { useState, useEffect } from "react";
import { User } from "../library/types/auth";

interface useUsers {
  users: User[];
  loading: boolean;
  error: string | null;
}

export function useUsers(): useUsers {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const authCredentials = localStorage.getItem("authCredentials");
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Basic ${authCredentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data.users);
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { users, loading, error };
}
