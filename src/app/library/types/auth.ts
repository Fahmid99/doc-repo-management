import { Role } from "./role";

export interface User {
  id?: string;
  username: string;
  name: string;
  email?: string;
  roles: Role[]; 
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
