# Learnful Frontend 🎨

The user interface for **Learnful**, built with React, Vite, and Tailwind CSS. It provides a premium, interactive learning experience with AI integration at its core.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm or yarn

### Installation
1.  Navigate to this folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    Create a `.env` file based on `.env.example`:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    VITE_API_URL=https://your-backend-on-render.com
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

### Building for Production
```bash
npm run build
```
The output will be in the `/build` directory (configured via `vite.config.ts`).

## 🛠️ Key Libraries
-   **Radix UI**: Accessible UI primitives.
-   **Zustand**: Lightweight state management.
-   **Monaco Editor**: High-performance code editor.
-   **Recharts**: Interactive data visualizations.