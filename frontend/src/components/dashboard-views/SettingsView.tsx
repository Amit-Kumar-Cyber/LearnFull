import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  CreditCard,
  Download,
  Trash2,
  Save,
} from 'lucide-react';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    assignmentReminders: true,
    weeklyDigest: false,
    achievementAlerts: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400 mb-6">Manage your account preferences and settings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A1A2E] rounded-2xl p-4 border border-white/10 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#5B5FFF] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#1A1A2E] rounded-2xl p-6 border border-white/10">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Profile Information</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Update your account profile information and email address
                  </p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">V</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white mb-2 block">First Name</Label>
                    <Input
                      defaultValue="Vishnu"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Last Name</Label>
                    <Input
                      defaultValue="Vardhan"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Email Address</Label>
                  <Input
                    type="email"
                    defaultValue="vishnu@example.com"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Bio</Label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 resize-none"
                    defaultValue="Passionate learner exploring programming and technology."
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Notification Preferences</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Manage how you receive notifications and updates
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Email Notifications</div>
                      <div className="text-sm text-gray-400">Receive notifications via email</div>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Push Notifications</div>
                      <div className="text-sm text-gray-400">Receive push notifications in browser</div>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Course Updates</div>
                      <div className="text-sm text-gray-400">Get notified about new course content</div>
                    </div>
                    <Switch
                      checked={notifications.courseUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, courseUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Assignment Reminders</div>
                      <div className="text-sm text-gray-400">Reminders for upcoming deadlines</div>
                    </div>
                    <Switch
                      checked={notifications.assignmentReminders}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, assignmentReminders: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Weekly Digest</div>
                      <div className="text-sm text-gray-400">Weekly summary of your progress</div>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, weeklyDigest: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium text-white mb-1">Achievement Alerts</div>
                      <div className="text-sm text-gray-400">Notifications for badges and achievements</div>
                    </div>
                    <Switch
                      checked={notifications.achievementAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, achievementAlerts: checked })
                      }
                    />
                  </div>
                </div>

                <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Security Settings</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Manage your password and security preferences
                  </p>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Current Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">New Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Confirm New Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-white">Two-Factor Authentication</div>
                    <Badge className="bg-[#4ECB71]/20 text-[#4ECB71] border-[#4ECB71]/30">
                      Enabled
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Configure 2FA
                  </Button>
                </div>

                <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Appearance</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Customize how Learnful looks for you
                  </p>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 border-2 border-[#5B5FFF] rounded-xl p-4 cursor-pointer">
                      <div className="w-full h-20 bg-[#0F0F1E] rounded-lg mb-3"></div>
                      <div className="text-center text-white font-medium">Dark</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/30 transition-colors">
                      <div className="w-full h-20 bg-white rounded-lg mb-3"></div>
                      <div className="text-center text-gray-400 font-medium">Light</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/30 transition-colors">
                      <div className="w-full h-20 bg-gradient-to-r from-[#0F0F1E] to-white rounded-lg mb-3"></div>
                      <div className="text-center text-gray-400 font-medium">Auto</div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Accent Color</Label>
                  <div className="flex gap-3">
                    {['#5B5FFF', '#FF6B6B', '#4ECB71', '#FFB547', '#A855F7'].map((color) => (
                      <button
                        key={color}
                        className={`w-12 h-12 rounded-full border-2 ${
                          color === '#5B5FFF' ? 'border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-white mb-1">Compact Mode</div>
                    <div className="text-sm text-gray-400">Reduce spacing between elements</div>
                  </div>
                  <Switch />
                </div>
              </div>
            )}

            {/* Language Tab */}
            {activeTab === 'language' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Language & Region</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Select your preferred language and regional settings
                  </p>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Language</Label>
                  <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Time Zone</Label>
                  <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
                    <option value="pst">Pacific Standard Time (PST)</option>
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="gmt">Greenwich Mean Time (GMT)</option>
                    <option value="ist">Indian Standard Time (IST)</option>
                  </select>
                </div>

                <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Privacy Settings</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Control your privacy and data sharing preferences
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Profile Visibility</div>
                      <div className="text-sm text-gray-400">Make your profile visible to others</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Show on Leaderboard</div>
                      <div className="text-sm text-gray-400">Display your rank publicly</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="font-medium text-white mb-1">Analytics & Cookies</div>
                      <div className="text-sm text-gray-400">Help us improve with usage data</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="font-medium text-white mb-2">Data Export</div>
                  <p className="text-sm text-gray-400 mb-3">
                    Download a copy of all your data
                  </p>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <div className="font-medium text-red-400 mb-2">Delete Account</div>
                  <p className="text-sm text-gray-400 mb-3">
                    Permanently delete your account and all data
                  </p>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Billing & Subscription</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Manage your subscription and payment methods
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#5B5FFF]/20 to-[#7B61FF]/20 rounded-xl p-6 border border-[#5B5FFF]/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">Free Plan</div>
                      <div className="text-gray-400">5 videos per month</div>
                    </div>
                    <Badge className="bg-[#5B5FFF]/30 text-[#5B5FFF] border-[#5B5FFF]/50">
                      Active
                    </Badge>
                  </div>
                  <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                    Upgrade to Pro
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4">Payment Method</h3>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="text-gray-400 text-sm">No payment method added</div>
                    </div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      Add Card
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4">Billing History</h3>
                  <div className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
                    <p className="text-gray-400">No billing history available</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
