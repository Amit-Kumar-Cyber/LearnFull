import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Sparkles,
  Search,
  BookOpen,
  FileText,
  ClipboardList,
  Trophy,
  Package,
  Settings,
  LogOut,
  Link as LinkIcon,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Flame,
} from 'lucide-react';
import { Course, UserProgress, Video } from '../types';
import { CoursesView } from './dashboard-views/CoursesView';
import { useStore } from '../store/useStore';
import { AssignmentsView } from './dashboard-views/AssignmentsView';
import { TestsView } from './dashboard-views/TestsView';
import { LeaderboardView } from './dashboard-views/LeaderboardView';
import { ResourcesView } from './dashboard-views/ResourcesView';
import { SettingsView } from './dashboard-views/SettingsView';
import { API_ROUTES } from '../lib/api';

interface DashboardNewProps {
  courses: Course[];
  userProgress: UserProgress[];
  onSelectVideo: (video: Video) => void;
  onAddLink: (data: any) => void;
}

export function DashboardNew({
  courses,
  userProgress,
  onSelectVideo,
  onAddLink,
}: DashboardNewProps) {
  const { xp, level } = useStore();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isProcessingLink, setIsProcessingLink] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePasteLink = async () => {
    if (!youtubeLink.trim()) return;

    setIsProcessingLink(true);
    try {
      const response = await fetch(API_ROUTES.ANALYZE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: youtubeLink
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze video');
      }

      // Ensure the URL is a full YouTube URL if only ID was pasted
      let fullUrl = youtubeLink;
      if (!youtubeLink.startsWith('http')) {
        fullUrl = `https://www.youtube.com/watch?v=${youtubeLink}`;
      }

      const data = await response.json();
      
      // Construct a new video object from the backend response
      const category = data.metadata?.recommended_taxonomy || 'Newly Added';
      const newVideo: Video = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || data.mindMap?.label || 'New Course',
        youtubeId: data.videoId,
        url: data.url || fullUrl,
        category: category,
        duration: 0,
        thumbnail: `https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg`,
        description: 'AI-generated course from YouTube video.',
        isCoding: category.toLowerCase().includes('programming') || category.toLowerCase().includes('code'),
      };

      // Pass the whole data object to App.tsx
      onAddLink({ video: newVideo, ...data });
      
      setYoutubeLink('');
    } catch (error) {
      console.error('Error processing link:', error);
      // We could add a toast here if we had access to it, but App.tsx handles onAddLink
    } finally {
      setIsProcessingLink(false);
    }
  };

  // Calculate stats
  const completedVideos = userProgress.filter((p) => p.completed).length;
  const inProgressCourses = courses.filter((c) =>
    c.videos.some((v) => {
      const progress = userProgress.find((p) => p.videoId === v.id);
      return progress && progress.watchProgress > 0 && !progress.completed;
    })
  ).length;

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Mock active days (simulating streak)
  const activeDays = [1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21];

  // New courses data
  const newCourses = [
    {
      id: 1,
      title: 'Python for beginners',
      category: 'Programming',
      rating: 4.5,
      students: '13.5k Students',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 2,
      title: 'C Programming Complete course',
      category: 'Programming',
      rating: 4.7,
      students: '13k Students',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 3,
      title: 'Image Processing using python',
      category: 'Programming',
      rating: 4.2,
      students: '10k Students',
      color: 'from-indigo-600 to-purple-600',
    },
  ];

  // Enrolled courses data
  const enrolledCourses = [
    { name: 'C++', progress: 65, chapters: '14/15 Chapters', deadline: '22/07/2024', status: 'In Progress' },
    {
      name: 'Management for Engineers',
      progress: 45,
      chapters: '20/40 Chapters',
      deadline: '25/07/2024',
      status: 'In Progress',
    },
    {
      name: 'Digital Image Processing',
      progress: 30,
      chapters: '6/20 Chapters',
      deadline: '28/07/2024',
      status: 'In Progress',
    },
    {
      name: 'C Programming',
      progress: 85,
      chapters: '17/20 Chapters',
      deadline: '20/06/2024',
      status: 'Missed Deadline',
    },
    {
      name: 'Using python for Machine Learning',
      progress: 100,
      chapters: '40/40 Chapters',
      deadline: '--/--/----',
      status: 'Completed',
    },
  ];

  // Upcoming tasks
  const upcomingTasks = [
    { time: '6pm', title: 'C++ Assignment 2', type: 'assignment', color: 'bg-[#5B5FFF]' },
    { time: '2pm', title: 'Videographers for Engineers', subtitle: 'Group Course', color: 'bg-white' },
    { time: '4pm', title: 'Project Report', subtitle: 'Data Science', color: 'bg-[#5B5FFF]' },
  ];

  return (
    <div className="flex h-screen bg-[#0F0F1E] overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 bg-[#1A1A2E] border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">LEARNERS</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveNav('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === 'dashboard'
                ? 'bg-[#5B5FFF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveNav('courses')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === 'courses'
                ? 'bg-[#5B5FFF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">Courses</span>
          </button>

          <button
            onClick={() => setActiveNav('assignments')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === 'assignments'
                ? 'bg-[#5B5FFF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm">Assignments</span>
          </button>

          <button
            onClick={() => setActiveNav('tests')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === 'tests'
                ? 'bg-[#5B5FFF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span className="text-sm">Tests</span>
          </button>

          <button
            onClick={() => setActiveNav('leaderboard')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === 'leaderboard'
                ? 'bg-[#5B5FFF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveNav('resources')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === 'resources'
                ? 'bg-[#5B5FFF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-sm">Resources</span>
          </button>

          <button
            onClick={() => setActiveNav('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeNav === 'settings'
                ? 'bg-[#5B5FFF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF5757] transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-[#1A1A2E] border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">Level {level} • {xp} XP</div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <Flame className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">{xp} Pts</span>
              </div>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">V</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {activeNav === 'dashboard' && (
          <div className="p-6">
            <div className="flex gap-6">
              {/* Left Column */}
              <div className="flex-1 space-y-6">
                {/* Top Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8787] rounded-2xl p-4 text-white">
                    <div className="text-3xl font-bold mb-1">05</div>
                    <div className="text-sm opacity-90">Day Streak</div>
                  </div>

                  <div className="bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-2xl p-4 text-white">
                    <div className="text-3xl font-bold mb-1">{inProgressCourses}</div>
                    <div className="text-sm opacity-90">Course in progress</div>
                  </div>

                  <div className="bg-white rounded-2xl p-4">
                    <div className="text-3xl font-bold mb-1 text-gray-900">{completedVideos}</div>
                    <div className="text-sm text-gray-600">Courses Completed</div>
                  </div>
                </div>

                {/* YouTube Link Paste Section */}
                <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#5B5FFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <LinkIcon className="w-5 h-5 text-[#5B5FFF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">Learn from Any YouTube Video</h3>
                      <p className="text-xs text-gray-400 mb-3">
                        Paste any YouTube link and get instant AI-generated study materials
                      </p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://youtube.com/watch?v=..."
                          value={youtubeLink}
                          onChange={(e) => setYoutubeLink(e.target.value)}
                          className="flex-1 bg-white/5 border-white/10 text-white text-sm"
                          disabled={isProcessingLink}
                        />
                        <Button
                          onClick={handlePasteLink}
                          disabled={isProcessingLink || !youtubeLink}
                          className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white"
                        >
                          {isProcessingLink ? 'Processing...' : 'Generate'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Courses */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">New Courses</h2>
                    <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                      View More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {newCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-[#1A1A2E] rounded-2xl overflow-hidden border border-white/10 hover:border-[#5B5FFF]/30 transition-all cursor-pointer group"
                      >
                        <div className={`h-32 bg-gradient-to-br ${course.color} relative flex items-center justify-center`}>
                          <BookOpen className="w-12 h-12 text-white/90" />
                        </div>
                        <div className="p-4">
                          <Badge className="bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30 text-xs mb-2">
                            {course.category}
                          </Badge>
                          <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-[#5B5FFF] transition-colors">
                            {course.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                            <span>{course.students}</span>
                          </div>
                          <Button className="w-full mt-3 bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white text-xs">
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enrolled Courses Table */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Enrolled Courses</h2>
                  <div className="bg-[#1A1A2E] rounded-2xl overflow-hidden border border-white/10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-4 text-sm font-medium text-gray-400">Course Name</th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">Progress</th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">Next Deadline</th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrolledCourses.map((course, index) => (
                          <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="text-sm font-medium text-white">{course.name}</div>
                              <div className="text-xs text-gray-400">{course.chapters}</div>
                            </td>
                            <td className="p-4">
                              <Progress value={course.progress} className="h-2 w-32" />
                            </td>
                            <td className="p-4 text-sm text-gray-300">{course.deadline}</td>
                            <td className="p-4">
                              <Badge
                                className={`text-xs ${
                                  course.status === 'Completed'
                                    ? 'bg-[#4ECB71]/20 text-[#4ECB71] border-[#4ECB71]/30'
                                    : course.status === 'Missed Deadline'
                                    ? 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30'
                                    : 'bg-[#5B5FFF]/20 text-[#5B5FFF] border-[#5B5FFF]/30'
                                }`}
                              >
                                {course.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-80 space-y-6">
                {/* Calendar */}
                <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">{monthName}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-1 hover:bg-white/5 rounded"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-1 hover:bg-white/5 rounded"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-xs font-medium text-gray-400">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const isActive = activeDays.includes(day);
                      return (
                        <div
                          key={day}
                          className={`aspect-square flex items-center justify-center text-xs rounded-lg ${
                            isActive
                              ? 'bg-[#5B5FFF] text-white font-semibold'
                              : 'text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-yellow-500" />
                      <span className="text-white font-semibold">Continue your 5-day streak 🔥</span>
                    </div>
                    <Button className="w-full mt-3 bg-white hover:bg-gray-100 text-gray-900 text-sm">
                      Take a quick test
                    </Button>
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
                  <h3 className="font-semibold text-white mb-4">Upcoming Tasks</h3>
                  <div className="space-y-3">
                    {upcomingTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl ${
                          task.color === 'bg-[#5B5FFF]' ? 'bg-[#5B5FFF] text-white' : 'bg-white text-gray-900'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs opacity-80">{task.time}</span>
                          {task.type === 'assignment' && (
                            <Badge className="bg-white/20 text-white border-0 text-xs">Assignment</Badge>
                          )}
                        </div>
                        <div className="font-semibold text-sm">{task.title}</div>
                        {task.subtitle && <div className="text-xs opacity-80 mt-1">{task.subtitle}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
          {activeNav === 'courses' && <CoursesView />}
          {activeNav === 'assignments' && <AssignmentsView />}
          {activeNav === 'tests' && <TestsView />}
          {activeNav === 'leaderboard' && <LeaderboardView />}
          {activeNav === 'resources' && <ResourcesView />}
          {activeNav === 'settings' && <SettingsView />}
        </div>
      </div>
    </div>
  );
}