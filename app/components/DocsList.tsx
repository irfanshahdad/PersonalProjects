'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Doc {
  id: string;
  title: string;
  content: string;
  filename?: string;
}

interface DocsListProps {
  darkMode: boolean;
}

export default function DocsList({ darkMode }: DocsListProps) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load docs from API (files in docs folder) and merge with localStorage docs
    const loadDocs = async () => {
      try {
        const response = await fetch('/api/docs');
        const data = await response.json();
        const fileBasedDocs = data.docs || [];
        
        // Also load localStorage docs (for backwards compatibility)
        const savedDocs = localStorage.getItem('docs');
        const localStorageDocs = savedDocs ? JSON.parse(savedDocs) : [];
        
        // Merge: file-based docs first, then localStorage docs (avoid duplicates)
        const fileBasedIds = new Set(fileBasedDocs.map((d: Doc) => d.id));
        const uniqueLocalDocs = localStorageDocs.filter((d: Doc) => !fileBasedIds.has(d.id));
        
        setDocs([...fileBasedDocs, ...uniqueLocalDocs]);
      } catch (error) {
        console.error('Error loading docs:', error);
        // Fallback to localStorage if API fails
        const savedDocs = localStorage.getItem('docs');
        if (savedDocs) {
          const parsedDocs = JSON.parse(savedDocs);
          setDocs(parsedDocs);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadDocs();
  }, []);

  const createNewDoc = () => {
    // Note: Creating new docs would require file system write access
    // For now, we'll use localStorage for new docs
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
    // Note: Deleting files would require file system write access
    // For now, we'll only delete from localStorage if it's a local doc
    const doc = docs.find(d => d.id === id);
    if (doc && !doc.filename) {
      // Only delete localStorage docs, not file-based docs
      const updatedDocs = docs.filter((doc) => doc.id !== id);
      setDocs(updatedDocs);
      localStorage.setItem('docs', JSON.stringify(updatedDocs));
    } else {
      // File-based docs can't be deleted from UI (would need API endpoint)
      alert('File-based documents cannot be deleted from the UI. Please delete the file manually from the docs folder.');
    }
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
        {loading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Loading documents...</p>
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No documents found in the docs folder.</p>
            <p className="text-sm mt-2">Add .md files to the docs/ folder to see them here.</p>
          </div>
        ) : (
          docs.map((doc) => (
            <div
              key={doc.id}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-800 flex items-center justify-between"
            >
              <Link
                href={`/docs/${doc.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex-1"
              >
                {doc.title}
              </Link>
              {!doc.filename && (
                <button
                  onClick={() => deleteDoc(doc.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-2"
                  aria-label="Delete document"
                >
                  ×
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

