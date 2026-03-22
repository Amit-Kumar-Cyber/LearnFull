import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Search,
  BookOpen,
  Star,
  Clock,
  Users,
  ChevronRight,
  Filter,
  Play,
  CheckCircle2,
} from 'lucide-react';

export function CoursesView() {
  const [filter, setFilter] = useState('all');

  const categories = ['All', 'Programming', 'Design', 'Business', 'Data Science', 'Marketing'];

  const allCourses = [
    {
      id: 1,
      title: 'Python for Beginners',
      instructor: 'John Doe',
      category: 'Programming',
      rating: 4.8,
      students: 15420,
      duration: '12 hours',
      progress: 65,
      enrolled: true,
      image: 'from-pink-500 to-rose-500',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Advanced React & TypeScript',
      instructor: 'Sarah Johnson',
      category: 'Programming',
      rating: 4.9,
      students: 12300,
      duration: '18 hours',
      progress: 0,
      enrolled: false,
      image: 'from-blue-500 to-cyan-500',
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Mike Wilson',
      category: 'Design',
      rating: 4.7,
      students: 9800,
      duration: '15 hours',
      progress: 30,
      enrolled: true,
      image: 'from-purple-500 to-pink-500',
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'Machine Learning A-Z',
      instructor: 'Dr. Emily Chen',
      category: 'Data Science',
      rating: 4.9,
      students: 18500,
      duration: '25 hours',
      progress: 0,
      enrolled: false,
      image: 'from-green-500 to-teal-500',
      level: 'Advanced',
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy',
      instructor: 'Alex Brown',
      category: 'Marketing',
      rating: 4.6,
      students: 7200,
      duration: '10 hours',
      progress: 100,
      enrolled: true,
      image: 'from-orange-500 to-red-500',
      level: 'Beginner',
    },
    {
      id: 6,
      title: 'C++ Complete Course',
      instructor: 'Robert Smith',
      category: 'Programming',
      rating: 4.7,
      students: 13000,
      duration: '20 hours',
      progress: 45,
      enrolled: true,
      image: 'from-indigo-600 to-purple-600',
      level: 'Intermediate',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Explore Courses</h1>
        <p className="text-gray-400">Discover and enroll in courses to expand your knowledge</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search courses..."
            className="pl-10 bg-[#1A1A2E] border-white/10 text-white placeholder:text-gray-500 h-12"
          />
        </div>
        <Button className="bg-[#1A1A2E] border border-white/10 text-white hover:bg-white/10 h-12 px-6">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
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

      {/* My Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">My Courses</h2>
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allCourses
            .filter((course) => course.enrolled)
            .map((course) => (
              <div
                key={course.id}
                className="bg-[#1A1A2E] rounded-2xl overflow-hidden border border-white/10 hover:border-[#5B5FFF]/50 transition-all group cursor-pointer"
              >
                <div className={`h-40 bg-gradient-to-br ${course.image} relative flex items-center justify-center`}>
                  <BookOpen className="w-16 h-16 text-white/90" />
                  {course.progress === 100 && (
                    <div className="absolute top-3 right-3 bg-[#4ECB71] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <Badge className="bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30 text-xs mb-3">
                    {course.category}
                  </Badge>
                  <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-[#5B5FFF] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{course.instructor}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{(course.students / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {course.progress > 0 && course.progress < 100 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <Button className="w-full bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                    <Play className="w-4 h-4 mr-2" />
                    {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start Learning'}
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* All Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">Browse All Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#1A1A2E] rounded-2xl overflow-hidden border border-white/10 hover:border-[#5B5FFF]/50 transition-all group cursor-pointer"
            >
              <div className={`h-40 bg-gradient-to-br ${course.image} relative flex items-center justify-center`}>
                <BookOpen className="w-16 h-16 text-white/90" />
                <Badge className="absolute top-3 left-3 bg-white/20 text-white border-0 text-xs backdrop-blur-sm">
                  {course.level}
                </Badge>
              </div>
              <div className="p-5">
                <Badge className="bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30 text-xs mb-3">
                  {course.category}
                </Badge>
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-[#5B5FFF] transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{course.instructor}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{(course.students / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <Button
                  className={`w-full ${
                    course.enrolled
                      ? 'bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white'
                      : 'bg-white hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  {course.enrolled ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    'Enroll Now'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
