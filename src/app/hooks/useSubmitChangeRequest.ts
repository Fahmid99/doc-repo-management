import { useState } from "react";
import { ChangeRequestFormData } from "@/app/library/types/changeRequest";

export function useSubmitChangeRequest() {
  const [isLoading, setIsLoading] = useState(false); // Fixed: isLoading (capital L)
  const [error, setError] = useState<string | null>(null);

  const submitChangeRequest = async (data: ChangeRequestFormData) => { // Changed name
    setIsLoading(true);
    setError(null);

    try {
      const authCredentials = localStorage.getItem("authCredentials");

      const response = await fetch("/api/change-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authCredentials}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit change request");
      } 
      return result;
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { submitChangeRequest, isLoading, error }; // Fixed: submitChangeRequest, isLoading
}