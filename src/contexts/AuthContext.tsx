import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../lib/api';
// Actually api.ts only exports default api. I should update api.ts or defining types here is fine.
// Let's use the layout I had but replace inline axios.create with import api from '../lib/api';

// Re-defining types here for now or importing them if I moved them. 
// I'll keep types here for simplicity as I didn't create a types file.
export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'admin';
  preferences: {
    notification_time: string;
    daily_reminder: boolean;
  };
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // api request interceptor handles token, but for initial check we can call /auth/me
        // Note: src/lib/api.ts baseURL is /api. So /auth/me is /api/auth/me
        const { data } = await api.get('/auth/me');
        setUser(data.user);
        setProfile(data.profile);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data } = await api.post('/auth/signup', { email, password, full_name: fullName });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setProfile(data.profile);
      return { error: null };
    } catch (error: any) {
      return { error: error.response?.data?.message || error.message };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setProfile(data.profile);
      return { error: null };
    } catch (error: any) {
      return { error: error.response?.data?.message || error.message };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      try {
        const { data } = await api.get('/me');
        setProfile(data.profile);
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
