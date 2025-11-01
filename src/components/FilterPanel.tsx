"use client"

import React from "react"
import { ChevronDown, Filter, X } from "lucide-react"
import { useState } from "react"
import type { FilterOptions, ActiveFilters } from "../types/filters"

interface FilterPanelProps {
  options: FilterOptions
  activeFilters: ActiveFilters
  onFilterChange: (filters: ActiveFilters) => void
  onClearFilters: () => void
}

export default function FilterPanel({ options, activeFilters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null)

  const toggleFilter = (filterName: string) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName)
  }

  const handleFilterSelect = (filterType: keyof ActiveFilters, value: string) => {
    onFilterChange({
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? null : value,
    })
  }

  const hasActiveFilters = Object.values(activeFilters).some((value) => value !== null)
  const activeFilterCount = Object.values(activeFilters).filter((v) => v !== null).length

  return (
    <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-lg p-4 md:p-6 mb-6 border border-border/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-accent" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
            aria-label="Clear all filters"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { key: "homeworld" as const, label: "Homeworld", options: options.homeworlds },
          { key: "species" as const, label: "Species", options: options.species },
          { key: "film" as const, label: "Film", options: options.films },
        ].map(({ key, label, options: filterOptions }) => (
          <div key={key} className="border border-border rounded-lg overflow-hidden bg-background/50">
            <button
              onClick={() => toggleFilter(key)}
              className="w-full flex items-center justify-between p-3 hover:bg-background transition-colors"
              aria-expanded={expandedFilter === key}
              aria-label={`Toggle ${label} filter`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{label}</span>
                {activeFilters[key] && (
                  <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">1</span>
                )}
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${expandedFilter === key ? "rotate-180" : ""}`}
              />
            </button>
            {expandedFilter === key && (
              <div className="bg-background border-t border-border p-3 max-h-48 overflow-y-auto space-y-2">
                {filterOptions.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No {label.toLowerCase()} available</p>
                ) : (
                  filterOptions.map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={activeFilters[key] === option}
                        onChange={() => handleFilterSelect(key, option)}
                        className="w-4 h-4 rounded border border-border bg-background cursor-pointer group-hover:border-accent transition-colors"
                        aria-label={`Filter by ${option}`}
                      />
                      <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                        {option}
                      </span>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
