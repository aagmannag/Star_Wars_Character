"use client"

import React, { useEffect } from "react"
import type { Character } from "../types/character"
import { useHomeworld } from "../hooks/useHomeworld"
import { getCharacterDetailImage } from "../services/api"
import { formatDate } from "../utils/date"
import { getSpeciesColor } from "../utils/colors"

interface CharacterModalProps {
  character: Character
  onClose: () => void
}

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  const { homeworld, loading } = useHomeworld(character.homeworld)
  const imageId = character.url.match(/\/(\d+)\//)?.[1] || "1"
  const imageUrl = getCharacterDetailImage(imageId)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
        <div
          className="bg-secondary border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          style={{
            backgroundColor: "#EDEADE",
          }}
        >
          {/* Header */}
          <div
            className="p-6 md:p-8 flex justify-between items-start gap-4 sticky top-0 z-10 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1484824823018-c36f00489002?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870')",
            }}
          >
            <div className="flex-1 text-white drop-shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-black">{character.name}</h2>
            <p className="text-sm mt-1 text-black">Star Wars Character Details</p>

            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 transition-colors text-2xl font-bold p-1 hover:scale-125"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Character Image */}
              <div>
                <img
                  src={imageUrl || "/placeholder.svg?height=400&width=300"}
                  alt={character.name}
                  className="w-full rounded-lg border border-border object-cover"
                  loading="lazy"
                />
              </div>

              {/* Character Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
                    Physical Attributes
                  </h3>
                  <div className="space-y-2">
                    <DetailRow label="Height" value={`${character.height} cm`} />
                    <DetailRow label="Mass" value={`${character.mass} kg`} />
                    <DetailRow label="Birth Year" value={character.birth_year} />
                    <DetailRow label="Skin Color" value={character.skin_color} />
                    <DetailRow label="Hair Color" value={character.hair_color} />
                    <DetailRow label="Eye Color" value={character.eye_color} />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
                    Career
                  </h3>
                  <DetailRow label="Films" value={`${character.films.length} appearances`} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 border-b border-border pb-2">
                    Profile
                  </h3>
                  <DetailRow label="Added to Database" value={formatDate(character.created)} />
                </div>
              </div>
            </div>

            {/* Homeworld Section */}
            {loading ? (
              <div className="mt-8 pt-8 border-t border-border animate-pulse">
                <div className="h-6 bg-border rounded w-1/3 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-border rounded" />
                  ))}
                </div>
              </div>
            ) : homeworld ? (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Homeworld: {homeworld.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <DetailRow label="Terrain" value={homeworld.terrain} />
                  <DetailRow label="Climate" value={homeworld.climate} />
                  <DetailRow label="Population" value={homeworld.population} />
                  <DetailRow label="Diameter" value={`${homeworld.diameter} km`} />
                </div>
              </div>
            ) : null}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-8 w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-muted-foreground text-sm">{label}:</span>
      <span className="text-foreground font-medium text-right">{value || "N/A"}</span>
    </div>
  )
}
