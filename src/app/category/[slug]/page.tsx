// src/app/category/[slug]/page.tsx

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Capitalize the first letter and replace hyphens with spaces for a clean title
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          {categoryName}
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Posts in this category are coming soon. Check back later!
        </p>
      </div>
    </main>
  );
}
