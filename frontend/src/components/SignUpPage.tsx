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
  User,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface SignUpPageProps {
  onSignUp?: (user: any) => void;
  onSwitchToSignIn?: () => void;
  onBack?: () => void;
}

export function SignUpPage({ onSignUp, onSwitchToSignIn, onBack }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const isPasswordStrong = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordStrong) {
      toast.error('Password is too weak');
      return;
    }
    
    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      toast.error('You must agree to the terms');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast.success('Account created!');
        if (onSignUp) {
          onSignUp(data.user);
        }
      }
    } catch (error: any) {
      toast.error('Sign up failed', {
        description: error.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#0F0F1E] flex items-center justify-center p-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#5B5FFF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4ECB71]/10 rounded-full blur-3xl"></div>
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
            Create Your Account
          </h1>
          <p className="text-gray-400">
            Join thousands of learners transforming YouTube into classrooms
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
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
              
              {/* Password Strength Indicators */}
              {password && (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${hasMinLength ? 'bg-[#4ECB71]' : 'bg-gray-600'}`}></div>
                    <span className={hasMinLength ? 'text-[#4ECB71]' : 'text-gray-400'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${hasUpperCase ? 'bg-[#4ECB71]' : 'bg-gray-600'}`}></div>
                    <span className={hasUpperCase ? 'text-[#4ECB71]' : 'text-gray-400'}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${hasLowerCase ? 'bg-[#4ECB71]' : 'bg-gray-600'}`}></div>
                    <span className={hasLowerCase ? 'text-[#4ECB71]' : 'text-gray-400'}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${hasNumber ? 'bg-[#4ECB71]' : 'bg-gray-600'}`}></div>
                    <span className={hasNumber ? 'text-[#4ECB71]' : 'text-gray-400'}>
                      One number
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && (
                <div className="flex items-center gap-2 text-xs mt-2">
                  {passwordsMatch ? (
                    <>
                      <Check className="w-4 h-4 text-[#4ECB71]" />
                      <span className="text-[#4ECB71]">Passwords match</span>
                    </>
                  ) : (
                    <span className="text-[#FF6B6B]">Passwords do not match</span>
                  )}
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-gray-400 cursor-pointer leading-relaxed"
              >
                I agree to the{' '}
                <a href="#" className="text-[#5B5FFF] hover:text-[#7B61FF] transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#5B5FFF] hover:text-[#7B61FF] transition-colors">
                  Privacy Policy
                </a>
              </Label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] hover:to-[#6B51EF] text-white shadow-lg glow-blue"
              disabled={isLoading || !agreeToTerms}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1A1A2E] text-gray-400">Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignUp('google')}
              className="border-white/10 hover:bg-white/5 hover:border-white/20"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignUp('github')}
              className="border-white/10 hover:bg-white/5 hover:border-white/20"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="text-[#5B5FFF] hover:text-[#7B61FF] font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 glass-card rounded-xl p-4 border border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#4ECB71]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#4ECB71]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Free Forever Plan
              </h3>
              <p className="text-xs text-gray-400">
                Start with 5 videos per month. Upgrade anytime for unlimited access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
