import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Search,
  FileText,
  Video,
  Link as LinkIcon,
  Download,
  BookOpen,
  Code,
  Image as ImageIcon,
  File,
  Filter,
  Star,
  Clock,
} from 'lucide-react';

export function ResourcesView() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    {
      id: 1,
      title: 'Python Cheat Sheet - Complete Guide',
      type: 'PDF',
      category: 'Programming',
      course: 'Python for Beginners',
      size: '2.4 MB',
      downloads: 1250,
      rating: 4.8,
      uploadDate: '2024-07-10',
      icon: FileText,
      color: 'text-red-500',
    },
    {
      id: 2,
      title: 'React Hooks Tutorial Video',
      type: 'Video',
      category: 'Programming',
      course: 'Advanced React & TypeScript',
      size: '125 MB',
      downloads: 890,
      rating: 4.9,
      uploadDate: '2024-07-12',
      icon: Video,
      color: 'text-purple-500',
    },
    {
      id: 3,
      title: 'UI Design System - Figma Template',
      type: 'Link',
      category: 'Design',
      course: 'UI/UX Design Masterclass',
      downloads: 2100,
      rating: 4.7,
      uploadDate: '2024-07-08',
      icon: LinkIcon,
      color: 'text-blue-500',
    },
    {
      id: 4,
      title: 'Data Structures Reference Book',
      type: 'PDF',
      category: 'Programming',
      course: 'C++ Programming',
      size: '15.8 MB',
      downloads: 1580,
      rating: 4.6,
      uploadDate: '2024-07-05',
      icon: BookOpen,
      color: 'text-red-500',
    },
    {
      id: 5,
      title: 'Machine Learning Sample Code',
      type: 'Code',
      category: 'Data Science',
      course: 'Machine Learning A-Z',
      size: '1.2 MB',
      downloads: 720,
      rating: 4.8,
      uploadDate: '2024-07-14',
      icon: Code,
      color: 'text-green-500',
    },
    {
      id: 6,
      title: 'Marketing Strategy Templates',
      type: 'PDF',
      category: 'Marketing',
      course: 'Digital Marketing Strategy',
      size: '3.6 MB',
      downloads: 950,
      rating: 4.5,
      uploadDate: '2024-07-11',
      icon: FileText,
      color: 'text-red-500',
    },
    {
      id: 7,
      title: 'CSS Grid Layout Examples',
      type: 'Code',
      category: 'Programming',
      course: 'Advanced React & TypeScript',
      size: '0.8 MB',
      downloads: 1100,
      rating: 4.7,
      uploadDate: '2024-07-13',
      icon: Code,
      color: 'text-green-500',
    },
    {
      id: 8,
      title: 'Design Inspiration Gallery',
      type: 'Link',
      category: 'Design',
      course: 'UI/UX Design Masterclass',
      downloads: 1820,
      rating: 4.9,
      uploadDate: '2024-07-09',
      icon: ImageIcon,
      color: 'text-blue-500',
    },
    {
      id: 9,
      title: 'Python Interview Questions',
      type: 'PDF',
      category: 'Programming',
      course: 'Python for Beginners',
      size: '4.2 MB',
      downloads: 2350,
      rating: 4.8,
      uploadDate: '2024-07-07',
      icon: FileText,
      color: 'text-red-500',
    },
  ];

  const categories = ['All', 'Programming', 'Design', 'Data Science', 'Marketing'];
  const types = ['All Types', 'PDF', 'Video', 'Code', 'Link'];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = filter === 'all' || resource.category.toLowerCase() === filter;
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Video':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Code':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Link':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Learning Resources</h1>
        <p className="text-gray-400">Access study materials, templates, and supplementary content</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1A1A2E] border-white/10 text-white placeholder:text-gray-500 h-12"
          />
        </div>
        <Button className="bg-[#1A1A2E] border border-white/10 text-white hover:bg-white/10 h-12 px-6">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category.toLowerCase())}
            className={`px-5 py-2 rounded-xl whitespace-nowrap transition-all ${
              filter === category.toLowerCase()
                ? 'bg-[#5B5FFF] text-white'
                : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <FileText className="w-8 h-8 text-red-500 mb-2" />
          <div className="text-2xl font-bold text-white mb-1">24</div>
          <div className="text-sm text-gray-400">PDF Documents</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <Video className="w-8 h-8 text-purple-500 mb-2" />
          <div className="text-2xl font-bold text-white mb-1">18</div>
          <div className="text-sm text-gray-400">Video Tutorials</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <Code className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-white mb-1">32</div>
          <div className="text-sm text-gray-400">Code Samples</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <LinkIcon className="w-8 h-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-white mb-1">15</div>
          <div className="text-sm text-gray-400">External Links</div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.id}
              className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10 hover:border-[#5B5FFF]/30 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center ${resource.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
              </div>

              <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-[#5B5FFF] transition-colors line-clamp-2">
                {resource.title}
              </h3>

              <p className="text-sm text-gray-400 mb-4">{resource.course}</p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                {resource.size && (
                  <div className="flex items-center gap-1">
                    <File className="w-3 h-3" />
                    <span>{resource.size}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>{resource.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span>{resource.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{resource.uploadDate}</span>
                </div>
              </div>

              <Button className="w-full bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                <Download className="w-4 h-4 mr-2" />
                {resource.type === 'Link' ? 'Open Link' : 'Download'}
              </Button>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-[#1A1A2E] rounded-2xl p-12 border border-white/10 text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-gradient-to-br from-[#5B5FFF]/10 to-[#7B61FF]/10 rounded-2xl p-8 border border-[#5B5FFF]/30 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Have a resource to share?</h3>
        <p className="text-gray-400 mb-4">
          Upload your own study materials and help other learners
        </p>
        <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
          <Download className="w-4 h-4 mr-2 rotate-180" />
          Upload Resource
        </Button>
      </div>
    </div>
  );
}
