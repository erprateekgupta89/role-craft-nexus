
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'react-router-dom';
import { AuthContextProps, AuthState, User } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

// Mock user data - this would come from your auth provider in production
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'PM',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'PoM',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'AVP',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    role: 'VP',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    role: 'MR',
  }
];

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setState({ user, isLoading: false, error: null });
        } else {
          setState({ ...state, isLoading: false });
        }
      } catch (error) {
        setState({ user: null, isLoading: false, error: error as Error });
      }
    };

    checkAuth();
  }, []);

  // Mock login functionality - replace with actual Azure AD auth in production
  const login = async () => {
    try {
      setState({ ...state, isLoading: true });
      
      // In production, this would be replaced with actual Azure AD OAuth flow
      // For now, we'll simulate a login with a random user from our mock data
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      
      // Store user in local storage for persistence
      localStorage.setItem('user', JSON.stringify(randomUser));
      
      setState({ user: randomUser, isLoading: false, error: null });
      toast({
        title: "Login successful",
        description: `Welcome back, ${randomUser.name}!`,
      });
      router.navigate('/dashboard');
    } catch (error) {
      setState({ user: null, isLoading: false, error: error as Error });
      toast({
        title: "Login failed",
        description: "There was a problem with your login.",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      setState({ ...state, isLoading: true });
      
      // Clear user from local storage
      localStorage.removeItem('user');
      
      setState({ user: null, isLoading: false, error: null });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      router.navigate('/');
    } catch (error) {
      setState({ ...state, isLoading: false, error: error as Error });
      toast({
        title: "Logout failed",
        description: "There was a problem with your logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
