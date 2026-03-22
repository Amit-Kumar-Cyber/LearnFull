import { Button } from './ui/button';
import { Footer } from './Footer';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Brain,
  Code,
  Video,
  BarChart3,
  Zap,
  Clock,
  Share2,
  Download,
  Smartphone,
  Globe,
  Shield,
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

export function FeaturesPage({ onBack }: FeaturesPageProps) {
  return (
    <div className="min-h-screen bg-[#0F0F1E]">
      {/* Header */}
      <div className="glass-card border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
                Learnful
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Powerful Features for
            <span className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
              {' '}Smarter Learning
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how Learnful transforms YouTube videos into comprehensive learning
            experiences with AI-powered tools designed for modern learners.
          </p>
        </div>

        {/* Detailed Features */}
        <div className="space-y-12 sm:space-y-16 mb-16 sm:mb-24">
          {/* Feature 1: AI-Generated Notes */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-[#5B5FFF]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                      AI-Generated Notes
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400">
                      Automatically convert video content into structured, markdown-formatted
                      notes with timestamps and key concepts.
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5B5FFF] mt-1">✓</span>
                    <span>Automatically transcribes and structures video content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5B5FFF] mt-1">✓</span>
                    <span>Markdown formatting with headers, lists, and code blocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5B5FFF] mt-1">✓</span>
                    <span>Timestamp references linked to video moments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5B5FFF] mt-1">✓</span>
                    <span>Export to PDF, Word, or plain text</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="aspect-video bg-gradient-to-br from-[#5B5FFF]/20 to-[#7B61FF]/20 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-16 sm:w-20 h-16 sm:h-20 text-[#5B5FFF]" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Interactive Mind Maps */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="aspect-video bg-gradient-to-br from-[#4ECB71]/20 to-[#4ECB71]/10 rounded-2xl flex items-center justify-center">
                  <Brain className="w-16 sm:w-20 h-16 sm:h-20 text-[#4ECB71]" />
                </div>
              </div>
            </div>
            <div>
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-[#4ECB71]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                      Interactive Mind Maps
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400">
                      Visualize complex concepts and their relationships with AI-generated
                      interactive mind maps.
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4ECB71] mt-1">✓</span>
                    <span>Visual representation of key concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4ECB71] mt-1">✓</span>
                    <span>Hierarchical structure showing relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4ECB71] mt-1">✓</span>
                    <span>Interactive nodes with detailed information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4ECB71] mt-1">✓</span>
                    <span>Export as image or shareable link</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3: Adaptive Quizzes */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFB547]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFB547]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                      Adaptive Quizzes
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400">
                      Test your knowledge with AI-generated quizzes that scale based on video
                      length and complexity.
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB547] mt-1">✓</span>
                    <span>Scales at ~25 questions per 30 minutes of video</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB547] mt-1">✓</span>
                    <span>Multiple choice with instant feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB547] mt-1">✓</span>
                    <span>Detailed explanations for each answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB547] mt-1">✓</span>
                    <span>Track your progress and scores</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="aspect-video bg-gradient-to-br from-[#FFB547]/20 to-[#FFB547]/10 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-16 sm:w-20 h-16 sm:h-20 text-[#FFB547]" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Code Compiler */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="aspect-video bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF6B6B]/10 rounded-2xl flex items-center justify-center">
                  <Code className="w-16 sm:w-20 h-16 sm:h-20 text-[#FF6B6B]" />
                </div>
              </div>
            </div>
            <div>
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF6B6B]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                      Integrated Code Compiler
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400">
                      Practice coding right alongside programming tutorials with our built-in
                      compiler.
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B] mt-1">✓</span>
                    <span>Support for Python, JavaScript, and more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B] mt-1">✓</span>
                    <span>Real-time code execution and output</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B] mt-1">✓</span>
                    <span>Syntax highlighting and error detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B] mt-1">✓</span>
                    <span>Save and share your code snippets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
              More Powerful Features
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for an effective learning experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#5B5FFF]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Lightning Fast
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                AI generates your complete study materials in seconds, not hours.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECB71]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Save Time
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Reduce study time by up to 50% with structured, AI-curated content.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFB547]/20 rounded-2xl flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFB547]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Easy Sharing
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Share notes, quizzes, and mind maps with classmates or study groups.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF6B6B]/20 rounded-2xl flex items-center justify-center mb-4">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Export Anywhere
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Export your notes to PDF, Word, or Markdown for offline access.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#5B5FFF]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Mobile Friendly
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Learn on any device - desktop, tablet, or smartphone.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECB71]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Multi-Language
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Support for multiple languages with automatic translation.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFB547]/20 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFB547]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Privacy First
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Your data is encrypted and never shared with third parties.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF6B6B]/20 rounded-2xl flex items-center justify-center mb-4">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Video Bookmarks
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Mark important moments and create timestamped references.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#5B5FFF]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                Progress Analytics
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Track your learning progress with detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-[#5B5FFF]/30 glow-blue">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are mastering new skills faster with Learnful
          </p>
          <Button
            size="lg"
            onClick={onBack}
            className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF] text-white shadow-lg glow-blue"
          >
            Get Started Free
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
