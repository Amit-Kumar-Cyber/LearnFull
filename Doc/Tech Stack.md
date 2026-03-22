1. The "Learnful" Tech Stack (2026 Edition)
Layer	Technology	Why this for your project?
Frontend	React 19 + Next.js 15	Next.js handles the "Server Components" needed to fetch transcripts securely without exposing API keys.
State	Zustand	Much lighter than Redux. Perfect for syncing the Video timestamp with the Notes and Mind Map.
AI Orchestration	Vercel AI SDK	The gold standard for streaming AI responses (Notes/Quizzes) word-by-word so the user doesn't wait.
Styling	Tailwind CSS 4.0	For the "Focus Mode" UI. Use Shadcn UI for the dashboard components.
Database	Supabase (Postgres)	Built-in Auth + "Vector" support (useful if you want to let users "search" their notes later).
Video	React-Player	Best library for syncing YouTube events (play/pause/seek) with your AI algorithm.
________________________________________
2. Specialized "Research" Modules
These are the libraries that make your features work:
A. The Mind Map (Knowledge Graph)
•	Library: React Flow
•	Reason: Unlike simple image generators, React Flow creates interactive nodes. In your research, you can make these nodes clickable so they jump the video to the exact timestamp where that concept was explained.
B. The Code Compiler
•	Library: Monaco Editor (The engine behind VS Code) + Judge0 API.
•	Reason: Judge0 is a robust API that executes code in a sandbox. You send the code from your React frontend to your Node.js backend, which then calls Judge0 and returns the output.
C. The Quiz Engine (Option 3 Logic)
•	Library: LangChain.js
•	Reason: This allows you to "chain" the transcript analysis.
o	Link 1: Calculate Information Density ($ID$).
o	Link 2: Generate Quiz based on $ID$.
________________________________________
3. Architecture Diagram
________________________________________
4. Implementation Strategy (The "Glue" Code)
To connect React and Node.js for your Information Density research, your data flow should look like this:
1.	React: User pastes YouTube URL.
2.	Node.js (API Route): * Fetches transcript via youtube-transcript.
o	Chunks the text into 2-minute segments.
o	Sends segments to OpenAI to count "Knowledge Points."
o	Calculates the $ID$ score.
3.	React: Receives the $ID$ score and dynamically renders the number of quiz slots.
________________________________________
5. Why this stack helps your Scopus Paper
Journals love Performance Metrics. With this stack, you can measure and report:
•	Latency: How fast the AI generates a mind map vs. a human.
•	Token Efficiency: How your $ID$ algorithm saves money by not generating useless questions for "low-density" videos.
•	System Usability Scale (SUS): Because Shadcn/Tailwind provides a professional UI, your user testing scores will be higher.
1. Database Schema (SQL)
You can run this directly in the Supabase SQL Editor:
SQL
-- 1. USERS TABLE (Handled by Supabase Auth, but we link a profile)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  xp_points INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id)
);

-- 2. COURSES / VIDEOS TABLE
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  youtube_id TEXT UNIQUE NOT NULL, -- The "v" parameter from URL
  category TEXT,
  duration_sec INTEGER,
  transcript TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AI GENERATED ASSETS (The "Super-Layer")
CREATE TABLE ai_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  notes_markdown TEXT,
  mindmap_json JSONB,
  cheatsheet_markdown TEXT,
  -- Research Columns:
  info_density_score FLOAT, -- This is your Option 3 metric
  knowledge_points_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ADAPTIVE QUIZZES
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB, -- Array of strings
  correct_answer TEXT,
  bloom_taxonomy_level TEXT, -- e.g., 'Recall', 'Analysis'
  difficulty_score FLOAT
);

-- 5. STUDENT PROGRESS & RESEARCH LOGS
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  course_id UUID REFERENCES courses(id),
  is_completed BOOLEAN DEFAULT FALSE,
  quiz_score FLOAT,
  time_spent_sec INTEGER,
  last_watched_timestamp INTEGER, -- Saved in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
________________________________________
2. Why this schema supports your Scopus Paper
By storing the info_density_score and bloom_taxonomy_level, you can generate graphs later showing:
•	Correlation: "As Information Density increased, the AI successfully generated more 'Analysis' level questions."
•	Reliability: "Students scored lower on High-Density videos, proving the assessment correctly scaled in difficulty."
________________________________________
3. The "Information Density" API Logic (Node.js)
When a student pastes a link, your Node.js backend should perform this "Research Pipeline":
1.	Extract: Get the transcript.
2.	Analyze: Send a chunk to GPT-4o.
3.	Prompt: "Identify all unique technical entities in this text. Return a count."
4.	Store: Save the count and the calculated ID Score into the ai_assets table.
5.	Generate: Create the quiz based on that score.

