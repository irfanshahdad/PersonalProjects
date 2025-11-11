'use client';

import { useState } from 'react';

export default function ButtonCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Button Counter
      </h2>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
      >
        Clicked {count} times
      </button>
      <button
        onClick={() => setCount(0)}
        className="ml-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold"
      >
        Reset
      </button>
    </div>
  );
}

