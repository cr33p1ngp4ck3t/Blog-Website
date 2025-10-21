import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
      </div>
      <div className="mt-12 md:mt-16 prose prose-lg dark:prose-invert mx-auto">
        <p>
          This is a placeholder for the privacy policy.
        </p>
      </div>
    </main>
  );
}
