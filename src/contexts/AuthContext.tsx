
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

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (session) {
              const user: User = {
                id: session.user.id,
                name: session.user.user_metadata.name || 'User',
                email: session.user.email || '',
                role: session.user.user_metadata.role || 'PM',
                image: session.user.user_metadata.avatar_url || null,
              };
              setState({ user, isLoading: false, error: null });
            } else {
              setState({ user: null, isLoading: false, error: null });
            }
          }
        );

        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const user: User = {
            id: session.user.id,
            name: session.user.user_metadata.name || 'User',
            email: session.user.email || '',
            role: session.user.user_metadata.role || 'PM',
            image: session.user.user_metadata.avatar_url || null,
          };
          setState({ user, isLoading: false, error: null });
        } else {
          setState({ ...state, isLoading: false });
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        setState({ user: null, isLoading: false, error: error as Error });
      }
    };

    checkAuth();
  }, []);

  // Azure AD login
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
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
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
