import { notFound } from 'next/navigation';
import { getPrototypes } from '../../prototypes-registry';
import Link from 'next/link';

export async function generateStaticParams() {
  const prototypes = getPrototypes();
  return prototypes.map((proto) => ({
    id: proto.id,
  }));
}

export default async function PrototypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prototypes = getPrototypes();
  const prototype = prototypes.find((p) => p.id === id);

  if (!prototype) {
    notFound();
  }

  const Component = prototype.component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block text-sm font-medium"
          >
            ← Back to Hub
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
            {prototype.name}
          </h1>
          {prototype.description && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {prototype.description}
            </p>
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
          <Component />
        </div>
      </div>
    </div>
  );
}

