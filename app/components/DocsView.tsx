'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Doc {
  id: string;
  title: string;
  content: string;
}

interface DocsViewProps {
  darkMode: boolean;
}

export default function DocsView({ darkMode }: DocsViewProps) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    // Load docs from localStorage
    const savedDocs = localStorage.getItem('docs');
    if (savedDocs) {
      const parsedDocs = JSON.parse(savedDocs);
      setDocs(parsedDocs);
      if (parsedDocs.length > 0) {
        setSelectedDoc(parsedDocs[0]);
      }
    } else {
      // Initialize with sample doc
      const sampleDoc: Doc = {
        id: '1',
        title: 'Welcome',
        content: `# Welcome to Personal Hub

This is your personal documentation hub. You can:

- Write markdown documents
- Organize your ideas and PRDs
- Keep everything in one place

## Features

- **Markdown Support**: Full markdown with GitHub Flavored Markdown
- **Live Preview**: See your changes in real-time
- **Local Storage**: All your docs are saved locally

Start editing this document or create a new one!`,
      };
      setDocs([sampleDoc]);
      setSelectedDoc(sampleDoc);
      localStorage.setItem('docs', JSON.stringify([sampleDoc]));
    }
  }, []);

  useEffect(() => {
    if (selectedDoc) {
      setEditContent(selectedDoc.content);
    }
  }, [selectedDoc]);

  const saveDoc = () => {
    if (!selectedDoc) return;
    const updatedDocs = docs.map((doc) =>
      doc.id === selectedDoc.id ? { ...doc, content: editContent } : doc
    );
    setDocs(updatedDocs);
    setSelectedDoc({ ...selectedDoc, content: editContent });
    localStorage.setItem('docs', JSON.stringify(updatedDocs));
    setIsEditing(false);
  };

  const createNewDoc = () => {
    const newDoc: Doc = {
      id: Date.now().toString(),
      title: `New Doc ${docs.length + 1}`,
      content: '# New Document\n\nStart writing...',
    };
    const updatedDocs = [...docs, newDoc];
    setDocs(updatedDocs);
    setSelectedDoc(newDoc);
    setIsEditing(true);
    localStorage.setItem('docs', JSON.stringify(updatedDocs));
  };

  const deleteDoc = (id: string) => {
    const updatedDocs = docs.filter((doc) => doc.id !== id);
    setDocs(updatedDocs);
    if (selectedDoc?.id === id) {
      setSelectedDoc(updatedDocs.length > 0 ? updatedDocs[0] : null);
    }
    localStorage.setItem('docs', JSON.stringify(updatedDocs));
  };

  return (
    <div className="flex h-full">
      {/* Doc List */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 overflow-auto">
        <button
          onClick={createNewDoc}
          className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + New Doc
        </button>
        <div className="space-y-2">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className={`p-3 rounded-lg cursor-pointer border ${
                selectedDoc?.id === doc.id
                  ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent'
              }`}
              onClick={() => {
                setSelectedDoc(doc);
                setIsEditing(false);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium truncate">{doc.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDoc(doc.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="flex-1 flex">
        {selectedDoc ? (
          <>
            {isEditing ? (
              <div className="flex-1 flex flex-col">
                <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
                  <h2 className="font-semibold">{selectedDoc.title}</h2>
                  <div className="space-x-2">
                    <button
                      onClick={saveDoc}
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 p-4 border-none outline-none resize-none font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Write your markdown here..."
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
                  <h2 className="font-semibold">{selectedDoc.title}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex-1 p-6 overflow-auto prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {selectedDoc.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
            {/* Preview Pane */}
            {isEditing && (
              <div className="flex-1 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="border-b border-gray-200 dark:border-gray-700 p-2">
                  <h3 className="font-semibold">Preview</h3>
                </div>
                <div className="flex-1 p-6 overflow-auto prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {editContent}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            No document selected. Create a new one to get started!
          </div>
        )}
      </div>
    </div>
  );
}

