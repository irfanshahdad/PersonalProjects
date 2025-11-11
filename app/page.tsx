'use client';

import { useState, useEffect } from 'react';
import DocsList from './components/DocsList';
import PrototypesList from './components/PrototypesList';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 text-gray-900'}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Cursor Glow Effect */}
      <div 
        className="fixed w-96 h-96 rounded-full opacity-10 dark:opacity-5 pointer-events-none transition-opacity duration-300"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          background: darkMode 
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="mb-16 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <button
                onClick={toggleTheme}
                className="relative p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 hover:scale-110 hover:shadow-lg transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500"
                aria-label="Toggle theme"
              >
                <span className="text-2xl">{darkMode ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 animate-gradient-x">
            Irfan's Personal AI Hub
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            Your intelligent workspace for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-lg sm:text-xl">
            <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              📚 Documentation
            </span>
            <span className="text-gray-400 dark:text-gray-600">×</span>
            <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              🚀 Prototypes
            </span>
            <span className="text-gray-400 dark:text-gray-600">×</span>
            <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              ✨ Innovation
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 animate-slide-up">
          {/* Left Column - Documents */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <DocsList darkMode={darkMode} />
            </div>
          </div>
          
          {/* Right Column - Prototypes */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <PrototypesList darkMode={darkMode} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-in animation-delay-1000">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Built with Next.js, React, and Tailwind CSS
          </p>
        </div>
      </main>
    </div>
  );
}
