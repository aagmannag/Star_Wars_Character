"use client"

import React, { useState } from "react"
import type { Character } from "../types/character"
import { getRandomCharacterImage } from "../services/api"
import { getSpeciesColor } from "../utils/colors"

interface CharacterCardProps {
  character: Character
  onClick: () => void
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const bgColor = getSpeciesColor(character.species)
  const imageId = character.url.match(/\/(\d+)\//)?.[1] || "1"
  const imageUrl = getRandomCharacterImage(imageId)

  const handleImageError = () => setImageError(true)

  return (
    <button
      onClick={onClick}
      className="group relative bg-secondary border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
      aria-label={`View details for ${character.name}`}
    >
      <div className="w-full h-48 md:h-56 flex items-center justify-center overflow-hidden relative">
        {/* ✅ Show only this static image while loading */}
        {!imageLoaded && !imageError && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1584830452660-3f106d332c5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=876')",
            }}
          />
        )}

        {/* ✅ Main Character Image */}
        <img
          src={imageUrl || "/placeholder.svg?height=224&width=300"}
          alt={character.name}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />

        {/* ✅ Remove all orange/pulse animations */}
        {/* ❌ No background-color, no pulse, no fallback color */}

        {/* Error Fallback */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/40">
            <div className="text-center text-white">
              <svg
                className="w-12 h-12 text-white/70 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-white/70">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
      </div>

      <div className="p-4 md:p-6 space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {character.name}
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted font-medium">Height</span>
            <span className="text-foreground font-semibold">{character.height} cm</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted font-medium">Mass</span>
            <span className="text-foreground font-semibold">{character.mass} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted font-medium">Birth Year</span>
            <span className="text-foreground font-semibold">{character.birth_year}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border mt-4">
          <div className="text-primary text-sm font-semibold flex items-center justify-between group-hover:gap-2 transition-all duration-300">
            <span>View Full Profile</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  )
}
