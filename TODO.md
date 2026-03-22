# Learnful Project TODO List

This document tracks the implementation progress of the Learnful LMS based on the PRD, Research Engine, and Tech Stack documentation.
- [x] Create [SRS.md](file:///d:/Learnful/Doc/SRS.md) for technical specifications.
- [x] Create [Project_Report.md](file:///d:/Learnful/Doc/Project_Report.md) for academic/research documentation.

## 🏗️ Phase 1: Foundation (Weeks 1-3)
- [x] Create project directory structure (`frontend`, `backend`, `Doc`, `Figma`).
- [x] Initialize Frontend (React + Vite + Tailwind 4.0).
- [x] Initialize Backend (Node.js + Express).
- [x] **Infrastructure & Auth**
    - [x] Set up Supabase project and link with Frontend/Backend.
    - [x] Run SQL schema for `profiles`, `courses`, `ai_assets`, `quizzes`, and `student_progress` in Supabase.
    - [/] Implement Supabase Auth (Magic Link/Email-Password).
- [x] **Core UI & Video Integration**
    - [x] Integrate `react-player` for YouTube embedding.
    - [x] Connect video play/pause/seek events to state (Zustand).
    - [x] Implement "Focus Mode" toggle for the learning view.

## 🧠 Phase 2: The AI Pipeline (Weeks 4-6)
- [x] **Transcript Extraction**
    - [x] Implement backend utility to fetch YouTube transcripts (`youtube-transcript`).
    - [x] Create chunking logic for 2-minute / 1000-word segments.
- [x] **Research Engine (Information Density)**
    - [x] Integrate Gemini API for semantic audit (replacing OpenAI/Claude).
    - [x] Implement System Prompt logic to calculate ID Score (1.0 - 10.0).
    - [x] Implement entity extraction for "Knowledge Points" (KP).
- [x] **Artifact Generation**
    - [x] Build generation pipeline for hierarchical Notes (Markdown).
    - [x] Build generation pipeline for Mind Maps (JSON for React Flow).
    - [x] Build generation pipeline for Cheat Sheets (Markdown tables).
- [x] **Adaptive Quiz Engine**
    - [x] Implement dynamic question count scaling based on ID Score.
    - [x] Map Bloom’s Taxonomy levels to density segments.
    - [x] Validate JSON schema for all generated assets.

## 🚀 Phase 3: Research & Refinement (Weeks 7-9)
- [x] **Advanced Features**
    - [x] Integrate Monaco Editor + Judge0 API for Code Compiler sidepanel.
    - [x] Implement progress tracking and XP points system.
    - [ ] Set up automated retention emails via Resend/Inngest.
- [/] **Research Framework (A/B Testing)**
    - [ ] Implement Group A (Control: Time-based) vs. Group B (Experimental: ID-based) logic.
    - [ ] Implement logging for Distractor Efficiency (DE) and Cognitive Load Scores.
    - [ ] Create simple Admin view for data export.

## 🛠️ Tech Stack Checklist
- [x] Frontend: React 19, Vite, Tailwind 4.0
- [x] State: Zustand
- [x] Database: Supabase (Postgres)
- [x] AI: Vercel AI SDK + LangChain.js
- [x] Visuals: React Flow
- [x] Sandbox: Judge0 API
