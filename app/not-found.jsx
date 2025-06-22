"use client";
import React from "react";
import { Home, ArrowLeft, Search, HelpCircle, RefreshCw } from "lucide-react";

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="relative max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          {/* Floating elements */}

          {/* Main 404 text */}
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            404
          </h1>

          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content */}
        <div className="space-y-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital wilderness. Don't worry, even the best explorers sometimes
            take a wrong turn!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button
            onClick={() => (window.location.href = "/")}
            className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Home className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            Go Home
          </button>

          <button
            onClick={handleGoBack}
            className="group flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>

          <button
            onClick={handleRefresh}
            className="group flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
