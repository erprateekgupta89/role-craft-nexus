
import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  id: string;
  project_id: string;
  name: string;
  role: string;
  join_date: string;
  relieve_date: string | null;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

export async function getTeamMembersByProjectId(projectId: string): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('project_id', projectId)
    .order('join_date', { ascending: true });
    
  if (error) throw new Error(error.message);
  
  return data as TeamMember[];
}

export async function addTeamMember(teamMember: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .insert([teamMember])
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  
  return data as TeamMember;
}

export async function updateTeamMember(id: string, updates: Partial<Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>>): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  
  return data as TeamMember;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(error.message);
}
