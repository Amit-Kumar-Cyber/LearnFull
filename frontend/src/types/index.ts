export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  url: string;
  category: string;
  duration: number; // in minutes
  thumbnail: string;
  description: string;
  isCoding: boolean;
  idScore?: number;
  knowledgePoints?: number;
}

export interface Note {
  id: string;
  videoId: string;
  content: string; // Markdown formatted
}

export interface CheatSheet {
  id: string;
  videoId: string;
  items: CheatSheetItem[];
}

export interface CheatSheetItem {
  term: string;
  definition: string;
  example?: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
}

export type MindMap = MindMapNode;

export interface Quiz {
  id: string;
  videoId: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'mcq' | 'boolean';
}

export interface UserProgress {
  videoId: string;
  completed: boolean;
  watchProgress: number; // 0-100
  quizScore?: number;
  lastWatched?: Date;
  notesCompleted?: boolean;
  mindMapCompleted?: boolean;
  cheatSheetCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  category: string;
  thumbnail: string;
}
export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}
