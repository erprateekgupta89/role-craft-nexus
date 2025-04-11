
export type Role = 'PM' | 'PoM' | 'AVP' | 'VP' | 'MR';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}
