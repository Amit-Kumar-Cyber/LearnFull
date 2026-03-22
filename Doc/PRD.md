Product Requirements Document (PRD): Learnful (v2.0)
Project Name: Learnful
Target: Students (Self-paced learners) & Educators
Research Core: Adaptive Assessment via Information Density (ID) Mapping
________________________________________
1. Executive Summary
Learnful is an AI-driven LMS that transforms passive YouTube content into an interactive, structured, and assessed learning ecosystem. It solves the "passive viewing" problem by generating real-time study artifacts (Notes, Mind Maps, Cheat Sheets) and introduces a novel Information-Density-Based Quiz Engine that scales assessment complexity based on the semantic richness of the video.
________________________________________
2. Functional Requirements (The "Learnful" Suite)
2.1. The AI Learning Interface (The Watch Page)
•	YouTube Player Integration: Clean embedding with progress syncing.
•	AI Sidepanel: A tabbed interface containing:
o	Auto-Notes: Hierarchical Markdown notes with timestamps.
o	Cheat Sheets: Tabular data for key syntax, formulas, or terminology.
o	Mind Maps: A visual graph of concept relationships (via React Flow).
•	Integrated Compiler: A split-screen Monaco editor for coding courses supporting 10+ languages (via Judge0 API).
2.2. The Research Module: Adaptive Assessment Engine
•	Semantic Parser: The system must break transcripts into "Concept Windows" (e.g., 2-minute segments).
•	Information Density (ID) Scoring: Instead of a fixed 25 questions/30 mins, the system applies the formula:
$$Questions = \frac{\text{Unique Concepts} + \text{Procedural Steps}}{\text{Time Segment}} \times \text{Scaling Factor}$$
•	Bloom’s Taxonomy Mapping: High-density segments trigger "Analysis/Evaluation" questions; low-density segments trigger "Recall" questions.
2.3. User Experience & Automation
•	Magic Link Submission: Users paste a URL; the system triggers the "Generation Pipeline" (Transcript -> ID Mapping -> Artifact Creation).
•	Student Dashboard: Tracks "Course Completion %" and "Average Quiz Mastery."
•	Retention Loop: Automated daily email reminders (via Resend/Inngest) highlighting the next concept in the queue.
•	Admin Dashboard: Tools for content curators to organize YouTube playlists into structured categories (Coding, Design, etc.).
________________________________________
3. Technical Architecture (The Stack)
Component	Technology	Role
Frontend	Next.js 15 (App Router)	Core UI & Server-Side Rendering.
Styling	Tailwind CSS + Shadcn UI	Professional, responsive "Focus-Mode" design.
Backend/DB	Supabase (PostgreSQL)	Auth, Database, and Caching AI assets.
AI Processing	OpenAI GPT-4o + LangChain	Analyzing ID and generating structured JSON.
Compiler	Judge0 API	Executing student code in a sandbox.
Visuals	React Flow	Rendering the AI-generated Mind Maps.
________________________________________
4. The Research Framework (For Scopus Publication)
To ensure this project is publishable, the following "Research Hooks" are built into the PRD:
4.1. Comparative Variables
The app must support an A/B Testing Mode for your research:
•	Group A (Control): Receives 1 question per minute of video (Time-based).
•	Group B (Experimental): Receives questions based on the ID Algorithm.
4.2. Measured Metrics
The system will log data for your paper:
1.	Distractor Efficiency (DE): Accuracy of the AI in creating "plausible" wrong answers.
2.	Cognitive Load Score: Post-quiz survey results from users.
3.	Completion Velocity: Does ID-based learning help students finish videos faster?
________________________________________
5. UI/UX Reference Architecture
•	Sidebar Navigation: Category-based (e.g., "Recently Learned," "My Mind Maps").
•	The "Study Mode" Toggle: Hides all distractions, leaving only the Video and the Compiler/Notes.
•	Responsive Breakpoints: * Desktop: 3-column (Nav | Video | AI Tools).
o	Mobile: Single column with a bottom-tab bar for "Notes" and "Quiz."
________________________________________
6. Implementation Roadmap
Phase 1: Foundation (Weeks 1-3)
•	Auth & Database setup.
•	YouTube Embed & Basic UI layout.
•	Integration of youtube-transcript-api.
Phase 2: The AI Pipeline (Weeks 4-6)
•	Developing the ID Algorithm prompts.
•	JSON schema validation for Quizzes and Mind Maps.
•	Development of the "Magic Link" background worker.
Phase 3: Research & Refinement (Weeks 7-9)
•	Implementation of the Code Compiler.
•	Running the user study (A/B testing for the paper).
•	Data collection for Scopus submission.

