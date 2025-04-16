
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: Error | null }>;
  signUp: (email: string, password: string, userData?: Record<string, any>) => Promise<{ success: boolean; error: Error | null }>;
  signOut: () => Promise<void>;
  setAuthError: (error: Error | null) => void;
  userRole: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Set user role from session metadata
        if (session?.user) {
          const role = session.user.user_metadata.role as string || null;
          setUserRole(role);
          
          // Don't redirect during initial loading
          if (!loading) {
            if (event === 'SIGNED_IN') {
              // Defer redirect to avoid deadlock
              setTimeout(() => {
                // Redirect based on role
                if (role === 'super-admin') {
                  navigate('/super-admin');
                } else {
                  navigate('/clinic-admin');
                }
              }, 0);
            } else if (event === 'SIGNED_OUT') {
              // Defer redirect to avoid deadlock
              setTimeout(() => {
                navigate('/login');
              }, 0);
            }
          }
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Set user role from session metadata
      if (session?.user) {
        const role = session.user.user_metadata.role as string || null;
        setUserRole(role);
      }
      
      setLoading(false);
    }).catch(error => {
      console.error("Error getting session:", error);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, loading]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error as Error);
      return { success: false, error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, userData?: Record<string, any>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error as Error);
      return { success: false, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error as Error);
    }
  };

  const setAuthError = (newError: Error | null) => {
    setError(newError);
  };

  const value = {
    session,
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    setAuthError,
    userRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
