import { useState, useRef, useEffect } from 'react';
import { UserProgress, Video, Note, CheatSheet, MindMapNode, Quiz, ChatMessage } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { QuizModule } from './QuizModule';
import { CodeCompiler } from './CodeCompiler';
import { MindMapVisualization } from './MindMapVisualization';
import { useStore } from '../store/useStore';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Network,
  Code,
  GraduationCap,
  CheckCircle2,
  Play,
  Brain,
  Maximize2,
  Minimize2,
  MessageSquare,
  Send,
  Loader2,
  User,
  Sparkles,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

interface VideoLearningViewProps {
  video: Video;
  userProgress?: UserProgress;
  note: Note;
  cheatSheet: CheatSheet;
  mindMap: MindMapNode;
  quiz: Quiz;
  onBack: () => void;
  onQuizComplete: (score: number) => void;
  onArtifactComplete: (type: 'notes' | 'mindMap' | 'cheatSheet') => void;
}

export function VideoLearningView({
  video,
  userProgress,
  note,
  cheatSheet,
  mindMap,
  quiz,
  onBack,
  onQuizComplete,
  onArtifactComplete,
}: VideoLearningViewProps) {
  const playerRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    progress, 
    setProgress, 
    setDuration,
    focusMode,
    setFocusMode,
    activeTab,
    setActiveTab
  } = useStore();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ai',
      content: `Hi! I'm your AI Learning Assistant. I've analyzed this video on "${video.title}". Feel free to ask me anything about the concepts discussed!`,
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: video.url,
          message: chatInput,
          history: chatMessages
            .filter(m => m.id !== 'welcome') // Skip the welcome message
            .slice(-6)
            .map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('AI is currently busy due to rate limits. Please try again in a minute.');
        }
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'ai',
        content: data.response,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to communicate with AI assistant');
    } finally {
      setIsChatLoading(false);
    }
  };

  const watchProgress = userProgress?.watchProgress || 0;
  const notesProgress = userProgress?.notesCompleted ? 1 : 0;
  const mindMapProgress = userProgress?.mindMapCompleted ? 1 : 0;
  const cheatSheetProgress = userProgress?.cheatSheetCompleted ? 1 : 0;
  const quizProgress = userProgress?.quizScore ? 1 : 0;

  const displayProgress = Math.round(
    (watchProgress * 0.5) + 
    (notesProgress * 10) + 
    (mindMapProgress * 10) + 
    (cheatSheetProgress * 10) +
    (quizProgress * 20)
  );

  return (
    <div className={`h-screen flex flex-col bg-[#0F0F1E] ${focusMode ? 'focus-mode' : ''}`}>
      {/* Header */}
      {!focusMode && (
        <div className="glass-card border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-[1800px] mx-auto">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-white/10 flex-shrink-0 text-white"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl font-semibold text-white truncate">
                  {video.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                  {video.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="text-right hidden lg:block">
                <div className="text-sm text-gray-400">Your Progress</div>
                <div className="flex items-center gap-2">
                  <Progress value={displayProgress} className="w-32 h-2" />
                  <span className="text-sm font-medium text-white">
                    {displayProgress}%
                  </span>
                </div>
              </div>
              {video.idScore && (
                <div className="hidden xl:flex items-center gap-4 border-l border-white/10 pl-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Info Density</div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${
                        video.idScore < 4 ? 'bg-cyan-400' : 
                        video.idScore < 7 ? 'bg-yellow-400' : 'bg-rose-500'
                      }`} />
                      <span className="text-sm font-bold text-white">{video.idScore.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Concepts</div>
                    <div className="text-sm font-bold text-white">{video.knowledgePoints || 0}</div>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFocusMode(true)}
                className="border-white/10 hover:bg-white/5 text-white"
              >
                <Maximize2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Focus Mode</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative">
        {/* Video Section */}
        <div className={`w-full ${focusMode ? 'lg:w-full' : 'lg:w-1/2 xl:w-3/5'} bg-black flex items-center justify-center p-0 lg:p-6 transition-all duration-300`}>
          <div className="w-full max-w-5xl aspect-video bg-gray-900 rounded-none lg:rounded-2xl overflow-hidden relative shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=0&rel=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            {focusMode && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFocusMode(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 z-50"
              >
                <Minimize2 className="w-6 h-6" />
              </Button>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        {!focusMode && (
          <div className="w-full lg:w-1/2 xl:w-2/5 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col bg-[#1A1A1A] transition-all duration-300 h-[calc(100vh-64px)] overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 min-h-0 flex flex-col overflow-hidden h-full">
              <TabsList className="w-full justify-start border-b border-white/10 rounded-none bg-transparent p-0 h-auto overflow-x-auto">
                <TabsTrigger
                  value="notes"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B5FFF] data-[state=active]:bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-400 data-[state=active]:text-white"
                >
                  <FileText className="w-4 h-4 mr-1 sm:mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-400 data-[state=active]:bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-400 data-[state=active]:text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-1 sm:mr-2" />
                  Ask AI
                </TabsTrigger>
                <TabsTrigger
                  value="cheatsheet"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ECB71] data-[state=active]:bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-400 data-[state=active]:text-white"
                >
                  <BookOpen className="w-4 h-4 mr-1 sm:mr-2" />
                  Cheat Sheet
                </TabsTrigger>
                <TabsTrigger
                  value="mindmap"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FFB547] data-[state=active]:bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-400 data-[state=active]:text-white"
                >
                  <Brain className="w-4 h-4 mr-1 sm:mr-2" />
                  Mind Map
                </TabsTrigger>
                {video.category === 'Programming' && (
                  <TabsTrigger
                    value="code"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B6B] data-[state=active]:bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-400 data-[state=active]:text-white"
                  >
                    <Code className="w-4 h-4 mr-1 sm:mr-2" />
                    Code
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Notes Tab */}
              <TabsContent value="notes" className="flex-1 min-h-0 overflow-hidden p-0 m-0 flex flex-col">
                <div className="flex-1 overflow-auto p-4 sm:p-6">
                  <div className="prose prose-sm sm:prose-base prose-invert max-w-none">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                </div>
                <div className="p-4 sm:p-6 border-t border-white/10 flex justify-end bg-[#1A1A1A]">
                  <Button
                    onClick={() => onArtifactComplete('notes')}
                    disabled={userProgress?.notesCompleted}
                    className={`${userProgress?.notesCompleted ? 'bg-green-500/20 text-green-400' : 'bg-[#5B5FFF] hover:bg-[#4A4EDD] text-white'}`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {userProgress?.notesCompleted ? 'Notes Reviewed' : 'Mark as Reviewed (+50 XP)'}
                  </Button>
                </div>
              </TabsContent>

              {/* Chat Tab */}
              <TabsContent value="chat" className="flex-1 min-h-0 overflow-hidden p-0 m-0 flex flex-col bg-[#111111]">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 sm:p-4 ${
                        msg.role === 'user' 
                        ? 'bg-[#5B5FFF] text-white rounded-tr-none' 
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase tracking-wider font-bold">
                          {msg.role === 'user' ? <User className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                          {msg.role === 'user' ? 'You' : 'Learnful AI'}
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                        <span className="text-sm text-gray-400 italic">Analyzing video context...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                
                <div className="p-4 border-t border-white/10 bg-[#1A1A1A]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask a question about the video..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#5B5FFF] transition-colors"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isChatLoading || !chatInput.trim()}
                      className="bg-[#5B5FFF] hover:bg-[#4A4EDD] text-white rounded-xl aspect-square p-0 w-10 h-10 flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Cheat Sheet Tab */}
              <TabsContent value="cheatsheet" className="flex-1 min-h-0 overflow-hidden p-0 m-0 flex flex-col">
                <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Quick Reference</h2>
                  {cheatSheet.items.map((item, index) => (
                    <Card key={index} className="p-3 sm:p-4 bg-gray-800 border-gray-700">
                      <div className="font-mono text-xs sm:text-sm text-blue-400 font-semibold mb-1">
                        {item.term}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 mb-2">{item.definition}</div>
                      {item.example && (
                        <div className="bg-gray-900 p-2 rounded text-xs font-mono text-gray-300 border border-gray-700 overflow-x-auto">
                          {item.example}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
                <div className="p-4 sm:p-6 border-t border-white/10 flex justify-end bg-[#1A1A1A]">
                  <Button
                    onClick={() => onArtifactComplete('cheatSheet')}
                    disabled={userProgress?.cheatSheetCompleted}
                    className={`${userProgress?.cheatSheetCompleted ? 'bg-green-500/20 text-green-400' : 'bg-[#4ECB71] hover:bg-[#3DA85C] text-white'}`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {userProgress?.cheatSheetCompleted ? 'Cheat Sheet Reviewed' : 'Mark as Reviewed (+50 XP)'}
                  </Button>
                </div>
              </TabsContent>

              {/* Mind Map Tab */}
              <TabsContent value="mindmap" className="flex-1 min-h-0 overflow-hidden p-0 m-0 flex flex-col">
                <div className="flex-1 overflow-auto p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Concept Map</h2>
                  <MindMapVisualization data={mindMap} />
                </div>
                <div className="p-4 sm:p-6 border-t border-white/10 flex justify-end bg-[#1A1A1A]">
                  <Button
                    onClick={() => onArtifactComplete('mindMap')}
                    disabled={userProgress?.mindMapCompleted}
                    className={`${userProgress?.mindMapCompleted ? 'bg-green-500/20 text-green-400' : 'bg-[#FFB547] hover:bg-[#E69D3D] text-white'}`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {userProgress?.mindMapCompleted ? 'Mind Map Explored' : 'Mark as Completed (+50 XP)'}
                  </Button>
                </div>
              </TabsContent>

              {/* Compiler Tab */}
              {video.category === 'Programming' && (
                <TabsContent value="code" className="flex-1 overflow-hidden m-0">
                  <CodeCompiler />
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </div>

      {/* Bottom Section - Quiz Module */}
      {!focusMode && (
        <div className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-[1800px] mx-auto">
            <details className="group">
              <summary className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5B5FFF]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B5FFF]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-white">Test Your Knowledge</h3>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {quiz.questions.length} questions • Take the quiz to verify your understanding
                    </p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-400 group-open:hidden flex-shrink-0 hidden sm:block">Click to expand</div>
                <div className="text-xs sm:text-sm text-gray-400 hidden group-open:block flex-shrink-0 sm:block">Click to collapse</div>
              </summary>
              <div className="border-t border-gray-800 p-4 sm:p-6 bg-gray-950">
                <QuizModule quiz={quiz} onComplete={onQuizComplete} />
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}