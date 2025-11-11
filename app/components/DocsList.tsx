'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Doc {
  id: string;
  title: string;
  content: string;
}

interface DocsListProps {
  darkMode: boolean;
}

export default function DocsList({ darkMode }: DocsListProps) {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    // Load docs from localStorage
    const savedDocs = localStorage.getItem('docs');
    if (savedDocs) {
      const parsedDocs = JSON.parse(savedDocs);
      setDocs(parsedDocs);
    }
  }, []);

  const createNewDoc = () => {
    const newDoc: Doc = {
      id: Date.now().toString(),
      title: `New Doc ${docs.length + 1}`,
      content: '# New Document\n\nStart writing...',
    };
    const updatedDocs = [...docs, newDoc];
    setDocs(updatedDocs);
    localStorage.setItem('docs', JSON.stringify(updatedDocs));
  };

  const deleteDoc = (id: string) => {
    const updatedDocs = docs.filter((doc) => doc.id !== id);
    setDocs(updatedDocs);
    localStorage.setItem('docs', JSON.stringify(updatedDocs));
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Documents</h2>
        <button
          onClick={createNewDoc}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span>+</span>
          <span>New Doc</span>
        </button>
      </div>

      {/* Instructions Box */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>How it works:</strong> Click "New Doc" to create a markdown document. Files are stored in <code className="bg-blue-100 dark:bg-blue-800 px-1.5 py-0.5 rounded text-xs font-mono">docs/</code> and can be edited directly in the browser with live preview. Perfect for PRDs, notes, and documentation.
        </p>
      </div>

      {/* Document List */}
      <div className="space-y-2">
        {docs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No documents yet.</p>
          </div>
        ) : (
          docs.map((doc) => (
            <div
              key={doc.id}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-800 flex items-center justify-between"
            >
              <Link
                href={`/docs/${doc.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {doc.title.toLowerCase()}
              </Link>
              <button
                onClick={() => deleteDoc(doc.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                aria-label="Delete document"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

