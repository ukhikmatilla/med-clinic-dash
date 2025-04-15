
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: string;
  role: 'super-admin' | 'clinic-admin';
  clinic_name?: string;
  created_at: string;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Use type-safe query to check if profile exists
        const { data, error: queryError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (queryError) {
          // If no profile exists, create one based on user metadata
          if (queryError.code === 'PGRST116') {
            const role = user.user_metadata.role || 'clinic-admin';
            const clinic_name = user.user_metadata.clinic_name;
            
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                role: role as 'super-admin' | 'clinic-admin',
                clinic_name
              })
              .select()
              .single();
            
            if (insertError) throw insertError;
            setProfile(newProfile as UserProfile);
          } else {
            throw queryError;
          }
        } else {
          setProfile(data as UserProfile);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Omit<UserProfile, 'id' | 'created_at'>>) => {
    if (!user) return { success: false, error: new Error('User not authenticated') };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data as UserProfile);
      return { success: true, error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err as Error);
      return { success: false, error: err as Error };
    }
  };

  return { profile, loading, error, updateProfile };
}
