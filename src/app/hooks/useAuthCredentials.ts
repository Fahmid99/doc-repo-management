// hooks/useAuthCredentials.ts
import { useCallback } from 'react';

export const useAuthCredentials = () => {
  const getCredentials = useCallback(() => {
    const authCredentials = localStorage.getItem("authCredentials");
    
    if (!authCredentials) {
      throw new Error("No authentication credentials found");
    }
    
    return authCredentials;
  }, []); // Empty dependency array - function never changes
  
  return { getCredentials };
};