import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Footer } from './Footer';
import {
  ArrowLeft,
  Sparkles,
  Check,
  Zap,
  Crown,
  Rocket,
} from 'lucide-react';

interface PricingPageProps {
  onBack: () => void;
}

export function PricingPage({ onBack }: PricingPageProps) {
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
            Simple, Transparent
            <span className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
              {' '}Pricing
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your learning needs. All plans include core AI features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-16 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-500/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Free</h3>
                <p className="text-sm text-gray-400">Get started</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                $0
                <span className="text-base sm:text-lg font-normal text-gray-400">/month</span>
              </div>
              <p className="text-sm text-gray-400">Perfect for trying out Learnful</p>
            </div>

            <Button
              onClick={onBack}
              variant="outline"
              className="w-full mb-6 border-white/20 hover:bg-white/10"
            >
              Get Started
            </Button>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">5 videos per month</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">AI-generated notes</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Basic quizzes</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Cheat sheets</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Basic progress tracking</span>
              </div>
            </div>
          </div>

          {/* Pro Plan - Featured */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border-2 border-[#5B5FFF] glow-blue relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] text-white border-0">
              Most Popular
            </Badge>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5B5FFF]/20 to-[#7B61FF]/20 rounded-2xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-[#5B5FFF]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Pro</h3>
                <p className="text-sm text-[#5B5FFF]">Most popular</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                $12
                <span className="text-base sm:text-lg font-normal text-gray-400">/month</span>
              </div>
              <p className="text-sm text-gray-400">For serious learners</p>
            </div>

            <Button
              onClick={onBack}
              className="w-full mb-6 bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF]"
            >
              Start Free Trial
            </Button>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Unlimited videos</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Advanced AI notes</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Interactive mind maps</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Adaptive quizzes</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Code compiler access</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Export to PDF/Word</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Priority support</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#5B5FFF] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">Advanced analytics</span>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#FFB547]/20 rounded-2xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-[#FFB547]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Enterprise</h3>
                <p className="text-sm text-gray-400">For teams</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Custom
              </div>
              <p className="text-sm text-gray-400">Tailored for your organization</p>
            </div>

            <Button
              onClick={onBack}
              variant="outline"
              className="w-full mb-6 border-[#FFB547]/50 hover:bg-[#FFB547]/10 text-[#FFB547]"
            >
              Contact Sales
            </Button>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Everything in Pro</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Unlimited team members</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Custom integrations</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Dedicated account manager</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">SSO & advanced security</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Custom AI training</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Priority API access</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">SLA guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                Can I switch plans anytime?
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes
                take effect at the start of your next billing cycle.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                What payment methods do you accept?
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and for
                Enterprise plans, we can arrange invoice-based payments.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                Is there a free trial for Pro?
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Yes! All new users get a 14-day free trial of the Pro plan. No credit card
                required to start.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                Do you offer student discounts?
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Absolutely! Students with a valid .edu email address receive 50% off Pro plans.
                Verify your status during signup.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                What happens to my data if I cancel?
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Your data remains accessible for 30 days after cancellation. You can export all
                your notes, quizzes, and materials before they're permanently deleted.
              </p>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* CTA Section */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-[#5B5FFF]/30 glow-blue">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Start Learning Smarter Today
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their YouTube experience with Learnful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onBack}
              className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF] text-white shadow-lg glow-blue w-full sm:w-auto"
            >
              Start Free Trial
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onBack}
              className="border-white/20 hover:bg-white/10 w-full sm:w-auto"
            >
              Compare Plans
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}