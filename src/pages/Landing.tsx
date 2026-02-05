import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Brain, Map, Code, Zap, Target } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleGetStarted = () => {
    if (youtubeLink.trim()) {
      navigate(`/learn?url=${encodeURIComponent(youtubeLink)}`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Learnful</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Turn YouTube into a{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Classroom
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Transform any YouTube video into a complete learning experience with AI-generated notes,
          mind maps, quizzes, and integrated coding practice.
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-lg p-2">
            <input
              type="text"
              placeholder="Paste any YouTube link here..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-gray-700"
              onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()}
            />
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Start Learning</span>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            No credit card required. Start learning in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Brain className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Notes</h3>
            <p className="text-gray-600">
              Automatically generate structured, comprehensive notes from any video transcript using
              advanced AI.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Map className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Mind Maps</h3>
            <p className="text-gray-600">
              Visualize complex concepts and relationships with automatically generated,
              interactive mind maps.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Target className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Adaptive Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with AI-generated quizzes that adapt to video length and
              complexity.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="flex items-center justify-center mb-6">
            <Code className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Built for Developers</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Learning to code? Get an integrated compiler right in your learning environment. Write,
            test, and debug code while you learn.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-medium transition"
          >
            Start Coding Now
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="w-6 h-6" />
            <span className="text-xl font-bold">Learnful</span>
          </div>
          <p className="text-gray-400">Transform your learning experience with AI</p>
        </div>
      </footer>
    </div>
  );
}
