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
    const { data, error } = await supabase
      .from('profiles')
      .select('xp, level')
      .eq('id', userId)
      .single();
    
    if (data && !error) {
      set({ xp: data.xp, level: data.level });
    }
  }
}));
