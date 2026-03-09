const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <a href="/" className="text-blue-600 hover:text-blue-800 underline">
            Go back to home
          </a>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
