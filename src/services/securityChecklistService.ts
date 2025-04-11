
import { supabase } from '@/integrations/supabase/client';

export type ChecklistStatus = 'pending' | 'completed' | 'not_applicable' | 'in_progress';

export interface SecurityChecklistItem {
  id: string;
  project_id: string;
  category: string;
  requirement_type: string;
  status: ChecklistStatus;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

export async function getSecurityChecklistByProjectId(projectId: string): Promise<SecurityChecklistItem[]> {
  const { data, error } = await supabase
    .from('security_checklist')
    .select('*')
    .eq('project_id', projectId)
    .order('category', { ascending: true });
    
  if (error) throw new Error(error.message);
  
  return data as SecurityChecklistItem[];
}

export async function updateSecurityChecklistItem(id: string, updates: Partial<Pick<SecurityChecklistItem, 'status' | 'remarks'>>): Promise<SecurityChecklistItem> {
  const { data, error } = await supabase
    .from('security_checklist')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  
  return data as SecurityChecklistItem;
}

export async function addSecurityChecklistItem(item: Omit<SecurityChecklistItem, 'id' | 'created_at' | 'updated_at'>): Promise<SecurityChecklistItem> {
  const { data, error } = await supabase
    .from('security_checklist')
    .insert([item])
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  
  return data as SecurityChecklistItem;
}
