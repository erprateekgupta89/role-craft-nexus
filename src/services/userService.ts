
import { supabase } from '@/integrations/supabase/client';
import { Role } from '@/types/auth';

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role;
  created_at: string | null;
  updated_at: string | null;
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) throw new Error(error.message);
  
  return data as User[];
}

export async function getUserById(id: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw new Error(error.message);
  
  return data as User;
}

export async function getUsersByRole(role: Role): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', role)
    .order('name', { ascending: true });
    
  if (error) throw new Error(error.message);
  
  return data as User[];
}
