import { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  ArrowLeft,
  Play,
  MessageCircle,
  FileText,
  Code,
  CheckCircle,
  Brain,
  Send,
  Copy,
  Check,
  Maximize2,
} from 'lucide-react';

interface WatchPageProps {
  videoId?: string;
  videoTitle?: string;
  onBack?: () => void;
}

export function WatchPage({ 
  videoId = 'dQw4w9WgXcQ', 
  videoTitle = 'Introduction to React Hooks',
  onBack 
}: WatchPageProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [code, setCode] = useState('// Write your code here\nfunction example() {\n  console.log("Hello, World!");\n}');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [testExpanded, setTestExpanded] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  // Mock chat messages
  const [messages, setMessages] = useState([
    { id: 1, user: 'AI Assistant', text: 'Welcome! Ask me anything about this video.', isAI: true },
    { id: 2, user: 'You', text: 'Can you explain useState?', isAI: false },
    { id: 3, user: 'AI Assistant', text: 'useState is a Hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.', isAI: true },
  ]);

  // Mock quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: 'What does the useState Hook return?',
      options: [
        'A single value',
        'An array with state and setter function',
        'An object with state properties',
        'A function to update state'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Which Hook is used for side effects?',
      options: [
        'useState',
        'useContext',
        'useEffect',
        'useReducer'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'Can you call Hooks inside loops or conditions?',
      options: [
        'Yes, always',
        'No, never',
        'Only in useEffect',
        'Only with useState'
      ],
      correctAnswer: 1
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      text: chatMessage,
      isAI: false
    };
    
    setMessages([...messages, newMessage]);
    setChatMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        user: 'AI Assistant',
        text: 'That\'s a great question! Let me help you with that...',
        isAI: true
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleRunCode = () => {
    try {
      // Simple code execution simulation
      setOutput('Code executed successfully!\n> Hello, World!');
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quizQuestions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0F0F1E]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1A1A2E]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" onClick={onBack} className="hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">{videoTitle}</h1>
                <p className="text-sm text-gray-400">Learning Mode • AI-Powered</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] hover:to-[#6B51EF] hidden sm:flex">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Section: Video + Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Video Player */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video bg-black relative">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Video Info */}
            <div className="glass-card rounded-xl p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">About this lesson</h3>
                  <p className="text-sm text-gray-400">
                    Learn the fundamentals of React Hooks and how to use them effectively in your applications.
                    This comprehensive guide covers useState, useEffect, and custom hooks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tabbed Content */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="w-full bg-[#1A1A2E] border-b border-white/10 rounded-none p-0">
                <TabsTrigger 
                  value="chat" 
                  className="flex-1 data-[state=active]:bg-[#5B5FFF]/10 data-[state=active]:text-[#5B5FFF] rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B5FFF]"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger 
                  value="cheatsheet"
                  className="flex-1 data-[state=active]:bg-[#5B5FFF]/10 data-[state=active]:text-[#5B5FFF] rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B5FFF]"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Cheat Sheet
                </TabsTrigger>
                <TabsTrigger 
                  value="compiler"
                  className="flex-1 data-[state=active]:bg-[#5B5FFF]/10 data-[state=active]:text-[#5B5FFF] rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B5FFF]"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Compiler
                </TabsTrigger>
              </TabsList>

              {/* Chat Tab */}
              <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0 h-[500px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] rounded-xl p-3 ${
                        msg.isAI 
                          ? 'bg-white/5 border border-white/10' 
                          : 'bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF]'
                      }`}>
                        <p className="text-xs text-gray-400 mb-1">{msg.user}</p>
                        <p className="text-sm text-white">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask a question..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Cheat Sheet Tab */}
              <TabsContent value="cheatsheet" className="flex-1 m-0 p-6 overflow-y-auto h-[500px]">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">React Hooks Quick Reference</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-[#5B5FFF] font-semibold mb-2">useState</h4>
                      <code className="text-sm text-gray-300 block bg-black/30 p-2 rounded">
                        const [state, setState] = useState(initialValue);
                      </code>
                      <p className="text-xs text-gray-400 mt-2">
                        Adds state to functional components
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-[#4ECB71] font-semibold mb-2">useEffect</h4>
                      <code className="text-sm text-gray-300 block bg-black/30 p-2 rounded">
                        useEffect(() =&gt; {'{'} /* effect */ {'}'}, [deps]);
                      </code>
                      <p className="text-xs text-gray-400 mt-2">
                        Performs side effects in components
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-[#FFB547] font-semibold mb-2">useContext</h4>
                      <code className="text-sm text-gray-300 block bg-black/30 p-2 rounded">
                        const value = useContext(MyContext);
                      </code>
                      <p className="text-xs text-gray-400 mt-2">
                        Accesses context values
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-[#FF6B6B] font-semibold mb-2">useReducer</h4>
                      <code className="text-sm text-gray-300 block bg-black/30 p-2 rounded">
                        const [state, dispatch] = useReducer(reducer, init);
                      </code>
                      <p className="text-xs text-gray-400 mt-2">
                        Alternative to useState for complex state
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Compiler Tab */}
              <TabsContent value="compiler" className="flex-1 m-0 p-0 h-[500px] flex flex-col">
                <div className="flex-1 flex flex-col">
                  {/* Code Editor */}
                  <div className="flex-1 border-b border-white/10">
                    <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/10">
                      <span className="text-sm text-gray-400">code.js</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCopyCode}
                          className="h-8"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-[#4ECB71]" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleRunCode}
                          className="bg-[#4ECB71] hover:bg-[#3DB861] h-8"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Run
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-[calc(100%-44px)] bg-black/50 border-0 text-white font-mono text-sm resize-none rounded-none"
                      style={{ minHeight: '200px' }}
                    />
                  </div>

                  {/* Output */}
                  <div className="h-32 bg-black/50 p-4 overflow-y-auto">
                    <div className="text-xs text-gray-400 mb-2">Output:</div>
                    <pre className="text-sm text-white font-mono">{output || 'Click "Run" to execute code'}</pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Take Test Section */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setTestExpanded(!testExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFB547] to-[#FF6B6B] rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-white">Take Test</h2>
                <p className="text-sm text-gray-400">
                  {quizQuestions.length} questions • Test your understanding
                </p>
              </div>
            </div>
            <div className={`transform transition-transform ${testExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {testExpanded && (
            <div className="border-t border-white/10 p-6 space-y-6">
              {quizQuestions.map((question, idx) => (
                <div key={question.id} className="space-y-3">
                  <h3 className="text-white font-semibold">
                    {idx + 1}. {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, optionIdx) => (
                      <button
                        key={optionIdx}
                        onClick={() => handleAnswerSelect(question.id, optionIdx)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedAnswers[question.id] === optionIdx
                            ? 'bg-[#5B5FFF]/20 border-[#5B5FFF]'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-white">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                  {Object.keys(selectedAnswers).length} of {quizQuestions.length} answered
                </div>
                <Button
                  onClick={() => alert(`Your score: ${calculateScore()}%`)}
                  disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                  className="bg-gradient-to-r from-[#4ECB71] to-[#3DB861] hover:from-[#3DB861] hover:to-[#2DA851]"
                >
                  Submit Test
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mind Map Section */}
        <div className="glass-card rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7B61FF] to-[#5B5FFF] rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Mind Map</h2>
              <p className="text-sm text-gray-400">Visual learning structure</p>
            </div>
          </div>

          {/* Mind Map Visualization */}
          <div className="bg-black/30 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Center Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-white font-bold text-center">React Hooks</h3>
                </div>
              </div>

              {/* Top Node */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white text-sm font-semibold">useState</p>
                  <p className="text-xs text-gray-400">State Management</p>
                </div>
              </div>

              {/* Right Node */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white text-sm font-semibold">useEffect</p>
                  <p className="text-xs text-gray-400">Side Effects</p>
                </div>
              </div>

              {/* Bottom Node */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white text-sm font-semibold">useContext</p>
                  <p className="text-xs text-gray-400">Context API</p>
                </div>
              </div>

              {/* Left Node */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white text-sm font-semibold">Custom Hooks</p>
                  <p className="text-xs text-gray-400">Reusability</p>
                </div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(91, 95, 255, 0.3)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(91, 95, 255, 0.3)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(91, 95, 255, 0.3)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(91, 95, 255, 0.3)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <Maximize2 className="w-4 h-4 mr-2" />
              Expand Mind Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
