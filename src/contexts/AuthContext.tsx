import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextProps, AuthState, User } from '@/types/auth';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Default state for authentication
const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  // Auto-login as MR user for development
  useEffect(() => {
    const autoLogin = async () => {
      try {
        // Create a dummy MR user for development purposes
        const mrUser: User = {
          id: 'mr-test-user-id',
          name: 'Test MR User',
          email: 'mr-test@example.com',
          role: 'MR',
          image: null,
        };
        
        setState({
          user: mrUser,
          isLoading: false,
          error: null
        });
        
        // Redirect to dashboard after auto-login
        if (window.location.pathname === '/login') {
          navigate('/dashboard');
        }
      } catch (error) {
        setState({ user: null, isLoading: false, error: error as Error });
      }
    };

    // Call auto-login
    autoLogin();
    
    // Return empty cleanup function to satisfy useEffect
    return () => {};
  }, [navigate]);

  // Keep the original login method for future use
  const login = async () => {
    try {
      setState({ ...state, isLoading: true });
      
      // In production, this would use Azure AD provider
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          scopes: 'email profile',
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
      
      // The redirection will happen automatically
    } catch (error) {
      setState({ user: null, isLoading: false, error: error as Error });
      toast({
        title: "Login failed",
        description: (error as Error).message || "There was a problem with your login.",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      setState({ ...state, isLoading: true });
      
      // For the bypassed login, we just reset the state
      setState({ user: null, isLoading: false, error: null });
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      navigate('/');
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
