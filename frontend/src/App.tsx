import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardNew } from './components/DashboardNew';
import { VideoLearningView } from './components/VideoLearningView';
import { WatchPage } from './components/WatchPage';
import { FeaturesPage } from './components/FeaturesPage';
import { PricingPage } from './components/PricingPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactPage } from './components/ContactPage';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';
import { UserProgress, Video } from './types';
import { supabase } from './lib/supabase';
import {
  mockCourses,
  mockVideos,
  mockNotes,
  mockCheatSheets,
  mockMindMaps,
  mockQuizzes,
} from './data/mockData';
import { Toaster, toast } from 'sonner';
import { useStore } from './store/useStore';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  const { user, setUser, loadProfile } = useStore();

  // Initialize Auth and Progress
  useEffect(() => {
    // Supabase Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id);
        if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/') {
          navigate('/dashboard');
        }
      } else {
        setUser(null);
        // Removed redirect to '/' to allow guest browsing of dashboard/videos as requested
      }
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
        if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/') {
          navigate('/dashboard');
        }
      }
    });

    const savedProgress = localStorage.getItem('learnful-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const progressWithDates = parsed.map((p: any) => ({
        ...p,
        lastWatched: p.lastWatched ? new Date(p.lastWatched) : undefined,
      }));
      setUserProgress(progressWithDates);
    } else {
      const initialProgress: UserProgress[] = mockVideos.map((video) => ({
        videoId: video.id,
        completed: false,
        watchProgress: video.id === '1' ? 40 : 0,
        lastWatched: video.id === '1' ? new Date() : undefined,
      }));
      setUserProgress(initialProgress);
    }

    return () => subscription.unsubscribe();
  }, [setUser, loadProfile, navigate, location.pathname]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (userProgress.length > 0) {
      localStorage.setItem('learnful-progress', JSON.stringify(userProgress));
    }
  }, [userProgress]);

  const handleGetStarted = () => {
    navigate('/dashboard');
    toast.success('Welcome to Learnful!', {
      description: 'Start learning by selecting a course or pasting a YouTube link.',
    });
  };

  const handleTryWatchMode = () => {
    navigate('/watch');
  };

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    navigate(`/video/${video.id}`);

    // Update last watched time
    setUserProgress((prev) => {
      const existing = prev.find((p) => p.videoId === video.id);
      if (existing) {
        return prev.map((p) =>
          p.videoId === video.id ? { ...p, lastWatched: new Date() } : p
        );
      } else {
        return [
          ...prev,
          {
            videoId: video.id,
            completed: false,
            watchProgress: 0,
            lastWatched: new Date(),
          },
        ];
      }
    });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
    setSelectedVideo(null);
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  const handleNavigateToPage = (page: string) => {
    navigate(`/${page}`);
  };

  const handleProgressUpdate = (videoId: string, progress: number) => {
    setUserProgress((prev) => {
      const existing = prev.find((p) => p.videoId === videoId);
      const completed = progress === 100;

      if (existing) {
        const wasCompleted = existing.completed;
        const updatedProgress = prev.map((p) =>
          p.videoId === videoId
            ? { ...p, watchProgress: progress, completed, lastWatched: new Date() }
            : p
        );

        // Show toast when video is completed for the first time
        if (completed && !wasCompleted) {
          toast.success('Video Completed!', {
            description: 'Great job! Now test your knowledge with the quiz below.',
          });
        }

        return updatedProgress;
      } else {
        return [
          ...prev,
          {
            videoId,
            completed,
            watchProgress: progress,
            lastWatched: new Date(),
          },
        ];
      }
    });
  };

  const handleQuizComplete = (videoId: string, score: number) => {
    setUserProgress((prev) =>
      prev.map((p) => (p.videoId === videoId ? { ...p, quizScore: score } : p))
    );

    const message =
      score >= 90
        ? 'Excellent work!'
        : score >= 70
        ? 'Well done!'
        : 'Good effort! Consider reviewing the material.';

    const { addXP } = useStore.getState();
    const xpReward = Math.round(score * 2);
    addXP(xpReward);

    toast.success(`Quiz Completed - ${score}%`, {
      description: `${message} You earned ${xpReward} XP!`,
    });
  };

  const handleArtifactComplete = (videoId: string, type: 'notes' | 'mindMap' | 'cheatSheet') => {
    setUserProgress((prev) =>
      prev.map((p) => {
        if (p.videoId === videoId) {
          const field = `${type}Completed` as keyof UserProgress;
          if (p[field]) return p;

          const { addXP } = useStore.getState();
          addXP(50);

          toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} Reviewed!`, {
            description: 'You earned 50 XP!',
          });

          return { ...p, [field]: true };
        }
        return p;
      })
    );
  };

  const handleAddLink = (data: any) => {
    toast.success('Course Generated!', {
      description: 'Your video has been analyzed and study materials are ready.',
    });

    const { video, notes, quiz, mindMap, cheatSheet, metadata } = data;
    console.log('Received Analysis Data:', { notes, quiz, mindMap, cheatSheet, metadata });

    // Enrich video with research metadata
    const enrichedVideo = {
      ...video,
      idScore: Number(metadata?.info_density_score) || 0,
      knowledgePoints: Number(metadata?.knowledge_points_count) || 0,
      isCoding: video.isCoding
    };

    // Update mock data records in memory
    mockVideos.push(enrichedVideo);
    
    // Ensure notes is a string
    const notesContent = typeof notes === 'string' ? notes : JSON.stringify(notes, null, 2);
    
    mockNotes[video.id] = { content: notesContent || '# No Notes Generated', id: `n_${video.id}`, videoId: video.id };
    mockQuizzes[video.id] = { questions: quiz?.questions || [], id: `q_${video.id}`, videoId: video.id };
    mockMindMaps[video.id] = mindMap || { id: 'root', label: video.title };
    mockCheatSheets[video.id] = { items: cheatSheet?.items || [], id: `cs_${video.id}`, videoId: video.id };

    // Update courses list
    mockCourses.push({
      id: `c_${video.id}`,
      title: video.title,
      description: video.description,
      videos: [enrichedVideo],
      category: video.category,
      thumbnail: video.thumbnail,
    });

    // Handle Select/Navigate
    handleSelectVideo(enrichedVideo);

    // Persist to Supabase if user logged in
    const { user } = useStore.getState();
    if (user) {
      supabase.from('courses').insert([{
        user_id: user.id,
        title: video.title,
        description: video.description,
        video_data: enrichedVideo,
        notes: notes,
        quiz: quiz,
        mind_map: mindMap,
        cheat_sheet: cheatSheet
      }]).then(({ error }) => {
        if (error) console.error('Error persisting course:', error);
      });
    }
  };

  const handleSignIn = (userData: any) => {
    setUser(userData);
    loadProfile(userData.id);
    navigate('/dashboard');
  };

  const handleSignUp = (userData: any) => {
    setUser(userData);
    loadProfile(userData.id);
    navigate('/dashboard');
  };

  const handleSwitchToSignUp = () => {
    navigate('/signup');
  };

  const handleSwitchToSignIn = () => {
    navigate('/signin');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} onNavigate={handleNavigateToPage} />} />
        <Route path="/dashboard" element={
          <DashboardNew
            courses={mockCourses}
            userProgress={userProgress}
            onSelectVideo={handleSelectVideo}
            onAddLink={handleAddLink}
          />
        } />
        <Route path="/video/:id" element={
          selectedVideo ? (
            <VideoLearningView
              video={selectedVideo}
              userProgress={userProgress.find(p => p.videoId === selectedVideo.id)}
              note={mockNotes[selectedVideo.id]}
              cheatSheet={mockCheatSheets[selectedVideo.id]}
              mindMap={mockMindMaps[selectedVideo.id]}
              quiz={mockQuizzes[selectedVideo.id]}
              onBack={handleBackToDashboard}
              onQuizComplete={(score) => handleQuizComplete(selectedVideo.id, score)}
              onArtifactComplete={(type) => handleArtifactComplete(selectedVideo.id, type)}
            />
          ) : <Navigate to="/dashboard" />
        } />
        <Route path="/watch" element={
          <WatchPage
            videoId="dQw4w9WgXcQ"
            videoTitle="Introduction to React Hooks"
            onBack={handleBackToDashboard}
          />
        } />
        <Route path="/features" element={<FeaturesPage onBack={handleBackToLanding} />} />
        <Route path="/pricing" element={<PricingPage onBack={handleBackToLanding} />} />
        <Route path="/about" element={<AboutUsPage onBack={handleBackToLanding} />} />
        <Route path="/contact" element={<ContactPage onBack={handleBackToLanding} />} />
        <Route path="/signin" element={
          <SignInPage
            onSignIn={handleSignIn}
            onSwitchToSignUp={handleSwitchToSignUp}
            onBack={handleBackToLanding}
          />
        } />
        <Route path="/signup" element={
          <SignUpPage
            onSignUp={handleSignUp}
            onSwitchToSignIn={handleSwitchToSignIn}
            onBack={handleBackToLanding}
          />
        } />
      </Routes>
      <Toaster />
    </>
  );
}