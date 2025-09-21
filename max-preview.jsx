import React, { useState, useEffect } from 'react';
import { Upload, Check, X, BookOpen, Lightbulb, Target, Users, Briefcase, Trophy, Settings, Save, AlertCircle } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTips, setShowTips] = useState(false);
  const [savedResumes, setSavedResumes] = useState([]);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [currentResume, setCurrentResume] = useState(null);

  // Mock resume data
  const [resumeAnalysis, setResumeAnalysis] = useState([
    {
      id: 1,
      title: "Software Engineer Resume",
      match: 87,
      missingSkills: ["React.js", "AWS", "JavaScript", "Python", "SQL"],
      status: "improvement",
      content: "John Doe\nSenior Software Engineer\n5+ years experience...",
      lastModified: new Date().toLocaleDateString()
    },
    {
      id: 2,
      title: "Product Manager Resume",
      match: 65,
      missingSkills: ["Agile", "JIRA", "Product Strategy", "Market Research", "SQL"],
      status: "needs_improvement",
      content: "John Doe\nProduct Manager\n3+ years experience...",
      lastModified: new Date().toLocaleDateString()
    }
  ]);

  const jobMatches = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      salary: "$120,000 - $150,000 / year",
      match: 92,
      posted: "2 days ago",
      image: "https://placehold.co/40x40/3b82f6/ffffff?text=SE"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "WebSolutions LLC",
      location: "New York, NY (Hybrid)",
      salary: "$90,000 - $110,000 / year",
      match: 85,
      posted: "1 week ago",
      image: "https://placehold.co/40x40/ef4444/ffffff?text=FD"
    },
    {
      id: 3,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Boston, MA (On-site)",
      salary: "$110,000 - $130,000 / year",
      match: 78,
      posted: "3 days ago",
      image: "https://placehold.co/40x40/10b981/ffffff?text=PM"
    }
  ];

  const resumeTips = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Tailor Your Resume",
      description: "Customize your resume for each job application. Use keywords from the job description and highlight relevant experiences."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Quantify Achievements",
      description: "Use numbers to demonstrate impact. Instead of 'Improved efficiency,' say 'Increased efficiency by 30% through process optimization.'"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Use Action Verbs",
      description: "Start bullet points with strong action verbs like 'Led,' 'Developed,' 'Optimized,' or 'Implemented' to showcase leadership and initiative."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Highlight Relevant Skills",
      description: "Include both technical and soft skills that match the job requirements. Place them in a dedicated skills section for easy scanning."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Keep It Concise",
      description: "Limit your resume to one page if you have less than 10 years of experience. Two pages are acceptable for senior roles."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Showcase Results",
      description: "Focus on outcomes rather than just responsibilities. Employers want to know what you've accomplished, not just what you've done."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Optimize for ATS",
      description: "Use standard section headings and avoid graphics, columns, or tables that might confuse applicant tracking systems."
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Proofread Carefully",
      description: "Ensure there are no spelling or grammar errors. Ask someone else to review it before submitting."
    }
  ];

  // Load saved resumes from state (in a real app, this would be from localStorage or API)
  useEffect(() => {
    // This is mock data since we can't use localStorage
    const mockSavedResumes = [
      { id: 1, name: "Software Engineer Resume", lastSaved: new Date().toLocaleString() },
      { id: 2, name: "Product Manager Resume", lastSaved: new Date().toLocaleString() }
    ];
    setSavedResumes(mockSavedResumes);
  }, []);

  const handleUploadResume = () => {
    // Mock upload functionality
    alert("Resume uploaded successfully! Analysis will be available shortly.");
  };

  const handleSaveResume = (resumeId) => {
    // In a real app, this would save to localStorage or send to a server
    // Here we're just showing a notification since actual saving isn't possible
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
    
    // Update the last modified date for the resume
    setResumeAnalysis(prev => prev.map(resume => 
      resume.id === resumeId 
        ? { ...resume, lastModified: new Date().toLocaleDateString() }
        : resume
    ));
  };

  const handleEditResume = (resumeId) => {
    const resume = resumeAnalysis.find(r => r.id === resumeId);
    setCurrentResume(resume);
    setActiveTab('editor');
  };

  // Resume Editor Component
  const ResumeEditor = () => {
    const [resumeContent, setResumeContent] = useState(currentResume?.content || '');

    const handleContentChange = (e) => {
      setResumeContent(e.target.value);
    };

    const handleSaveChanges = () => {
      // In a real app, this would save the changes
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
      
      // Update the resume in our state
      setResumeAnalysis(prev => prev.map(resume => 
        resume.id === currentResume.id 
          ? { ...resume, content: resumeContent, lastModified: new Date().toLocaleDateString() }
          : resume
      ));
    };

    if (!currentResume) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Edit Resume: {currentResume.title}</h3>
          <div className="flex space-x-3">
            <button
              onClick={handleSaveChanges}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Modified: {currentResume.lastModified}</label>
        </div>

        <textarea
          value={resumeContent}
          onChange={handleContentChange}
          className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          placeholder="Edit your resume content here..."
        />

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Character count: {resumeContent.length}
          </div>
          <button
            onClick={handleSaveChanges}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Resume</span>
          </button>
        </div>
      </div>
    );
  };

  // Save Notification Component
  const SaveNotification = () => {
    if (!showSaveNotification) return null;

    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
        <Check className="w-5 h-5" />
        <span>Resume saved successfully!</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">RelevAI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h4v-2a4 4 0 00-8 0v2h4m-4 0h4m-4 0V9.43a2 2 0 012-2h2a2 2 0 012 2V17m-4 0V7m4 0V7" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/32x32/6366f1/ffffff?text=JD" alt="User" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium text-gray-700">John Doe</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-sm rounded-lg p-4 mb-6 md:mb-0">
            <nav className="space-y-2">
              {[
                { name: 'Dashboard', icon: 'home', active: activeTab === 'dashboard' },
                { name: 'My Resumes', icon: 'file', active: activeTab === 'resumes' },
                { name: 'Job Matches', icon: 'briefcase', active: activeTab === 'matches' },
                { name: 'Analytics', icon: 'chart', active: activeTab === 'analytics' },
                { name: 'Settings', icon: 'settings', active: activeTab === 'settings' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name.toLowerCase())}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    item.active 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon === 'home' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                    {item.icon === 'file' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                    {item.icon === 'briefcase' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
                    {item.icon === 'chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                    {item.icon === 'settings' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.638 2.296.07 2.572-1.065z" />}
                  </svg>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Resources</h3>
              <nav className="mt-2 space-y-2">
                {[
                  { name: 'Help Center', icon: 'help' },
                  { name: 'Contact Support', icon: 'email' },
                ].map((item) => (
                  <button
                    key={item.name}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'help' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 3.747.54 1.03 1.36 2.07 2.18 3.006-1.056.87-2.18 1.425-3.516 1.425-2.21 0-4-1.343-4-3 0-1.4 1.278-2.575 3.006-3.747-.54-1.03-1.36-2.07-2.18-3.006z" />}
                      {item.icon === 'email' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                    </svg>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-64">
            {activeTab === 'editor' ? (
              <ResumeEditor />
            ) : (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.12a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.12a1 1 0 00-1.175 0l-3.976 2.12c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.12c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Welcome back, John!</h2>
                      <p className="text-indigo-700 mt-1">You have 3 new job matches and 2 resume improvement suggestions.</p>
                    </div>
                  </div>
                </div>

                {/* Resume Analysis Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Your Resume Analysis</h3>
                    <button
                      onClick={handleUploadResume}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload New Resume</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {resumeAnalysis.map((resume, index) => (
                      <div key={resume.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">{resume.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            resume.match >= 80 ? 'bg-green-100 text-green-800' : 
                            resume.match >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {resume.match}% Match
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className={`h-2 rounded-full ${
                              resume.match >= 80 ? 'bg-green-500' : 
                              resume.match >= 60 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${resume.match}%` }}
                          ></div>
                        </div>

                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Missing Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {resume.missingSkills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button 
                            onClick={() => handleEditResume(resume.id)}
                            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 hover:bg-indigo-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit Resume</span>
                          </button>
                          <button 
                            onClick={() => handleSaveResume(resume.id)}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Resume</span>
                          </button>
                        </div>

                        <div className="mt-4 text-xs text-gray-500 text-center">
                          Last modified: {resume.lastModified}
                        </div>
                      </div>
                    ))}

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">Add New Resume</h4>
                        <p className="text-gray-600 text-sm">Upload a new resume to get personalized feedback and job matches.</p>
                        <button
                          onClick={handleUploadResume}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload Resume</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Matches Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Recommended Job Matches</h3>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View All</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobMatches.map((job) => (
                      <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <img src={job.image} alt={job.company} className="w-10 h-10 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{job.title}</h4>
                            <p className="text-gray-600 text-sm">{job.company}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.707 12.707a1 1 0 00-1.414 0l-3.95 3.95a1 1 0 001.414 1.414l3.95-3.95a1 1 0 000-1.414z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>{job.salary}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-indigo-600">{job.match}% Match</span>
                            <span className="text-xs text-gray-500">{job.posted}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-indigo-500"
                              style={{ width: `${job.match}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resume Tips Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">How to Build an Efficient Resume</h3>
                    <button
                      onClick={() => setShowTips(!showTips)}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1"
                    >
                      <span>{showTips ? 'Hide' : 'Show'} Tips</span>
                      <svg 
                        className={`w-4 h-4 transition-transform ${showTips ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {showTips && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resumeTips.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 text-indigo-600">
                              {tip.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                              <p className="text-gray-600 text-sm">{tip.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Save Notification */}
        <SaveNotification />
      </div>
    </div>
  );
};

export default App;