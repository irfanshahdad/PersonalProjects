'use client';

export default function CardDemo() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Card Component Demo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
              {num}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Card {num}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This is a sample card component. You can customize it however you like!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

