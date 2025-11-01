import React from "react"

export default function LoadingState() {
  return (
    <div className="space-y-6">
      {/* Loading Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 rounded-lg overflow-hidden animate-pulse"
          >
            {/* Image Skeleton with Unsplash background */}
            <div
              className="w-full h-48 bg-center bg-cover relative"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1584830452660-3f106d332c5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=876')",
              }}
            >
              <div className="absolute inset-0 bg-black/20" /> {/* subtle overlay for contrast */}
            </div>

            {/* Content Skeleton */}
            <div className="p-4 md:p-6 space-y-3 bg-white">
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
                <div className="h-4 bg-gray-300 rounded w-4/5" />
              </div>
              <div className="pt-2 border-t border-gray-300">
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Text */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <span className="text-gray-600 ml-2">Loading characters...</span>
        </div>
      </div>
    </div>
  )
}
