
import { supabase } from '@/integrations/supabase/client';

// Base API URL - would come from environment variable in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.rolecraft-nexus.com';

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  data?: any;
  
  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Input validation helper
const validateInput = (data: any, required: string[]): void => {
  if (!data) return;
  
  for (const field of required) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
};

// Helper function to get auth token
const getAuthToken = async (): Promise<string | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
};

// Generic API request function with authorization
async function apiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', 
  data?: any,
  requiredFields?: string[]
): Promise<T> {
  try {
    // Validate input if required fields are specified
    if (requiredFields && data) {
      validateInput(data, requiredFields);
    }
    
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
    
    // Log API request (non-sensitive information)
    console.log(`API Request: ${method} ${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API Error: ${response.status}, Endpoint: ${endpoint}`, errorData);
      throw new ApiError(
        errorData.message || `API Error: ${response.status}`, 
        response.status,
        errorData
      );
    }
    
    return await response.json();
  } catch (error) {
    // Enhanced error logging
    if (error instanceof ApiError) {
      throw error;
    }
    
    console.error(`Request failed for ${endpoint}:`, error);
    throw new Error(error instanceof Error ? error.message : 'Unknown API error');
  }
}

// API service exports
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, 'GET'),
  post: <T>(endpoint: string, data: any, requiredFields?: string[]) => 
    apiRequest<T>(endpoint, 'POST', data, requiredFields),
  put: <T>(endpoint: string, data: any, requiredFields?: string[]) => 
    apiRequest<T>(endpoint, 'PUT', data, requiredFields),
  patch: <T>(endpoint: string, data: any, requiredFields?: string[]) => 
    apiRequest<T>(endpoint, 'PATCH', data, requiredFields),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, 'DELETE'),
};
