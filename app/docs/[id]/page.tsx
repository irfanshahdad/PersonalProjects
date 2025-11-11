'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface Doc {
  id: string;
  title: string;
  content: string;
  filename?: string;
}

export default function DocPage() {
  const params = useParams();
  const docId = params?.id as string;
  const [doc, setDoc] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!docId) return;

    const loadDoc = async () => {
      try {
        const response = await fetch(`/api/docs/${docId}`);
        if (!response.ok) {
          throw new Error('Document not found');
        }
        const data = await response.json();
        setDoc(data);
        setEditContent(data.content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    loadDoc();
  }, [docId]);

  useEffect(() => {
    if (doc && editContent !== doc.content) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [editContent, doc]);

  const handleSave = async () => {
    if (!doc || !doc.filename) {
      // Can't save localStorage docs to file system
      setSaveMessage('Cannot save localStorage documents to file system');
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch(`/api/docs/${docId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save document');
      }

      const data = await response.json();
      setDoc(data);
      setHasChanges(false);
      setSaveMessage('Document saved successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : 'Failed to save document');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (doc) {
      setEditContent(doc.content);
      setHasChanges(false);
    }
    setIsEditing(false);
    setSaveMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Document not found'}</p>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {doc.title}
              </h1>
              {doc.filename && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  File: {doc.filename}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {saveMessage && (
                <span className={`text-sm px-3 py-1 rounded ${
                  saveMessage.includes('success') 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {saveMessage}
                </span>
              )}
              {!isEditing ? (
                doc.filename ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (localStorage doc - cannot edit)
                  </span>
                )
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || !hasChanges}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          {isEditing ? (
            <div className="flex h-[calc(100vh-250px)]">
              {/* Editor */}
              <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
                <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
                  <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Editor</h3>
                </div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 p-6 border-none outline-none resize-none font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Write your markdown here..."
                />
              </div>
              {/* Preview */}
              <div className="flex-1 flex flex-col overflow-auto">
                <div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
                  <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Preview</h3>
                </div>
                <div className="flex-1 p-6 overflow-auto prose max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {editContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {doc.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

