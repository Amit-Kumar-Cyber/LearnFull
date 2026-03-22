-- Learnful Database Schema
-- Run this in the Supabase SQL Editor

-- 1. USERS TABLE (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  xp_points INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. COURSES / VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  youtube_id TEXT UNIQUE NOT NULL,
  category TEXT,
  duration_sec INTEGER,
  transcript TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AI GENERATED ASSETS
CREATE TABLE IF NOT EXISTS public.ai_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  notes_markdown TEXT,
  mindmap_json JSONB,
  cheatsheet_markdown TEXT,
  info_density_score FLOAT,
  knowledge_points_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ADAPTIVE QUIZZES
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT,
  bloom_taxonomy_level TEXT,
  difficulty_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. STUDENT PROGRESS & RESEARCH LOGS
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  course_id UUID REFERENCES public.courses(id),
  is_completed BOOLEAN DEFAULT FALSE,
  quiz_score FLOAT,
  time_spent_sec INTEGER,
  last_watched_timestamp INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
