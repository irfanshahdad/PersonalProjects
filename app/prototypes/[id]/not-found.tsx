export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404 - Prototype Not Found
        </h1>
        <a
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Hub
        </a>
      </div>
    </div>
  );
}

