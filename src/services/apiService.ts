
import { supabase } from '@/integrations/supabase/client';

// Base API URL - would come from environment variable in production
const API_BASE_URL = 'https://api.rolecraft-nexus.com';

// Helper function to get auth token
const getAuthToken = async (): Promise<string | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
};

// Generic API request function with authorization
async function apiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', 
  data?: any
): Promise<T> {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  
  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };
  
  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }
  
  return await response.json();
}

// API service exports
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, 'GET'),
  post: <T>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'POST', data),
  put: <T>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'PUT', data),
  patch: <T>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'PATCH', data),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, 'DELETE'),
};
