1. Executive Summary
Learnful is an AI-powered Learning Management System (LMS) that aggregates educational content from YouTube. Unlike standard embedding sites, Learnful uses Generative AI to automatically convert video content into a complete study ecosystem—generating notes, cheat sheets, mind maps, and adaptive quizzes. It aims to streamline the self-learning process for coding, design, and other disciplines by providing integrated tools (like code compilers) and progress tracking.
________________________________________
2. User Personas
•	The Self-Taught Developer: A student learning Python who watches tutorials but hates pausing to take notes and struggles to test their knowledge afterward.
•	The Crammer: A university student who pastes a lecture link to get a quick summary, cheat sheet, and mind map to review before an exam.
•	The Admin/Curator: An educator or platform manager organizing the best YouTube content into structured paths.
________________________________________
3. Functional Requirements
3.1. Core Learning Experience (The "Watch" Page)
This is the heart of the application where the video is played and AI content is displayed.
•	FR-01: YouTube Embedding: The system must embed the YouTube player cleanly without distracting external YouTube ads/recommendations (using modestbranding parameters).
•	FR-02: AI Note Generation:
o	System fetches the video transcript.
o	AI generates structured, Markdown-formatted notes with headers and bullet points.
o	Trigger: Auto-generated upon video addition.
•	FR-03: AI Cheat Sheets:
o	AI extracts key syntax, formulas, or rules (specific to the topic) into a quick-reference table.
•	FR-04: AI Mind Maps:
o	AI generates a hierarchical JSON or Markdown structure representing the relationships between concepts in the video.
o	Visualization: Frontend renders this as an interactive graph (e.g., using React Flow or Mermaid.js).
•	FR-05: Integrated Compiler (Coding Mode):
o	If the video category is "Coding/Programming," a code editor must appear (split screen or tabbed).
o	Support: Must support major languages (Python, JS, Java, C++, etc.).
o	Execution: Users can run code and see output in real-time (via APIs like Judge0 or Piston).
3.2. Assessment Engine
•	FR-06: Adaptive AI Quizzes:
o	Logic: The system analyzes video duration.
o	Rule: ~25 questions for every 30 minutes of content (Linear scaling: $Questions = \lceil \frac{Duration_{min}}{30} \times 25 \rceil$).
o	Format: Multiple Choice Questions (MCQs) and True/False.
o	Feedback: Immediate feedback on answers with explanations.
3.3. Content Management & "Bring Your Own Link"
•	FR-07: Curated Library: Admin can upload/embed videos and organize them into Categories (e.g., "Web Dev," "Graphic Design").
•	FR-08: User Link Submission (Magic Paste):
o	A distinct "Learn from Link" search bar.
o	When a user pastes a YouTube URL, the system performs a background job: Validates Link -> Fetches Transcript -> Generates Assets (Notes/Quiz/MindMap) -> Adds to user's private library.
3.4. User Progression & Retention
•	FR-09: Progress Tracking:
o	Track video completion (API events: Play, Pause, End).
o	Track Quiz Scores.
o	Visual dashboard showing "Course Completion %".
•	FR-10: Notification System:
o	Daily Reminders: Cron job sends an email (via SendGrid/AWS SES) at a user-defined time: "You're 50% through 'Python Basics'. Keep going!"
3.5. Administration & Auth
•	FR-11: Authentication: Secure Login/Signup (Email/Password + Google OAuth).
•	FR-12: Admin Dashboard:
o	Manage Users.
o	Manage Global Courses (CRUD operations).
o	View System Analytics (API usage costs, total users).

4. UI/UX Flow
1.	Landing Page: Value prop ("Turn YouTube into a Classroom"), Feature highlights, "Get Started" CTA.
2.	Dashboard:
o	"Continue Learning" (Last watched video).
o	"My Stats" (Progress bars).
o	"Paste Link" Input field.
3.	Video Learning View (The Main Interface):
o	Left Pane: Video Player.
o	Right Pane (Tabbed):
	Tab 1: Notes (AI Generated).
	Tab 2: Cheat Sheet.
	Tab 3: Mind Map (Visual Graph).
	Tab 4: Compiler (If coding).
o	Bottom Section: Quiz Module (Unlocks after video completion or available immediately).
________________________________________
5. Non-Functional Requirements
•	Latency: AI generation usually takes time (10-30 seconds). The UI must show a "Generating your study materials..." loading state/skeleton screen so the user knows it is working.
•	Responsiveness: Must work seamlessly on Desktop, Tablet, and Mobile.
•	Scalability: AI API costs can grow. Implement caching (if User A generates notes for Video X, save them to the DB. If User B watches Video X, serve the saved notes instead of calling the AI again).
