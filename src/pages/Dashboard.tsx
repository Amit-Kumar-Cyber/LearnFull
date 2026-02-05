import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Clock, Award, TrendingUp, Search, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';

interface DashboardStats {
  hoursLearned: number;
  quizzesPassed: number;
  currentStreak: number;
  completionRate: number;
}

interface CourseCard {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string | null;
  progress: number;
  total_videos: number;
  completed_videos: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    hoursLearned: 0,
    quizzesPassed: 0,
    currentStreak: 0,
    completionRate: 0,
  });
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get('/learning/dashboard');
      setStats(data.stats);

      const formattedCourses: CourseCard[] = data.courses.map((course: any) => {
        const progress = course.total_videos > 0 ? Math.round((course.completed_videos / course.total_videos) * 100) : 0;
        return {
          id: course._id, // Mongo uses _id
          title: course.title,
          category: course.category,
          thumbnail_url: course.thumbnail_url,
          progress,
          total_videos: course.total_videos,
          completed_videos: course.completed_videos,
        };
      });

      setCourses(formattedCourses);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasteLink = () => {
    if (youtubeLink.trim()) {
      navigate(`/learn?url=${encodeURIComponent(youtubeLink)}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Learnful</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {profile?.full_name || 'User'}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-gray-600 hover:text-gray-900 transition"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Learner'}!
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-md p-3">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Paste any YouTube link to start learning..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasteLink()}
              className="flex-1 px-4 py-2 outline-none text-gray-700"
            />
            <button
              onClick={handlePasteLink}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Video</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.hoursLearned}h</div>
            <div className="text-sm text-gray-600">Hours Learned</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.quizzesPassed}</div>
            <div className="text-sm text-gray-600">Quizzes Passed</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white rounded-xl">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No courses available yet</p>
              <p className="text-sm text-gray-500">
                Paste a YouTube link above to start learning!
              </p>
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium text-blue-600 mb-2">{course.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{course.total_videos} videos</span>
                    <span>{course.completed_videos} completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
