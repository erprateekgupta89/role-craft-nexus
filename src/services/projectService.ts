
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  project_id: string;
  name: string;
  manager: string;
  lead: string;
  client: string;
  mode: string;
  delivery_model: string;
  engagement_model: string;
  effort_gt_30: boolean;
  rm: string;
  work_order_id: string;
  qa: string;
  dev_model: string;
  meeting_date: string;
  created_at: string;
  updated_at: string;
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      manager:users!projects_manager_fkey(name, email, role),
      lead:users!projects_lead_fkey(name, email, role),
      rm:users!projects_rm_fkey(name, email, role),
      qa:users!projects_qa_fkey(name, email, role)
    `)
    .order('created_at', { ascending: false });
    
  if (error) throw new Error(error.message);
  
  return data as unknown as Project[];
}

export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      manager:users!projects_manager_fkey(name, email, role),
      lead:users!projects_lead_fkey(name, email, role),
      rm:users!projects_rm_fkey(name, email, role),
      qa:users!projects_qa_fkey(name, email, role)
    `)
    .eq('project_id', id)
    .single();
    
  if (error) throw new Error(error.message);
  
  return data as unknown as Project;
}

// Function to get team members for a project
export async function getTeamMembers(projectId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('project_id', projectId)
    .order('join_date', { ascending: true });

  if (error) throw new Error(error.message);
  
  return data as any[];
}

// Function to get security checklist for a project
export async function getSecurityChecklist(projectId: string) {
  const { data, error } = await supabase
    .from('security_checklist')
    .select('*')
    .eq('project_id', projectId);

  if (error) throw new Error(error.message);
  
  return data as any[];
}

// Function to get PAC history for a project
export async function getPacHistory(projectId: string) {
  const { data, error } = await supabase
    .from('pac_approval_history')
    .select(`
      *,
      author:users!pac_approval_history_author_fkey(name, email),
      reviewer:users!pac_approval_history_reviewer_fkey(name, email),
      approver:users!pac_approval_history_approver_fkey(name, email)
    `)
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return data as any[];
}
