import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Video, Note, Quiz, MindMap, CheatSheet } from '../types';

interface VideoState {
  playing: boolean;
  progress: number;
  duration: number;
  playbackRate: number;
  setPlaying: (playing: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setPlaybackRate: (rate: number) => void;
}

interface UIState {
  focusMode: boolean;
  activeTab: string;
  setFocusMode: (mode: boolean) => void;
  setActiveTab: (tab: string) => void;
}

interface UserState {
  user: any;
  xp: number;
  level: number;
  researchGroup: 'A' | 'B';
  setUser: (user: any) => void;
  signOut: () => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  loadProfile: (userId: string) => Promise<void>;
  setResearchGroup: (group: 'A' | 'B') => void;
}

export const useStore = create<VideoState & UIState & UserState>((set, get) => ({
  // Video State
  playing: false,
  progress: 0,
  duration: 0,
  playbackRate: 1.0,
  setPlaying: (playing) => set({ playing }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),

  // UI State
  focusMode: false,
  activeTab: 'notes',
  setFocusMode: (mode) => set({ focusMode: mode }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  // User & Gamification State
  user: null,
  xp: 1540,
  level: 12,
  researchGroup: 'B',
  setUser: (user) => set({ user }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, xp: 0, level: 1 });
  },
  setResearchGroup: (group) => set({ researchGroup: group }),
  addXP: async (amount) => {
    const currentState = get();
    const newXP = currentState.xp + amount;
    const nextLevelThreshold = currentState.level * 500;
    const newLevel = newXP >= nextLevelThreshold ? currentState.level + 1 : currentState.level;

    set({ xp: newXP, level: newLevel });

    // Sync with Supabase if user exists
    if (currentState.user?.id) {
      await supabase
        .from('profiles')
        .update({ xp: newXP, level: newLevel })
        .eq('id', currentState.user.id);
    }
  },
  loadProfile: async (userId: string) => {
    try {
      // 1. Try to fetch the profile - Using limit(1) instead of single() to avoid 406 errors
      const { data, error } = await supabase
        .from('profiles')
        .select('xp, level')
        .eq('id', userId)
        .limit(1);
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data && data.length > 0) {
        set({ xp: data[0].xp, level: data[0].level });
      } else {
        // 2. Profile missing? It might be an existing user from before the trigger.
        // Create it on the fly using auth metadata.
        console.log('Profile missing for user, attempting to create...');
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .upsert([{ 
              id: userId, 
              xp: 0, 
              level: 1, 
              full_name: user.user_metadata?.full_name || 'User' 
            }])
            .select()
            .single();
            
          if (!createError && newProfile) {
            set({ xp: newProfile.xp, level: newProfile.level });
            console.log('Profile created successfully');
          } else if (createError) {
            console.error('Error creating profile:', createError);
          }
        }
      }
    } catch (err) {
      console.error('Unexpected error in loadProfile:', err);
    }
  }
}));
