import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  ArrowLeft,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface SignInPageProps {
  onSignIn?: (user: any) => void;
  onSwitchToSignUp?: () => void;
  onBack?: () => void;
}

export function SignInPage({ onSignIn, onSwitchToSignUp, onBack }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success('Successfully signed in!');
        if (onSignIn) {
          onSignIn(data.user);
        }
      }
    } catch (error: any) {
      toast.error('Sign in failed', {
        description: error.message || 'Please check your credentials.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#0F0F1E] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#5B5FFF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4ECB71]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
              Learnful
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Sign In Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-400 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-[#5B5FFF] hover:text-[#7B61FF] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] hover:to-[#6B51EF] text-white shadow-lg glow-blue"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1A1A2E] text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="border-white/10 hover:bg-white/5 hover:border-white/20"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('github')}
              className="border-white/10 hover:bg-white/5 hover:border-white/20"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-[#5B5FFF] hover:text-[#7B61FF] font-medium transition-colors"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
