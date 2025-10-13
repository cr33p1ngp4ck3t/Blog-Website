/**
 * A simple, clean footer component for the website.
 */
export default function Footer() {
	return (
		<footer className="w-full mt-20 border-t border-gray-200 dark:border-gray-800">
			<div className="max-w-5xl mx-auto py-6 px-6 text-center text-gray-500">
				<p>&copy; {new Date().getFullYear()} FinAid Hub. All Rights Reserved.</p>
			</div>
		</footer>
	);
}
