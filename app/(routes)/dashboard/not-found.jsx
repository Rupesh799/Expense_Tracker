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
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-20" />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full animate-bounce delay-100" />
          <div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-200 rounded-full animate-bounce delay-300" />
          <div className="absolute -bottom-4 left-1/3 w-4 h-4 bg-pink-200 rounded-full animate-bounce delay-500" />

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

        {/* Helpful suggestions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            What can you do now?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Search className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">
                Try searching for what you need
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Home className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">Visit our homepage</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <HelpCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
              <span className="text-gray-700">Check our help center</span>
            </div>
          </div>
        </div>

        {/* Fun illustration */}
        <div className="mt-12">
          <div className="relative w-64 h-32 mx-auto">
            {/* Simple illustration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-50 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce delay-200" />
            </div>
            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-pink-300 rounded-full animate-ping delay-1000" />
            <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-yellow-300 rounded-full animate-ping delay-1500" />
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Lost in the digital cosmos? We'll help you find your way back!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
