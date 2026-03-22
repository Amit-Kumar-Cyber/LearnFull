import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  ClipboardList,
  Calendar,
  Clock,
  Play,
  CheckCircle2,
  Trophy,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export function TestsView() {
  const [filter, setFilter] = useState('all');

  const tests = [
    {
      id: 1,
      title: 'C++ Midterm Examination',
      course: 'C++ Programming',
      type: 'Exam',
      date: '2024-07-28',
      time: '10:00 AM',
      duration: '120 min',
      totalQuestions: 50,
      totalMarks: 100,
      status: 'upcoming',
      difficulty: 'hard',
    },
    {
      id: 2,
      title: 'React Hooks & State Management Quiz',
      course: 'Advanced React & TypeScript',
      type: 'Quiz',
      date: '2024-07-20',
      time: '3:00 PM',
      duration: '30 min',
      totalQuestions: 20,
      totalMarks: 40,
      status: 'available',
      difficulty: 'medium',
    },
    {
      id: 3,
      title: 'Python Data Structures Test',
      course: 'Python for Beginners',
      type: 'Test',
      date: '2024-07-15',
      time: '2:00 PM',
      duration: '60 min',
      totalQuestions: 30,
      totalMarks: 75,
      status: 'completed',
      score: 68,
      difficulty: 'medium',
      completedDate: '2024-07-15',
    },
    {
      id: 4,
      title: 'UI Design Principles Assessment',
      course: 'UI/UX Design Masterclass',
      type: 'Quiz',
      date: '2024-07-10',
      time: '11:00 AM',
      duration: '45 min',
      totalQuestions: 25,
      totalMarks: 50,
      status: 'completed',
      score: 47,
      difficulty: 'easy',
      completedDate: '2024-07-10',
    },
    {
      id: 5,
      title: 'Machine Learning Algorithms Quiz',
      course: 'Machine Learning A-Z',
      type: 'Quiz',
      date: '2024-07-25',
      time: '4:00 PM',
      duration: '40 min',
      totalQuestions: 30,
      totalMarks: 60,
      status: 'available',
      difficulty: 'hard',
    },
    {
      id: 6,
      title: 'Digital Marketing Final Exam',
      course: 'Digital Marketing Strategy',
      type: 'Exam',
      date: '2024-07-05',
      time: '9:00 AM',
      duration: '90 min',
      totalQuestions: 40,
      totalMarks: 100,
      status: 'completed',
      score: 92,
      difficulty: 'medium',
      completedDate: '2024-07-05',
    },
  ];

  const filteredTests = filter === 'all' ? tests : tests.filter((t) => t.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-[#5B5FFF]/20 text-[#5B5FFF] border-[#5B5FFF]/30';
      case 'upcoming':
        return 'bg-[#FFB547]/20 text-[#FFB547] border-[#FFB547]/30';
      case 'completed':
        return 'bg-[#4ECB71]/20 text-[#4ECB71] border-[#4ECB71]/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-[#4ECB71]';
      case 'medium':
        return 'text-[#FFB547]';
      case 'hard':
        return 'text-[#FF6B6B]';
      default:
        return 'text-gray-400';
    }
  };

  const stats = {
    available: tests.filter((t) => t.status === 'available').length,
    upcoming: tests.filter((t) => t.status === 'upcoming').length,
    completed: tests.filter((t) => t.status === 'completed').length,
    avgScore:
      Math.round(
        tests.filter((t) => t.score).reduce((sum, t) => sum + (t.score! / t.totalMarks) * 100, 0) /
          tests.filter((t) => t.score).length
      ) || 0,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tests & Quizzes</h1>
        <p className="text-gray-400">Track your assessments and test your knowledge</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Play className="w-8 h-8 text-[#5B5FFF]" />
            <span className="text-3xl font-bold text-white">{stats.available}</span>
          </div>
          <div className="text-sm text-gray-400">Available Now</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-[#FFB547]" />
            <span className="text-3xl font-bold text-white">{stats.upcoming}</span>
          </div>
          <div className="text-sm text-gray-400">Upcoming</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-[#4ECB71]" />
            <span className="text-3xl font-bold text-white">{stats.completed}</span>
          </div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-3xl font-bold text-white">{stats.avgScore}%</span>
          </div>
          <div className="text-sm text-gray-400">Average Score</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'all'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          All Tests
        </button>
        <button
          onClick={() => setFilter('available')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'available'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'upcoming'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'completed'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-[#1A1A2E] rounded-2xl p-6 border border-white/10 hover:border-[#5B5FFF]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-white/10 text-white border-0 text-xs">{test.type}</Badge>
                  <Badge className={getStatusColor(test.status)}>
                    {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{test.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{test.course}</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white font-medium">
                  {test.date} at {test.time}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-white font-medium">{test.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Questions</span>
                <span className="text-white font-medium">{test.totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total Marks</span>
                <span className="text-white font-medium">{test.totalMarks}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Difficulty</span>
                <span className={`font-medium ${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                </span>
              </div>
            </div>

            {test.status === 'completed' && test.score !== undefined && (
              <div className="mb-5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Your Score</span>
                  <span className="text-white font-semibold">
                    {test.score}/{test.totalMarks} ({Math.round((test.score / test.totalMarks) * 100)}%)
                  </span>
                </div>
                <Progress value={(test.score / test.totalMarks) * 100} className="h-3" />
              </div>
            )}

            <div className="flex gap-2">
              {test.status === 'available' && (
                <Button className="flex-1 bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Start Test
                </Button>
              )}
              {test.status === 'upcoming' && (
                <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white" disabled>
                  <Clock className="w-4 h-4 mr-2" />
                  Scheduled
                </Button>
              )}
              {test.status === 'completed' && (
                <>
                  <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white">
                    View Results
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Retake
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="bg-[#1A1A2E] rounded-2xl p-12 border border-white/10 text-center">
          <ClipboardList className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No tests found</h3>
          <p className="text-gray-400">
            {filter === 'all' ? 'You have no tests at the moment' : `No ${filter} tests to display`}
          </p>
        </div>
      )}
    </div>
  );
}
