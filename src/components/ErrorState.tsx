"use client"

import React from "react"
interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="bg-(--secondary) border border-red-500/30 rounded-lg p-8 md:p-12 text-center animate-in fade-in zoom-in">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-red-400 mb-3">Oops! Something went wrong</h2>
        <p className="text-(--muted) mb-2">{error}</p>
        <p className="text-(--muted) text-sm mb-6">
          Unable to load characters from the Star Wars API. Please try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-(--primary) hover:bg-(--primary-dark) text-(--background) font-bold py-3 px-6 rounded-lg transition-all hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  )
}
