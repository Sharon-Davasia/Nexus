import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Running in demo mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe database query helpers

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    clerk_id: string;
                    email: string;
                    name: string | null;
                    avatar_url: string | null;
                    credits: number;
                    subscription_tier: 'free' | 'pro' | 'enterprise';
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['users']['Insert']>;
            };
            projects: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    description: string | null;
                    tech_stack: any;
                    files: any;
                    deployment_url: string | null;
                    github_url: string | null;
                    status: 'draft' | 'building' | 'deployed' | 'error';
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['projects']['Insert']>;
            };
            conversations: {
                Row: {
                    id: string;
                    project_id: string;
                    messages: any[];
                    tokens_used: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
            };
        };
    };
}

// Helper functions for common queries

export async function getUserByClerkId(clerkId: string) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', clerkId)
        .single();

    if (error) throw error;
    return data;
}

export async function createUser(user: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getProjects(userId: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function createProject(project: Database['public']['Tables']['projects']['Insert']) {
    const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateProject(id: string, updates: Database['public']['Tables']['projects']['Update']) {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteProject(id: string) {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;
}
