import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read our terms of service.",
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Terms of Service
        </h1>
      </div>
      <div className="mt-12 md:mt-16 prose prose-lg dark:prose-invert mx-auto">
        <p>
          This is a placeholder for the terms of service.
        </p>
      </div>
    </main>
  );
}
