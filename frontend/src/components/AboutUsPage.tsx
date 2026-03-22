import { Button } from './ui/button';
import { Footer } from './Footer';
import {
  ArrowLeft,
  Sparkles,
  Target,
  Heart,
  Users,
  Zap,
  Award,
  TrendingUp,
} from 'lucide-react';

interface AboutUsPageProps {
  onBack: () => void;
}

export function AboutUsPage({ onBack }: AboutUsPageProps) {
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Transforming Learning with
            <span className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
              {' '}AI Technology
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            We're on a mission to make quality education accessible to everyone by turning YouTube
            into the world's largest interactive learning platform.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24">
          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#5B5FFF]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              At Learnful, we believe that learning should be active, engaging, and personalized.
              YouTube has democratized access to knowledge, but passive watching isn't enough.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We're building AI-powered tools that transform any video into a complete study
              ecosystem—notes, quizzes, mind maps, and more—so learners can truly master the
              content they consume.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#4ECB71]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              We envision a world where every learner has access to personalized, AI-enhanced
              education materials that adapt to their learning style and pace.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              By combining cutting-edge AI with the vast knowledge repository of YouTube, we're
              creating the future of self-directed learning—accessible, affordable, and effective
              for everyone.
            </p>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Our Story */}
        <div className="mb-16 sm:mb-24 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">
            Our Story
          </h2>
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Learnful was born from a simple observation: students were spending hours watching
              educational YouTube videos, pausing constantly to take notes, and struggling to
              retain information. The disconnect between passive viewing and active learning was
              clear.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              In 2024, our founders—a group of educators, developers, and AI researchers—came
              together with a bold idea: what if AI could automatically transform any YouTube
              video into a comprehensive learning experience?
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              After months of development and testing with hundreds of students, Learnful was
              launched in early 2025. Today, we're proud to serve thousands of learners worldwide,
              from self-taught developers to university students preparing for exams.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We're just getting started. Our team is constantly improving our AI models, adding
              new features, and expanding language support to make quality education truly
              accessible to everyone, everywhere.
            </p>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Values */}
        <div className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-white">
            Our Values
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#5B5FFF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                Learner-First
              </h3>
              <p className="text-sm text-gray-400">
                Every decision we make prioritizes the learning experience. Your success is our
                success.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#4ECB71]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                Innovation
              </h3>
              <p className="text-sm text-gray-400">
                We push the boundaries of AI and education technology to create tools that truly
                make a difference.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#FFB547]/20 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#FFB547]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                Accessibility
              </h3>
              <p className="text-sm text-gray-400">
                Quality education shouldn't be a privilege. We're committed to keeping our
                platform affordable and inclusive.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                Quality
              </h3>
              <p className="text-sm text-gray-400">
                We use state-of-the-art AI models and continuously refine our algorithms to
                deliver the best results.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#5B5FFF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                Continuous Improvement
              </h3>
              <p className="text-sm text-gray-400">
                We listen to our users and constantly evolve our platform based on feedback and
                research.
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-[#4ECB71]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                Transparency
              </h3>
              <p className="text-sm text-gray-400">
                We're open about our AI capabilities, limitations, and how we use your data to
                improve the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Stats Section */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-white">
            Our Impact
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-sm sm:text-base text-gray-400">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-sm sm:text-base text-gray-400">Videos Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">2M+</div>
              <div className="text-sm sm:text-base text-gray-400">Notes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-sm sm:text-base text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* CTA Section */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-[#5B5FFF]/30 glow-blue">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Join Us on Our Mission
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            Be part of the learning revolution. Start transforming your YouTube experience today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onBack}
              className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF] text-white shadow-lg glow-blue w-full sm:w-auto"
            >
              Get Started Free
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onBack}
              className="border-white/20 hover:bg-white/10 w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}