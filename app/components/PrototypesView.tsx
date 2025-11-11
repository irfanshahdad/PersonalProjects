'use client';

import Link from 'next/link';
import { getPrototypes } from '../prototypes-registry';

interface PrototypesViewProps {
  darkMode: boolean;
}

export default function PrototypesView({ darkMode }: PrototypesViewProps) {
  const prototypes = getPrototypes();

  return (
    <div className="h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Prototypes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Live React components you can share with colleagues and friends. Click on any prototype to view it.
          </p>
        </div>

        {prototypes.length === 0 ? (
          <div className="text-center py-12 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No prototypes yet. Create one by adding it to{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                app/prototypes-registry.tsx
              </code>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prototypes.map((prototype) => (
              <Link
                key={prototype.id}
                href={`/prototypes/${prototype.id}`}
                className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-800"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {prototype.name}
                </h3>
                {prototype.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {prototype.description}
                  </p>
                )}
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  View prototype →
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                  /prototypes/{prototype.id}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            💡 How to add a new prototype:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Create your React component in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">app/prototypes/components/</code></li>
            <li>Import it in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">app/prototypes-registry.tsx</code></li>
            <li>Add it to the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">getPrototypes()</code> array</li>
            <li>Share the URL: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/prototypes/your-id</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
