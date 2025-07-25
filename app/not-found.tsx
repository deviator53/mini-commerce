export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Homepage
      </a>
    </div>
  );
}
