import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about FinAid Hub and our mission to help you achieve financial stability.",
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          About FinAid Hub
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your trusted guide to financial stability.
        </p>
      </div>
      <div className="mt-12 md:mt-16 prose prose-lg dark:prose-invert mx-auto">
        <p>
          Navigating the world of financial assistance programs and personal savings can be overwhelming. At FinAid Hub, we're here to simplify it for you. Our mission is to provide clear, concise, and up-to-date information to help you make informed decisions about your financial future.
        </p>
        <p>
          Our team of experts is dedicated to researching and writing about a wide range of financial topics, from government assistance programs to debt management and investment strategies. We believe that everyone deserves access to the information they need to achieve financial stability, and we're committed to making that a reality.
        </p>
        <p>
          Thank you for visiting FinAid Hub. We're glad you're here, and we look forward to helping you on your journey to financial freedom.
        </p>
      </div>
    </main>
  );
}
