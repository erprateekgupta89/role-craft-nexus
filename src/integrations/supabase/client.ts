
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
// Using any type to avoid TypeScript errors with tables not defined in the generated types

const SUPABASE_URL = "https://ubsznmwwzgzsssulpsdp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVic3pubXd3emd6c3NzdWxwc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzQwMDgsImV4cCI6MjA1OTk1MDAwOH0.uYH-6_ZBl0a_knWWonWbnE0iGnClT84sUVtPNTV7j9Y";

// We're using `any` type here since we can't modify the generated types file
// This will allow the client to work with any table without type errors
export const supabase = createClient<any>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
