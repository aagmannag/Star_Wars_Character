"use client"

import React from "react"
import { useState, useMemo } from "react"
import { useCharacters } from "../hooks/useCharacters"
import type { Character } from "../types/character"
import type { ActiveFilters, FilterOptions } from "../types/filters"
import CharacterCard from "./CharacterCard"
import CharacterModal from "./CharacterModal"
import LoadingState from "./LoadingState"
import ErrorState from "./ErrorState"
import Pagination from "./Pagination"
import FilterPanel from "./FilterPanel"
import { applyFiltersAndSearch, extractFilterOptions } from "../utils/filterUtils"

interface CharacterListProps {
  searchQuery: string
  filters: ActiveFilters
  onFiltersChange: (filters: ActiveFilters) => void
  onClearFilters: () => void
}

export default function CharacterList({
  searchQuery = "",
  filters,
  onFiltersChange,
  onClearFilters,
}: CharacterListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const { characters, loading, error, totalPages, retry } = useCharacters(currentPage)

  const filterOptions: FilterOptions = useMemo(() => {
    return extractFilterOptions(characters)
  }, [characters])

  const filteredCharacters = useMemo(() => {
    return applyFiltersAndSearch(characters, searchQuery, filters)
  }, [characters, searchQuery, filters])

  const handleFilterChange = (newFilters: ActiveFilters) => {
    setCurrentPage(1)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    setCurrentPage(1)
    onClearFilters()
  }

  if (error) {
    return <ErrorState error={error} onRetry={retry} />
  }

  const isSearching = searchQuery.trim().length > 0
  const isFiltering = Object.values(filters).some((f) => f !== null)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {!loading && (
        <FilterPanel
          options={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      )}

      {loading ? (
        <LoadingState />
      ) : filteredCharacters.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-2">
            {isSearching || isFiltering ? "No characters match your search or filters" : "No characters found"}
          </p>
          {(isSearching || isFiltering) && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-accent hover:text-accent/80 transition-colors mt-2"
            >
              Clear filters to see more results
            </button>
          )}
        </div>
      ) : (
        <>
          {(isSearching || isFiltering) && (
            <div className="bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 mb-4 text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredCharacters.length}</span> character
              {filteredCharacters.length !== 1 ? "s" : ""} matching your criteria
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.url}
                character={character}
                onClick={() => setSelectedCharacter(character)}
              />
            ))}
          </div>

          {!isSearching && !isFiltering && (
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </>
      )}

      {selectedCharacter && <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />}
    </main>
  )
}
