UI/UX Flow
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



Product Design Document: YouTube Learning Platform
Project Goal: Transform passive YouTube video consumption into an active, structured classroom experience. Core Value Proposition: "Turn YouTube into a Classroom."
________________________________________
1. Visual Identity & Design System
Color Palette (Source: LMSZONE / Dribbble)
This palette combines professional deep blues with energetic accents, suitable for long study sessions without eye strain.
•	Primary Action (Blue): #1572FE (Buttons, Active Links, Progress Bars)
•	Secondary Accent (Purple): #C08CEE (AI Highlights, "Magic" features)
•	Warm Accent (Orange): #EEAC5C (Warnings, Important Notifications, Quiz Badges)
•	Dark Text / UI Elements: #292940 (Headings, Primary Navigation)
•	Background (Clean White): #FBFCFE (Main page background - "Wash Me")
•	Borders / Dividers: #E2E6EE (Card borders, inactive tabs)
Typography & Spacing
•	Font Family: Inter or SF Pro Display (Clean, modern sans-serif).
•	Visual Hierarchy:
o	H1/Headings: Bold, Dark Navy (#292940).
o	Body Text: Regular weight, slightly softer black for readability.
•	Layout Principle: The Golden Ratio (1:1.618).
o	Application: In the Video Learning View, the split screen should roughly follow the 62% / 38% split (Video takes ~62% width, Tools take ~38%).
________________________________________
2. Page-by-Page Design Specifications
A. Landing Page
•	Goal: Convert visitors immediately by showing the "magic."
•	Layout:
o	Hero Section: Center-aligned. Large H1 "Turn YouTube into a Classroom." Subtext explaining the AI capabilities.
o	CTA: Large, solid #1572FE button: "Get Started" or "Paste YouTube Link".
o	Feature Highlights (Grid): 3-column layout showcasing:
1.	AI Notes (Notion-style icon).
2.	Mind Mapping (Node graph icon).
3.	Active Recall (Quiz icon).
o	Social Proof: "Trusted by..." logos in grayscale #E2E6EE.
B. Dashboard (Reference: Mindgrasp)
•	Layout: Clean Grid System.
•	Background: #FBFCFE (White).
•	Header: Simple top bar with Logo (Left) and User Profile (Right).
•	Core Elements:
1.	"Paste Link" Input: A prominent, wide input field at the top of the content area. Shadow: Soft drop shadow to make it float.
2.	"My Stats" Row: Three rectangular cards using the Golden Ratio for width.
	Metrics: "Hours Learned", "Quizzes Passed", "Current Streak".
	Visuals: Minimalist ring charts in #1572FE and #EEAC5C.
3.	"Continue Learning" (The Grid):
	Reference: Mindgrasp’s course grid.
	Card Design:
	Thumbnail: 16:9 aspect ratio (matches YouTube thumbnails).
	Title: Bold, 2 lines max.
	Progress Bar: Thin #E2E6EE line with a #1572FE fill overlay at the bottom of the card.
	Hover Effect: Card lifts slightly (Y-axis -4px), shadow deepens.
C. Video Learning View (The Main Interface)
•	Layout: Split Screen (Reference: Scrimba).
•	Ratio: Video Player (Left, 65%) | Tools Panel (Right, 35%).
Left Pane: The Player
•	Content: YouTube Video Player embedded (clean UI, custom controls if possible).
•	Bottom Section (Below Video):
o	Quiz Module: A collapsible drawer or distinct section.
o	State: Locked (Grayed out) until video finishes, or "Take Quiz Now" button active immediately.
o	Visual: When active, uses #EEAC5C (Orange) to signal "Test Mode."
Right Pane: The Tools (Tabbed Interface)
•	Navigation: A sleek tab bar at the top of the right pane.
o	Active Tab: Underlined with #1572FE, text bold.
o	Inactive Tab: Text #292940 (opacity 60%).
Tabs Breakdown:
1. Notes (Reference: Notion)
•	Visual Style:
o	Pure white background.
o	Headers: H1, H2, H3 pre-styled.
o	AI Integration: A "Generate Notes" floating button (bottom right) in #C08CEE (Purple).
o	Text: Slash commands (e.g., /summary) functionality.
2. Cheat Sheet
•	Visual Style: Code-block aesthetic. Light gray background boxes (#F5F7FA) for formulas, syntax, or key dates. High contrast.
3. Mind Map (Reference: Mapify)
•	Visual Style:
o	Canvas: Infinite pan/zoom canvas.
o	Nodes: Rounded rectangles with colored borders corresponding to the palette.
o	Interaction: Clicking a node expands children nodes (animated spring effect).
o	Auto-Gen: The map is pre-populated by AI based on video transcripts.
4. Compiler (Optional/Contextual)
•	Visual Style: Dark mode editor (Contrast against the white UI). Syntax highlighting matches a "Dracula" or "Monokai" theme to differentiate from the Notes tab.
________________________________________
3. User Flow
1.	Entry: User lands on Landing Page -> Pastes YouTube URL -> Clicks "Get Started".
o	System Action: Backend fetches video transcript + metadata.
2.	Processing: Loading screen (Pulse animation in #1572FE) -> Redirects to Video Learning View.
3.	Learning:
o	User watches video on Left.
o	User selects "Notes" tab on Right -> Clicks "AI Generate" -> Structured notes appear (Notion style).
o	User switches to "Mind Map" -> Visualizes connection between topics.
4.	Reinforcement:
o	Video ends.
o	Bottom Section highlights "Quiz Unlocked".
o	User takes 5-question quiz.
5.	Retention:
o	User returns to Dashboard.
o	New card appears in "Continue Learning".
o	"My Stats" progress bar increments.
________________________________________
4. UI Details (Golden Ratio Application)
•	Typography Scale: If body text is 16px, Headers should be ~26px (16 * 1.618).
•	Panel Widths: On a 1920px screen:
o	Video Panel: ~1186px wide.
o	Tools Panel: ~734px wide.
•	Card Dimensions: If card width is 300px, height should be ~185px (excluding text area) or ~485px total depending on verticality desired.

