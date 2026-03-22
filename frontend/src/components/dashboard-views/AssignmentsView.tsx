import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  FileText,
  Calendar,
  Clock,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';

export function AssignmentsView() {
  const [filter, setFilter] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'C++ Assignment 2: Object-Oriented Programming',
      course: 'C++ Programming',
      dueDate: '2024-07-22',
      dueTime: '6:00 PM',
      status: 'pending',
      priority: 'high',
      totalMarks: 100,
      description: 'Create a class hierarchy for a library management system',
      submitted: false,
    },
    {
      id: 2,
      title: 'React Component Design',
      course: 'Advanced React & TypeScript',
      dueDate: '2024-07-25',
      dueTime: '11:59 PM',
      status: 'pending',
      priority: 'medium',
      totalMarks: 50,
      description: 'Build a reusable component library with TypeScript',
      submitted: false,
    },
    {
      id: 3,
      title: 'Data Structures Quiz',
      course: 'Python for Beginners',
      dueDate: '2024-07-18',
      dueTime: '3:00 PM',
      status: 'overdue',
      priority: 'high',
      totalMarks: 30,
      description: 'Complete quiz on arrays, linked lists, and stacks',
      submitted: false,
    },
    {
      id: 4,
      title: 'UI/UX Case Study',
      course: 'UI/UX Design Masterclass',
      dueDate: '2024-07-15',
      dueTime: '5:00 PM',
      status: 'submitted',
      priority: 'medium',
      totalMarks: 80,
      score: 72,
      description: 'Redesign a mobile app interface with user research',
      submitted: true,
      submittedDate: '2024-07-14',
    },
    {
      id: 5,
      title: 'Machine Learning Model Training',
      course: 'Machine Learning A-Z',
      dueDate: '2024-08-01',
      dueTime: '11:59 PM',
      status: 'pending',
      priority: 'low',
      totalMarks: 100,
      description: 'Train and evaluate a classification model on the provided dataset',
      submitted: false,
    },
    {
      id: 6,
      title: 'Marketing Campaign Analysis',
      course: 'Digital Marketing Strategy',
      dueDate: '2024-07-10',
      dueTime: '2:00 PM',
      status: 'graded',
      priority: 'medium',
      totalMarks: 60,
      score: 58,
      description: 'Analyze the effectiveness of a recent marketing campaign',
      submitted: true,
      submittedDate: '2024-07-09',
    },
  ];

  const filteredAssignments =
    filter === 'all' ? assignments : assignments.filter((a) => a.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#5B5FFF]/20 text-[#5B5FFF] border-[#5B5FFF]/30';
      case 'overdue':
        return 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30';
      case 'submitted':
        return 'bg-[#FFB547]/20 text-[#FFB547] border-[#FFB547]/30';
      case 'graded':
        return 'bg-[#4ECB71]/20 text-[#4ECB71] border-[#4ECB71]/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-[#FF6B6B]';
      case 'medium':
        return 'text-[#FFB547]';
      case 'low':
        return 'text-[#4ECB71]';
      default:
        return 'text-gray-400';
    }
  };

  const stats = {
    pending: assignments.filter((a) => a.status === 'pending').length,
    overdue: assignments.filter((a) => a.status === 'overdue').length,
    submitted: assignments.filter((a) => a.status === 'submitted').length,
    graded: assignments.filter((a) => a.status === 'graded').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Assignments</h1>
        <p className="text-gray-400">Manage and track your course assignments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-[#5B5FFF]" />
            <span className="text-3xl font-bold text-white">{stats.pending}</span>
          </div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-[#FF6B6B]" />
            <span className="text-3xl font-bold text-white">{stats.overdue}</span>
          </div>
          <div className="text-sm text-gray-400">Overdue</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Upload className="w-8 h-8 text-[#FFB547]" />
            <span className="text-3xl font-bold text-white">{stats.submitted}</span>
          </div>
          <div className="text-sm text-gray-400">Submitted</div>
        </div>

        <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-[#4ECB71]" />
            <span className="text-3xl font-bold text-white">{stats.graded}</span>
          </div>
          <div className="text-sm text-gray-400">Graded</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'all'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          All Assignments
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'pending'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('overdue')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'overdue'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Overdue
        </button>
        <button
          onClick={() => setFilter('submitted')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'submitted'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Submitted
        </button>
        <button
          onClick={() => setFilter('graded')}
          className={`px-5 py-2 rounded-xl transition-all ${
            filter === 'graded'
              ? 'bg-[#5B5FFF] text-white'
              : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          Graded
        </button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-[#1A1A2E] rounded-2xl p-6 border border-white/10 hover:border-[#5B5FFF]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className={`w-5 h-5 ${getPriorityColor(assignment.priority)}`} />
                  <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">{assignment.course}</p>
                <p className="text-sm text-gray-300 mb-4">{assignment.description}</p>
              </div>
              <Badge className={getStatusColor(assignment.status)}>
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {assignment.dueDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{assignment.dueTime}</span>
                </div>
                <div>
                  <span className="font-semibold text-white">{assignment.totalMarks}</span> marks
                </div>
                {assignment.score !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#4ECB71] font-semibold">Score: {assignment.score}/{assignment.totalMarks}</span>
                    <span className="text-gray-500">({Math.round((assignment.score / assignment.totalMarks) * 100)}%)</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {assignment.submitted ? (
                  <>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {assignment.status === 'submitted' && (
                      <Button className="bg-white/10 hover:bg-white/20 text-white">
                        View Submission
                      </Button>
                    )}
                  </>
                ) : (
                  <Button className="bg-[#5B5FFF] hover:bg-[#4B4FEF] text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="bg-[#1A1A2E] rounded-2xl p-12 border border-white/10 text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No assignments found</h3>
          <p className="text-gray-400">
            {filter === 'all'
              ? 'You have no assignments at the moment'
              : `No ${filter} assignments to display`}
          </p>
        </div>
      )}
    </div>
  );
}
