import SearchBar from "./SearchBar"
import React from "react"
interface HeaderProps {
  onSearch: (query: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="bg-secondary border-b border-border py-6 px-4 md:py-8 sticky top-0 z-20 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Star Wars API</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 text-balance">
          Character Explorer
        </h1>
        <p className="text-muted-foreground text-sm md:text-base mb-4">
          Discover heroes, villains, and legends from across the galaxy
        </p>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  )
}
