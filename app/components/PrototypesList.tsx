'use client';

import Link from 'next/link';
import { getPrototypes } from '../prototypes-registry';

interface PrototypesListProps {
  darkMode: boolean;
}

export default function PrototypesList({ darkMode }: PrototypesListProps) {
  const prototypes = getPrototypes();

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Prototypes</h2>

      {/* Instructions Box */}
      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">How it works:</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Create routes manually in your code editor. Any directory you create in <code className="bg-green-100 dark:bg-green-800 px-1.5 py-0.5 rounded text-xs font-mono">app/prototypes/</code> with a <code className="bg-green-100 dark:bg-green-800 px-1.5 py-0.5 rounded text-xs font-mono">page.tsx</code> file will automatically appear here.
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Example:</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Create <code className="bg-green-100 dark:bg-green-800 px-1.5 py-0.5 rounded text-xs font-mono">app/prototypes/my-demo/page.tsx</code> and it will show up as a clickable link. Share the URL with colleagues!
        </p>
      </div>

      {/* Prototypes List */}
      {prototypes.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p className="mb-2">No prototypes yet.</p>
          <p className="text-sm">
            Create a directory like <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono">app/prototypes/my-prototype/</code> with a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono">page.tsx</code> file.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {prototypes.map((prototype) => (
            <Link
              key={prototype.id}
              href={`/prototypes/${prototype.id}`}
              className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {prototype.name}
                  </h3>
                  {prototype.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {prototype.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    /prototypes/{prototype.id}
                  </p>
                </div>
                <span className="text-blue-600 dark:text-blue-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

