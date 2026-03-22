import { Sparkles, Github, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FooterProps {
  onNavigate?: (page: 'features' | 'pricing' | 'about' | 'contact' | 'signin' | 'signup') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: 'features' | 'pricing' | 'about' | 'contact' | 'signin' | 'signup') => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      {/* Section Divider */}
      <div className="section-divider"></div>

      <footer className="glass-card border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
                  Learnful
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm text-sm sm:text-base">
                Transform YouTube into your personal classroom with AI-powered notes, quizzes,
                mind maps, and more. Learn smarter, not harder.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-sm sm:text-base"
                  />
                  <Button className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF] whitespace-nowrap text-sm sm:text-base">
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-[#5B5FFF]/20 border border-white/10 hover:border-[#5B5FFF]/50 rounded-xl flex items-center justify-center transition-all"
                >
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-[#5B5FFF]" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-[#5B5FFF]/20 border border-white/10 hover:border-[#5B5FFF]/50 rounded-xl flex items-center justify-center transition-all"
                >
                  <Github className="w-5 h-5 text-gray-400 hover:text-[#5B5FFF]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-[#4ECB71]/20 border border-white/10 hover:border-[#4ECB71]/50 rounded-xl flex items-center justify-center transition-all"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-[#4ECB71]" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl flex items-center justify-center transition-all"
                >
                  <Youtube className="w-5 h-5 text-gray-400 hover:text-red-400" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation('features')}
                    className="text-gray-400 hover:text-[#5B5FFF] transition-colors text-sm sm:text-base text-left"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('pricing')}
                    className="text-gray-400 hover:text-[#5B5FFF] transition-colors text-sm sm:text-base text-left"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#5B5FFF] transition-colors text-sm sm:text-base">
                    AI Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#5B5FFF] transition-colors text-sm sm:text-base">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#5B5FFF] transition-colors text-sm sm:text-base">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation('about')}
                    className="text-gray-400 hover:text-[#4ECB71] transition-colors text-sm sm:text-base text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#4ECB71] transition-colors text-sm sm:text-base">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#4ECB71] transition-colors text-sm sm:text-base">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#4ECB71] transition-colors text-sm sm:text-base">
                    Press Kit
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('contact')}
                    className="text-gray-400 hover:text-[#4ECB71] transition-colors text-sm sm:text-base text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources & Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#FFB547] transition-colors text-sm sm:text-base">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#FFB547] transition-colors text-sm sm:text-base">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#FFB547] transition-colors text-sm sm:text-base">
                    Tutorials
                  </a>
                </li>
              </ul>

              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#FFB547] transition-colors text-sm sm:text-base">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#FFB547] transition-colors text-sm sm:text-base">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#FFB547] transition-colors text-sm sm:text-base">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
                © 2026 Learnful. All rights reserved. Transforming YouTube into your personal
                classroom.
              </p>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                <a href="#" className="text-gray-500 hover:text-[#5B5FFF] transition-colors">
                  Status
                </a>
                <a href="#" className="text-gray-500 hover:text-[#4ECB71] transition-colors">
                  Changelog
                </a>
                <a href="#" className="text-gray-500 hover:text-[#FFB547] transition-colors">
                  API Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}