import { useState } from 'react';
import { Course, Video, UserProgress } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Footer } from './Footer';
import {
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  Link as LinkIcon,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface DashboardProps {
  courses: Course[];
  userProgress: UserProgress[];
  onSelectVideo: (video: Video) => void;
  onAddLink: (url: string) => void;
}

export function Dashboard({
  courses,
  userProgress,
  onSelectVideo,
  onAddLink,
}: DashboardProps) {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isProcessingLink, setIsProcessingLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePasteLink = async () => {
    if (!youtubeLink.trim()) return;

    setIsProcessingLink(true);

    // Simulate AI processing (in production, this would call backend API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onAddLink(youtubeLink);
    setYoutubeLink('');
    setIsProcessingLink(false);
  };

  // Get last watched video
  const lastWatched = userProgress
    .filter((p) => p.lastWatched)
    .sort((a, b) => {
      const dateA = p.lastWatched ? new Date(p.lastWatched).getTime() : 0;
      const dateB = p.lastWatched ? new Date(p.lastWatched).getTime() : 0;
      return dateB - dateA;
    })[0];

  const lastWatchedVideo = lastWatched
    ? courses.flatMap((c) => c.videos).find((v) => v.id === lastWatched.videoId)
    : null;

  // Calculate overall stats
  const totalVideos = courses.flatMap((c) => c.videos).length;
  const completedVideos = userProgress.filter((p) => p.completed).length;
  const totalWatchTime = courses
    .flatMap((c) => c.videos)
    .reduce((sum, v) => sum + v.duration, 0);
  const avgQuizScore =
    userProgress.filter((p) => p.quizScore).length > 0
      ? Math.round(
          userProgress.reduce((sum, p) => sum + (p.quizScore || 0), 0) /
            userProgress.filter((p) => p.quizScore).length
        )
      : 0;

  // Filter courses based on search
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0F1E]">
      {/* Header */}
      <div className="glass-card border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Learnful
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="outline"
                className="border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-500 transition-all hidden sm:flex text-sm"
              >
                My Library
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:flex">Settings</Button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                U
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Magic Paste Section */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-purple-500/30 glow-purple">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Learn from Any YouTube Video</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                Paste any YouTube link below and our AI will instantly generate notes, quizzes,
                mind maps, and cheat sheets.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="flex-1 text-sm sm:text-base"
                  disabled={isProcessingLink}
                />
                <Button onClick={handlePasteLink} disabled={isProcessingLink || !youtubeLink} className="w-full sm:w-auto">
                  {isProcessingLink ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Generate Content</span>
                      <span className="sm:hidden">Generate</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="glass-card glass-card-hover rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{completedVideos}</div>
                <div className="text-xs sm:text-sm text-gray-400">Videos Completed</div>
              </div>
            </div>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{totalWatchTime}m</div>
                <div className="text-xs sm:text-sm text-gray-400">Total Content</div>
              </div>
            </div>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{avgQuizScore}%</div>
                <div className="text-xs sm:text-sm text-gray-400">Avg Quiz Score</div>
              </div>
            </div>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {Math.round((completedVideos / totalVideos) * 100)}%
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Continue Learning */}
        {lastWatchedVideo && lastWatched && lastWatched.watchProgress < 100 && (
          <>
            <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/10">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Continue Learning</h2>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <img
                  src={lastWatchedVideo.thumbnail}
                  alt={lastWatchedVideo.title}
                  className="w-full sm:w-48 h-auto sm:h-27 object-cover rounded-2xl"
                />
                <div className="flex-1 w-full">
                  <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs sm:text-sm">{lastWatchedVideo.category}</Badge>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">{lastWatchedVideo.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3">
                    {lastWatchedVideo.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-medium text-white">{lastWatched.watchProgress}%</span>
                      </div>
                      <Progress value={lastWatched.watchProgress} className="h-2" />
                    </div>
                    <Button 
                      onClick={() => onSelectVideo(lastWatchedVideo)}
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 w-full sm:w-auto"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Divider */}
            <div className="section-divider"></div>
          </>
        )}

        {/* Course Library */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Course Library</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-grid">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
              <TabsTrigger value="programming" className="text-xs sm:text-sm">Programming</TabsTrigger>
              <TabsTrigger value="design" className="text-xs sm:text-sm">Design</TabsTrigger>
              <TabsTrigger value="web" className="text-xs sm:text-sm">Web Dev</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 sm:mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCourses.map((course) => {
                  const courseProgress = userProgress.find(
                    (p) => p.videoId === course.videos[0]?.id
                  );

                  return (
                    <div
                      key={course.id}
                      className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => course.videos[0] && onSelectVideo(course.videos[0])}
                    >
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-40 object-cover"
                        />
                        {courseProgress?.completed && (
                          <div className="absolute top-2 right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <Badge className="absolute bottom-2 left-2 bg-purple-500/80 text-white border-0">{course.category}</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 text-white">{course.title}</h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {course.videos.length} video{course.videos.length !== 1 ? 's' : ''}
                          </span>
                          {courseProgress && (
                            <span className="font-medium text-cyan-400">
                              {courseProgress.watchProgress}% complete
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="programming" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses
                  .filter((c) => c.category === 'Programming')
                  .map((course) => (
                    <div
                      key={course.id}
                      className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => course.videos[0] && onSelectVideo(course.videos[0])}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <Badge className="mb-2 bg-purple-500/80 text-white border-0">{course.category}</Badge>
                        <h3 className="font-semibold mb-2 text-white">{course.title}</h3>
                        <p className="text-sm text-gray-400">{course.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses
                  .filter((c) => c.category === 'Design')
                  .map((course) => (
                    <div
                      key={course.id}
                      className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => course.videos[0] && onSelectVideo(course.videos[0])}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <Badge className="mb-2 bg-purple-500/80 text-white border-0">{course.category}</Badge>
                        <h3 className="font-semibold mb-2 text-white">{course.title}</h3>
                        <p className="text-sm text-gray-400">{course.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="web" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses
                  .filter((c) => c.category === 'Web Development')
                  .map((course) => (
                    <div
                      key={course.id}
                      className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => course.videos[0] && onSelectVideo(course.videos[0])}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <Badge className="mb-2 bg-purple-500/80 text-white border-0">{course.category}</Badge>
                        <h3 className="font-semibold mb-2 text-white">{course.title}</h3>
                        <p className="text-sm text-gray-400">{course.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}