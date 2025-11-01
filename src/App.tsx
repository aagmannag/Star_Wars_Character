"use client"

import React from "react"
import { Suspense, useState } from "react"
import { useAuth } from "./context/AuthContext"
import CharacterList from "./components/CharacterList"
import Header from "./components/Header"
import LoadingState from "./components/LoadingState"
import LoginPage from "./pages/LoginPage"
import type { ActiveFilters } from "./types/filters"

export default function App() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<ActiveFilters>({
    homeworld: null,
    species: null,
    film: null,
  })

  if (authLoading) {
    return <LoadingState />
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  const handleClearFilters = () => {
    setFilters({
      homeworld: null,
      species: null,
      film: null,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      <Suspense fallback={<LoadingState />}>
        <CharacterList
          searchQuery={searchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </Suspense>
    </div>
  )
}
