# Learnful 2.0 🚀

**Learnful** is a state-of-the-art, AI-powered Learning Management System (LMS) designed to transform how students learn from digital content. By leveraging advanced AI models, Learnful converts YouTube videos into comprehensive study materials, including transcripts, mind maps, cheat sheets, and interactive quizzes.

![Learnful Banner](https://github.com/Amit-Kumar-Cyber/LearnFull/blob/main/frontend/src/ScreenShots/SS1.png)
![Learnful Banner](https://github.com/Amit-Kumar-Cyber/LearnFull/blob/main/frontend/src/ScreenShots/SS2.png)

## ✨ Key Features

-   📺 **YouTube Integration**: Paste any YouTube link to generate instant learning materials.
-   🤖 **AI Learning Assistant**: Chat with a specialized AI that knows the context of your current video.
-   🧠 **Concept Mapping**: Automatically generated mind maps to visualize complex topics.
-   📝 **Smart Notes & Cheat Sheets**: AI-distilled summaries and quick-reference guides.
-   💻 **Integrated Code Compiler**: Practice coding in Python, JavaScript, C++, and Java directly in the browser.
-   🎯 **Interactive Quizzes**: Test your knowledge with AI-generated questions based on lesson content.
-   📊 **Gamified Dashboard**: Track your progress, earn XP, and level up as you learn.

## 🛠️ Tech Stack

### Frontend
-   **Core**: React 18, Vite
-   **Styling**: Tailwind CSS, Radix UI (Shadcn/UI components)
-   **Icons**: Lucide React
-   **Editor**: Monaco Editor (@monaco-editor/react)
-   **State Management**: Zustand
-   **Charts**: Recharts

### Backend
-   **Runtime**: Node.js, Express
-   **AI Engine**: Google Generative AI (Gemini Pro)
-   **Data Extraction**: YouTube Transcript API
-   **Database**: Supabase
-   **Environment**: Dotenv

## 📂 Project Structure

```text
Learnful/
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── components/  # UI and Feature components
│   │   ├── store/       # Zustand store
│   │   └── lib/         # API and Utility configurations
│   └── public/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── routes/      # Express routes
│   │   ├── services/    # AI and Business logic
│   │   └── config/      # Database and AI config
├── Doc/                  # Project documentation (Git ignored)
└── TODO.md               # Project roadmap (Git ignored)
```

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn
-   Supabase Project
-   Google Gemini API Key

### Local Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/Learnful.git
    cd Learnful
    ```

2.  **Setup Backend**:
    ```bash
    cd backend
    npm install
    # Copy .env.example to .env and fill in your keys
    npm run dev
    ```

3.  **Setup Frontend**:
    ```bash
    cd ../frontend
    npm install
    # Copy .env.example to .env and fill in your keys
    npm run dev
    ```

## 🌐 Deployment

### Backend (Render)
-   **Root Directory**: `backend`
-   **Build Command**: `npm install`
-   **Start Command**: `npm start`

### Frontend (Netlify)
-   **Base Directory**: `frontend`
-   **Build Command**: `npm run build`
-   **Publish Directory**: `frontend/build`
-   **Env Variable**: `VITE_API_URL` (Point to your Render backend URL)

## 📄 License

This project is licensed under the ISC License.

---
Built with ❤️ by the Learnful Team.
