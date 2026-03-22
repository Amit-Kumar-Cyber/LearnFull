# Software Requirements Specification (SRS) - Learnful

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a detailed description of the software requirements for the **Learnful** platform. It will outline the functional and non-functional requirements, external interfaces, and system features necessary for students and educators to transform video content into structured learning artifacts.

### 1.2 Scope
Learnful is an AI-powered Learning Management System (LMS) that integrates:
- YouTube video analysis via transcript extraction.
- AI-driven Information Density (ID) scoring for adaptive assessment.
- Automatic creation of Study Notes, Mind Maps, and Cheat Sheets.
- An integrated code compiler using Judge0 for programming education.
- Gamification via XP and Leveling systems.
- Persistence and authentication via Supabase.

### 1.3 Definitions, Acronyms, and Abbreviations
- **ID**: Information Density
- **KP**: Knowledge Points
- **SRS**: Software Requirements Specification
- **PRD**: Product Requirements Document
- **LMS**: Learning Management System
- **DE**: Distractor Efficiency

---

## 2. Overall Description

### 2.1 Product Perspective
Learnful is a standalone web application built with a modern React frontend and a Node.js/Express backend, utilizing Supabase as the BaaS (Backend as a Service) for authentication and data storage.

### 2.2 Product Functions
- **Video Analysis**: Parsing YouTube URLs to extract transcripts and compute complexity.
- **Adaptive Assessment**: Scaling quiz difficulty and quantity based on content density.
- **Artifact Visualization**: Rendering hierarchical notes, React Flow mind maps, and markdown-based reference sheets.
- **Interactive Coding**: Real-time code execution in an embedded Monaco editor.
- **User Progress Tracking**: Persisting completion status and gamification rewards in a PostgreSQL database.

### 2.3 User Classes and Characteristics
- **Students**: Primary users who watch videos, take quizzes, and track progress.
- **Educators/Curators**: Admin users who organize playlists and sets of videos into curriculum structures.
- **Researchers**: Users analyzing the A/B testing data (Group A vs Group B) for Scopus-level publication studies.

### 2.4 Operating Environment
- **Browser**: Modern web browsers (Chrome, Firefox, Safari, Edge).
- **Hosting**: Vercel/Netlify for Frontend; Render/Railway for Backend.
- **Database**: Supabase (Postgres).

---

## 3. System Features

### 3.1 AI Generation Pipeline
- **Description**: The system shall process a YouTube URL, fetch the transcript, chunk it into 1000-word blocks, and send it to Gemini Pro for analysis.
- **Requirement 1**: Success rate for transcript extraction must exceed 95% for videos with closed captions.
- **Requirement 2**: AI output must be validated against a strict JSON schema (MindMap, Quiz, Notes).

### 3.2 Information-Density-Based Quiz Engine
- **Description**: Quizzes shall scale dynamically using the ID score (1.0 - 10.0).
- **Scaling Logic**:
  - ID 1-3: 5 Recall-based questions.
  - ID 4-7: 15 Application-based questions.
  - ID 8-10: 25+ Evaluation-based questions.

### 3.3 Integrated Code Compiler
- **Description**: The platform shall provide a split-screen coding environment supporting 10+ languages via the Judge0 API.

### 3.4 Gamification System
- **Description**: Users earn XP based on quiz performance. Level-ups occur every 500 XP threshold.

---

## 4. External Interface Requirements

### 4.1 User Interfaces
- **Dashboard**: Card-based interface for course navigation.
- **Learning View**: Three-column layout (Navigation | Video Player | AI Sidepanel).
- **Focus Mode**: A distraction-free overlay hiding all interface elements except the video and the active study tool.

### 4.2 Software Interfaces
- **YouTube Data API / Transcript API**: For video metadata and closed captions.
- **Judge0 API**: For sandboxed code execution.
- **Supabase Auth**: For magic link and email authentication.
- **Gemini API**: For LLM-based content generation.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Video playback shall not lag due to sidebar AI renders.
- Mind Map visualization must remain fluid using canvas-based rendering (React Flow).

### 5.2 Security
- User data must be protected via Supabase Row Level Security (RLS).
- API keys (Gemini, Judge0) must be stored in server-side environment variables (`.env`).

### 5.3 Reliability
- The system should maintain a graceful fallback (mock data) if AI APIs or Transcript APIs are unavailable.
