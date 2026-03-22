# Learnful Backend 🧠

This is the API server for **Learnful**, responsible for AI analysis, video transcription, and code execution.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm or yarn
-   Google Gemini API Key
-   Supabase Project

### Installation
1.  Navigate to this folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    Create a `.env` file based on `.env.example`:
    ```env
    PORT=5000
    GOOGLE_API_KEY=your_gemini_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    ```
4.  Run the server:
    ```bash
    npm run dev  # Development (Nodemon)
    npm start    # Production
    ```

## 🛠️ API Routes

-   `POST /api/analyze`: Takes a YouTube URL and generates study materials.
-   `POST /api/chat`: Handles the AI learning assistant chat.
-   `POST /api/compiler/compile`: Executes code using Judge0 integration.
-   `GET /`: Health check.
