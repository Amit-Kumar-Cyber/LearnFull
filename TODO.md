# Learnful Platform Development Todo List

Based on: `tech stack.md`, `prd.md`, `design doc.md`

## 1. Project Initialization & Infrastructure
- [ ] **Repository Setup**
  - [ ] Initialize Next.js project with JavaScript (React JS) (`create-next-app`).
  - [ ] Initialize Express backend structure.
  - [ ] Configure Monorepo or separate folders for Client/Server.
  - [ ] Set up ESLint, Prettier, and Husky for code quality.
  - [ ] Create `.env` layout and secure API keys (OpenAI, MongoDB, etc.).
- [ ] **Database**
  - [ ] Set up MongoDB Atlas Cluster.
  - [ ] Configure Mongoose connection in backend.
  - [ ] Create initial Mongoose Schemas:
    - [ ] `User` (Auth, Progress).
    - [ ] `Course/Video` (Metadata, Transcript).
    - [ ] `Artifacts` (Notes, MindMaps, Quizzes).

## 2. Design System & UI Foundation
- [ ] **Styling Configuration**
  - [ ] Install and configure Tailwind CSS.
  - [ ] Install **Shadcn UI** components (Button, Card, Input, Tabs, etc.).
  - [ ] Define Color Palette in `tailwind.config.ts`:
    - [ ] Primary Blue: `#1572FE`
    - [ ] Accent Purple: `#C08CEE`
    - [ ] Warning Orange: `#EEAC5C`
    - [ ] Background: `#FBFCFE`
  - [ ] Configure Typography (Inter / SF Pro Display).
- [ ] **Global Layouts**
  - [ ] Create `Navbar` component (Logo + User Profile).
  - [ ] Create `Footer` component.
  - [ ] Create `AppLayout` wrapper.

## 3. Authentication & User Management (FR-11, FR-12)
- [ ] **Backend Auth**
  - [ ] Implement `POST /api/auth/signup` (Email/Password).
  - [ ] Implement `POST /api/auth/login` (JWT generation).
  - [ ] Implement Auth Middleware (JWT protection).
- [ ] **Frontend Auth**
  - [ ] Create **Login Page**.
  - [ ] Create **Signup Page**.
  - [ ] Implement protected routes mechanism.

## 4. Core Feature: The "Watch" Page (FR-01, FR-05)
- [ ] **Video Player**
  - [ ] Install `react-player`.
  - [ ] Implement Split-Screen Layout (Left: Video, Right: Tools).
  - [ ] Configure YouTube player to be "clean" (modestbranding).
- [ ] **Coding Compiler (Programming Mode)**
  - [ ] Install **Monaco Editor** (`@monaco-editor/react`).
  - [ ] Create Editor Component (Syntax highlighting).
  - [ ] Connect to Code Execution API (Judge0 or Piston) for running code.

## 5. AI Content Generation Engine (FR-02, FR-03, FR-04)
- [ ] **Transcript Service**
  - [ ] Implement YouTube Transcript fetching (via `youtube-transcript` or similar).
- [ ] **AI Service (OpenAI / LangChain)**
  - [ ] Create prompts for **Notes Generation** (Markdown extraction).
  - [ ] Create prompts for **Cheat Sheet Generation** (Key-Value extraction).
  - [ ] Create prompts for **Mind Map Generation** (Mermaid.js or JSON graph).
- [ ] **Frontend Visualization**
  - [ ] **Notes Tab**: Render Markdown using `react-markdown`.
  - [ ] **Cheat Sheet Tab**: Create specific UI table/grid.
  - [ ] **Mind Map Tab**: Integrate **React Flow** or **Mermaid.js** to visualize the graph.

## 6. Assessment Engine (FR-06)
- [ ] **Quiz Logic**
  - [ ] Develop AI prompt to generate 25 questions per 30mins of video.
  - [ ] Support MCQ and True/False formats.
- [ ] **Quiz UI**
  - [ ] Create Quiz Modal/Drawer.
  - [ ] Implement "Taking Quiz" flow (Question by Question).
  - [ ] Implement Score calculation and "Course Completion" update.

## 7. Dashboard & Progression (FR-08, FR-09)
- [ ] **Dashboard UI**
  - [ ] Create **"Magic Paste"** Link Input component.
  - [ ] Create **"My Stats"** widgets (Hours, Quizzes, Streak).
  - [ ] Create **"Continue Learning"** grid.
- [ ] **Backend Progress Logic**
  - [ ] Track video progress events (Play/Pause/End).
  - [ ] Save Quiz results to User Profile.

## 8. Polishing & Deployment
- [ ] **UX Improvements**
  - [ ] specific Loading States / Skeletons for AI generation.
  - [ ] Responsive Design check (Mobile/Tablet).
- [ ] **Deployment**
  - [ ] Deploy Frontend to Vercel/Netlify.
  - [ ] Deploy Backend to Render/Railway/Heroku.
