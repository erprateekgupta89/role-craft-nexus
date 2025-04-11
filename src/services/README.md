
# RoleCraft Nexus Service Layer

This directory contains service modules for interacting with the backend API.

## Service Structure

Services are organized by domain:

- `auth.ts` - Authentication services
- `projects.ts` - Project management services
- `tasks.ts` - Task management services
- `users.ts` - User management services
- `reports.ts` - Reporting and analytics services

## Integration with Supabase

In a production environment, these services will interact with Supabase for:
- Database operations
- Authentication validation
- Storage operations

## Service Implementation

Each service follows a consistent pattern with typed request/response objects and proper error handling.

Example service implementation (to be built out in future updates):

```typescript
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in_progress' | 'completed';
  created_at: string;
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw new Error(error.message);
  
  return data as Project[];
}

// Get a single project by ID
export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw new Error(error.message);
  
  return data as Project;
}

// Add more service methods as needed
```
