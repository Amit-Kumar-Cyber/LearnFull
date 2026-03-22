import { Button } from './ui/button';
import { Card } from './ui/card';
import { Footer } from './Footer';
import {
  ArrowRight,
  BookOpen,
  Brain,
  BarChart3,
  Code,
  Video,
  Play,
  Sparkles,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate?: (page: 'features' | 'pricing' | 'about' | 'contact' | 'signin' | 'signup' | 'watch') => void;
}

export function LandingPage({ onGetStarted, onNavigate }: LandingPageProps) {
  const handleSignIn = () => {
    if (onNavigate) {
      onNavigate('signin');
    }
  };

  const handleTryWatchMode = () => {
    if (onNavigate) {
      onNavigate('watch');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F1E]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
              Learnful
            </span>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignIn}
            className="border-[#5B5FFF]/50 hover:bg-[#5B5FFF]/10 hover:border-[#5B5FFF] transition-all text-sm sm:text-base"
          >
            Sign In
          </Button>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-white">
              Turn YouTube into Your{' '}
              <span className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
                Personal Classroom
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8">
              AI-powered learning that transforms any YouTube video into structured notes,
              interactive quizzes, mind maps, and more. Learn smarter, not harder.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF] text-white shadow-lg glow-blue transition-all w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="aspect-video bg-gradient-to-br from-[#5B5FFF]/20 to-[#7B61FF]/20 rounded-2xl flex items-center justify-center">
                <Play className="w-16 sm:w-20 h-16 sm:h-20 text-[#5B5FFF]" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Features Section */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
              Everything You Need to Learn Smarter
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
              AI-powered tools that transform passive watching into active learning
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#5B5FFF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">AI-Generated Notes</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Automatically creates structured, markdown-formatted notes from video
                transcripts. No more pausing to take notes manually.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#5B5FFF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Interactive Mind Maps</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Visualize concepts and their relationships with AI-generated mind maps.
                See the big picture at a glance.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECB71]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Adaptive Quizzes</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Test your knowledge with AI-generated quizzes that scale with video
                length. Get instant feedback and explanations.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFB547]/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFB547]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Integrated Code Editor</h3>
              <p className="text-sm sm:text-base text-gray-400">
                For programming tutorials, practice coding right alongside the video.
                Supports Python, JavaScript, and more.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF6B6B]/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Quick Cheat Sheets</h3>
              <p className="text-sm sm:text-base text-gray-400">
                AI extracts key syntax, formulas, and rules into easy-to-reference tables.
                Perfect for quick reviews.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECB71]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Progress Tracking</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Monitor your learning journey with detailed analytics. Stay motivated with
                completion stats and streaks.
              </p>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* How It Works */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">How Learnful Works</h2>
          <p className="text-gray-400 mb-12 text-lg">
            Get started in three simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative">
              <div className="w-16 h-16 bg-[#5B5FFF] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Paste Any YouTube Link</h3>
              <p className="text-gray-400">
                Simply paste a YouTube URL into our magic search bar
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-[#4ECB71] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI Generates Content</h3>
              <p className="text-gray-400">
                Our AI creates notes, quizzes, mind maps, and cheat sheets
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-[#FFB547] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Learn & Master</h3>
              <p className="text-gray-400">
                Watch, read, practice, and test yourself all in one place
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who are mastering new skills faster with Learnful
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={onGetStarted}
            className="text-lg px-8"
          >
            Start Learning for Free
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}