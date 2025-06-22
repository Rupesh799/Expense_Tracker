import Image from "next/image";
import React from "react";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 -z-10" />

      <div className="max-w-7xl  mx-auto px-4 py-16 lg:py-24 ">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Smart Financial Management
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Track Every
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                  Penny
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">
                Master Your Finances
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2lg">
              Transform your financial life with our intuitive expense tracking
              platform. Monitor income, categorize expenses, and gain insights
              with a beautiful, seamless dashboard designed for modern financial
              management.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Smart Analytics
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Secure & Private
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              {/* <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105"
              >
                View Demo
              </a> */}
            </div>

            {/* Social proof */}
            <div className="pt-8 text-center lg:text-left">
              <p className="text-sm text-gray-500 mb-3">
                Trusted by thousands of users worldwide
              </p>
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    10k+ Happy Users
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

            {/* Main image container */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 hover:shadow-3xl transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5"></div>
              <Image
                src="/dashboard.png"
                alt="Financial Dashboard Preview"
                width={700}
                height={500}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                priority
              />

              {/* Floating stats card */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Live Updates
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
