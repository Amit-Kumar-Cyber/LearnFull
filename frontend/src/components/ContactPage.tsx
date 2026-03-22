import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Footer } from './Footer';
import {
  ArrowLeft,
  Sparkles,
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Clock,
  Send,
} from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Get in
            <span className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] bg-clip-text text-transparent">
              {' '}Touch
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            Have a question, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Send Us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl">
                  <p className="text-green-400 text-sm sm:text-base">
                    ✓ Thank you for your message! We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF] text-white"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#5B5FFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-white">
                    Email Us
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Our team is here to help
                  </p>
                  <a
                    href="mailto:support@learnful.ai"
                    className="text-sm text-[#5B5FFF] hover:text-[#7B61FF] transition-colors"
                  >
                    support@learnful.ai
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#4ECB71]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#4ECB71]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-white">
                    Live Chat
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Chat with our support team
                  </p>
                  <button className="text-sm text-[#4ECB71] hover:text-[#5FDB81] transition-colors">
                    Start a conversation
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFB547]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#FFB547]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-white">
                    Phone Support
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Available for Enterprise plans
                  </p>
                  <p className="text-sm text-[#FFB547]">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#FF6B6B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-white">
                    Support Hours
                  </h3>
                  <p className="text-sm text-gray-400">
                    Monday - Friday: 9am - 6pm PST
                  </p>
                  <p className="text-sm text-gray-400">
                    Saturday - Sunday: 10am - 4pm PST
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5B5FFF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#5B5FFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-white">
                    Office Location
                  </h3>
                  <p className="text-sm text-gray-400">
                    123 Innovation Drive
                  </p>
                  <p className="text-sm text-gray-400">
                    San Francisco, CA 94103
                  </p>
                  <p className="text-sm text-gray-400">
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* FAQ Quick Links */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white">
            Quick Help
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6 cursor-pointer">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                📚 Help Center
              </h3>
              <p className="text-sm text-gray-400">
                Browse our comprehensive documentation and tutorials
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6 cursor-pointer">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                💬 Community Forum
              </h3>
              <p className="text-sm text-gray-400">
                Connect with other learners and share experiences
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6 cursor-pointer">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                🎥 Video Tutorials
              </h3>
              <p className="text-sm text-gray-400">
                Watch step-by-step guides on using Learnful
              </p>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-6 cursor-pointer">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                🐛 Report a Bug
              </h3>
              <p className="text-sm text-gray-400">
                Help us improve by reporting technical issues
              </p>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* CTA Section */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-[#5B5FFF]/30 glow-blue">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Prefer to Get Started Right Away?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            Jump in and start transforming YouTube videos into complete learning ecosystems.
          </p>
          <Button
            size="lg"
            onClick={onBack}
            className="bg-gradient-to-r from-[#5B5FFF] to-[#7B61FF] hover:from-[#4B4FEF] to-[#6B51EF] text-white shadow-lg glow-blue"
          >
            Start Learning Now
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}