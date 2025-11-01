"use client"

import { useState, useEffect } from "react"
import type { Character } from "../types/character"
import { fetchCharacters } from "../services/api"

export function useCharacters(page: number) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadCharacters()
  }, [page])

  const loadCharacters = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchCharacters(page)
      setCharacters(data.results)
      setTotalPages(Math.ceil(data.count / data.results.length))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch characters")
      setCharacters([])
    } finally {
      setLoading(false)
    }
  }

  return { characters, loading, error, totalPages, retry: loadCharacters }
}
