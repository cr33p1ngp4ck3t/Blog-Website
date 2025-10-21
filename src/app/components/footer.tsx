import Link from 'next/link';

/**
 * A simple, clean footer component for the website.
 */
export default function Footer() {
	return (
		<footer className="w-full mt-20 border-t border-gray-200 dark:border-gray-800">
			<div className="max-w-5xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Us</h3>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Your trusted guide to financial stability.
					</p>
					<div className="mt-4">
						<Link href="/about" className="text-blue-600 hover:underline">Read More</Link>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
					<ul className="mt-2 space-y-2">
						<li>
							<Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:underline">Contact Us</Link>
						</li>
						<li>
							<Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:underline">Privacy Policy</Link>
						</li>
						<li>
							<Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:underline">Terms of Service</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscribe to our Newsletter</h3>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Get the latest financial tips and updates delivered to your inbox.
					</p>
					<form action="mailto:your-email@example.com" method="post" encType="text/plain" className="mt-4 flex">
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Subscribe
						</button>
					</form>
				</div>
			</div>
			<div className="max-w-5xl mx-auto py-6 px-6 text-center text-gray-500 border-t border-gray-200 dark:border-gray-800">
				<p>&copy; {new Date().getFullYear()} FinAid Hub. All Rights Reserved.</p>
			</div>
		</footer>
	);
}
