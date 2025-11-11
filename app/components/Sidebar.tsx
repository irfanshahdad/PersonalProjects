'use client';

import { ViewMode } from '../page';

interface SidebarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export default function Sidebar({ viewMode, setViewMode }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
      <nav className="space-y-2">
        <button
          onClick={() => setViewMode('docs')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'docs'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          📝 Docs
        </button>
        <button
          onClick={() => setViewMode('prototypes')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'prototypes'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          ⚙️ Prototypes
        </button>
      </nav>
    </aside>
  );
}

