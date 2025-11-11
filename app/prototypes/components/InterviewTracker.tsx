'use client';

import { useState, useEffect } from 'react';

interface Interview {
  id: string;
  company: string;
  jobTitle: string;
  date: string;
  time: string;
  timezone: string;
  type: 'virtual' | 'in-person';
  location: string; // meeting link or address
  round: string;
  status: 'upcoming' | 'completed' | 'archived';
  previousRounds?: string[];
}

const ROUND_OPTIONS = [
  'Phone Screen',
  'Technical Round',
  'Final Round',
  'HR Round',
  'Other'
];

const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Phoenix', label: 'Arizona Time (MST)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata', label: 'Mumbai (IST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
  { value: 'America/Toronto', label: 'Toronto (ET)' },
  { value: 'America/Vancouver', label: 'Vancouver (PT)' },
  { value: 'America/Mexico_City', label: 'Mexico City (CST)' },
  { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)' },
];

export default function InterviewTracker() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [viewMode, setViewMode] = useState<'date' | 'company'>('date');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Interview>>({
    company: '',
    jobTitle: '',
    date: '',
    time: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    type: 'virtual',
    location: '',
    round: ROUND_OPTIONS[0],
  });

  // Load interviews from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('interview-tracker-data');
    if (saved) {
      setInterviews(JSON.parse(saved));
    } else {
      // Sample data for demo
      const sampleInterviews: Interview[] = [
        {
          id: '1',
          company: 'TechCorp',
          jobTitle: 'Senior Software Engineer',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '10:00',
          timezone: 'America/New_York',
          type: 'virtual',
          location: 'https://zoom.us/j/123456789',
          round: 'Technical Round',
          status: 'upcoming',
          previousRounds: ['Phone Screen'],
        },
        {
          id: '2',
          company: 'ProductCorp',
          jobTitle: 'Product Manager',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '14:00',
          timezone: 'America/Los_Angeles',
          type: 'in-person',
          location: '123 Main St, San Francisco, CA 94102',
          round: 'Final Round',
          status: 'upcoming',
          previousRounds: ['Phone Screen', 'Technical Round'],
        },
      ];
      setInterviews(sampleInterviews);
      localStorage.setItem('interview-tracker-data', JSON.stringify(sampleInterviews));
    }
  }, []);

  // Save to localStorage whenever interviews change
  useEffect(() => {
    if (interviews.length > 0) {
      localStorage.setItem('interview-tracker-data', JSON.stringify(interviews));
    }
  }, [interviews]);

  const handleInputChange = (field: keyof Interview, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      company: '',
      jobTitle: '',
      date: '',
      time: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      type: 'virtual',
      location: '',
      round: ROUND_OPTIONS[0],
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.company || !formData.jobTitle || !formData.date || !formData.time || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      // Update existing interview
      setInterviews(interviews.map(int => 
        int.id === editingId 
          ? { ...int, ...formData as Interview }
          : int
      ));
    } else {
      // Add new interview
      const newInterview: Interview = {
        id: Date.now().toString(),
        company: formData.company!,
        jobTitle: formData.jobTitle!,
        date: formData.date!,
        time: formData.time!,
        timezone: formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
        type: formData.type!,
        location: formData.location!,
        round: formData.round!,
        status: 'upcoming',
        previousRounds: [],
      };
      setInterviews([...interviews, newInterview]);
    }
    resetForm();
  };

  const handleEdit = (interview: Interview) => {
    setFormData({
      company: interview.company,
      jobTitle: interview.jobTitle,
      date: interview.date,
      time: interview.time,
      timezone: interview.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      type: interview.type,
      location: interview.location,
      round: interview.round,
    });
    setEditingId(interview.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this interview?')) {
      setInterviews(interviews.filter(int => int.id !== id));
    }
  };

  const handleArchive = (id: string) => {
    setInterviews(interviews.map(int => 
      int.id === id ? { ...int, status: 'archived' } : int
    ));
  };

  const handlePassRound = (interview: Interview) => {
    const currentRoundIndex = ROUND_OPTIONS.indexOf(interview.round);
    if (currentRoundIndex < ROUND_OPTIONS.length - 1) {
      const nextRound = ROUND_OPTIONS[currentRoundIndex + 1];
      setInterviews(interviews.map(int => 
        int.id === interview.id 
          ? { 
              ...int, 
              round: nextRound,
              previousRounds: [...(int.previousRounds || []), int.round]
            }
          : int
      ));
    }
  };

  const upcomingInterviews = interviews.filter(int => int.status === 'upcoming');
  const archivedInterviews = interviews.filter(int => int.status === 'archived');

  // Group by company
  const interviewsByCompany = upcomingInterviews.reduce((acc, int) => {
    if (!acc[int.company]) {
      acc[int.company] = [];
    }
    acc[int.company].push(int);
    return acc;
  }, {} as Record<string, Interview[]>);

  // Sort interviews by date
  const sortedInterviews = [...upcomingInterviews].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Helper function to create a Date object representing a specific time in a specific timezone
  const createDateInTimezone = (year: number, month: number, day: number, hour: number, minute: number, timezone: string): Date => {
    // Use a more reliable approach: create date and adjust based on timezone offset
    // We'll find the UTC time that produces our target time when formatted in the timezone
    
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    // Start with a reasonable guess: the time as if it were UTC
    let candidate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    
    // Refine the candidate by checking what it formats to and adjusting
    for (let iteration = 0; iteration < 30; iteration++) {
      const parts = formatter.formatToParts(candidate);
      const formattedYear = parseInt(parts.find(p => p.type === 'year')?.value || '0');
      const formattedMonth = parseInt(parts.find(p => p.type === 'month')?.value || '0');
      const formattedDay = parseInt(parts.find(p => p.type === 'day')?.value || '0');
      const formattedHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
      const formattedMinute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
      
      // Check if we have a match
      if (formattedYear === year && formattedMonth === month && formattedDay === day && 
          formattedHour === hour && formattedMinute === minute) {
        return candidate;
      }
      
      // Calculate the difference in minutes
      const yearDiff = year - formattedYear;
      const monthDiff = month - formattedMonth;
      const dayDiff = day - formattedDay;
      const hourDiff = hour - formattedHour;
      const minuteDiff = minute - formattedMinute;
      
      // Convert difference to milliseconds
      const totalMinutesDiff = yearDiff * 365 * 24 * 60 +
                              monthDiff * 30 * 24 * 60 +
                              dayDiff * 24 * 60 +
                              hourDiff * 60 +
                              minuteDiff;
      
      // Adjust candidate
      candidate = new Date(candidate.getTime() + totalMinutesDiff * 60 * 1000);
      
      // Prevent infinite loops
      if (Math.abs(totalMinutesDiff) < 1) break;
    }
    
    return candidate;
  };

  const formatDateTime = (dateStr: string, timeStr: string, timezone?: string) => {
    try {
      const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      if (timezone && timezone !== localTZ) {
        // Parse date/time components
        const [year, month, day] = dateStr.split('-').map(Number);
        const [hour, minute] = timeStr.split(':').map(Number);
        
        // Create a Date object representing this time in the interview timezone
        const dateInInterviewTZ = createDateInTimezone(year, month, day, hour, minute, timezone);
        
        // Format this date in the browser's local timezone
        return dateInInterviewTZ.toLocaleString('en-US', {
          timeZone: localTZ,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        });
      } else {
        // Same timezone or no timezone specified, use local formatting
        const date = new Date(`${dateStr}T${timeStr}`);
        return date.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        });
      }
    } catch (e) {
      // Fallback if timezone conversion fails
      const date = new Date(`${dateStr}T${timeStr}`);
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  const getTimezoneLabel = (timezone?: string) => {
    if (!timezone) return '';
    const tzOption = TIMEZONE_OPTIONS.find(tz => tz.value === timezone);
    return tzOption ? tzOption.label : timezone;
  };

  const getLocalTimezoneLabel = () => {
    const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzOption = TIMEZONE_OPTIONS.find(tz => tz.value === localTZ);
    return tzOption ? tzOption.label : localTZ;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Interview Tracker
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {upcomingInterviews.length} upcoming interview{upcomingInterviews.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'date' ? 'company' : 'date')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            {viewMode === 'date' ? '📅 Date View' : '🏢 Company View'}
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <span>+</span>
            <span>Add Interview</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {editingId ? 'Edit Interview' : 'Add New Interview'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="TechCorp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.jobTitle || ''}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Senior Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time *
              </label>
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Timezone *
              </label>
              <select
                value={formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {TIMEZONE_OPTIONS.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Interview Type *
              </label>
              <select
                value={formData.type || 'virtual'}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="virtual">Virtual</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Round *
              </label>
              <select
                value={formData.round || ROUND_OPTIONS[0]}
                onChange={(e) => handleInputChange('round', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {ROUND_OPTIONS.map(round => (
                  <option key={round} value={round}>{round}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {formData.type === 'virtual' ? 'Meeting Link *' : 'Address *'}
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder={formData.type === 'virtual' ? 'https://zoom.us/j/...' : '123 Main St, City, State ZIP'}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {editingId ? 'Update' : 'Save'}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Interviews List */}
      {upcomingInterviews.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You don't have any upcoming interviews yet.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Your First Interview
          </button>
        </div>
      ) : viewMode === 'date' ? (
        <div className="space-y-4">
          {sortedInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {interview.company}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                      {interview.round}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {interview.jobTitle}
                  </p>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{formatDateTime(interview.date, interview.time, interview.timezone)}</span>
                    </div>
                    {interview.timezone && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                        <span>🌍</span>
                        <span>{getLocalTimezoneLabel()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span>{interview.type === 'virtual' ? '🔗' : '📍'}</span>
                      <span className={interview.type === 'virtual' ? 'text-blue-600 dark:text-blue-400 hover:underline' : ''}>
                        {interview.type === 'virtual' ? (
                          <a href={interview.location} target="_blank" rel="noopener noreferrer">
                            {interview.location}
                          </a>
                        ) : (
                          interview.location
                        )}
                      </span>
                    </div>
                    {interview.previousRounds && interview.previousRounds.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          Progress: {interview.previousRounds.map(r => `✓ ${r}`).join(' → ')} → {interview.round}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handlePassRound(interview)}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                    title="Pass"
                  >
                    ✓ Pass
                  </button>
                  <button
                    onClick={() => handleEdit(interview)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleArchive(interview.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                    title="Archive"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => handleDelete(interview.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(interviewsByCompany).map(([company, companyInterviews]) => (
            <div key={company} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {company}
              </h3>
              <div className="space-y-4">
                {companyInterviews
                  .sort((a, b) => {
                    const dateA = new Date(`${a.date}T${a.time}`);
                    const dateB = new Date(`${b.date}T${b.time}`);
                    return dateA.getTime() - dateB.getTime();
                  })
                  .map((interview) => (
                    <div
                      key={interview.id}
                      className="border-l-4 border-blue-500 pl-4 py-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {interview.jobTitle}
                            </span>
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                              {interview.round}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <div>{formatDateTime(interview.date, interview.time, interview.timezone)}</div>
                            {interview.timezone && (
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                🌍 {getLocalTimezoneLabel()}
                              </div>
                            )}
                            <div>
                              {interview.type === 'virtual' ? (
                                <a href={interview.location} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                  {interview.location}
                                </a>
                              ) : (
                                interview.location
                              )}
                            </div>
                            {interview.previousRounds && interview.previousRounds.length > 0 && (
                              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {interview.previousRounds.map(r => `✓ ${r}`).join(' → ')} → {interview.round}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-4">
                          <button
                            onClick={() => handlePassRound(interview)}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                            title="Pass"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => handleEdit(interview)}
                            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDelete(interview.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                            title="Delete"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Archived Interviews */}
      {archivedInterviews.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Archived Interviews ({archivedInterviews.length})
          </h3>
          <div className="space-y-2">
            {archivedInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 opacity-75"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {interview.company} - {interview.jobTitle}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(interview.date)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(interview.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

