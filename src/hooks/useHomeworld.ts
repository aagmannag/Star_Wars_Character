"use client"

import { useState, useEffect } from "react"
import type { Homeworld } from "../types/homeworld"
import { fetchHomeworld } from "../services/api"

export function useHomeworld(url: string) {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadHomeworld()
  }, [url])

  const loadHomeworld = async () => {
    try {
      setLoading(true)
      const data = await fetchHomeworld(url)
      setHomeworld(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch homeworld")
    } finally {
      setLoading(false)
    }
  }

  return { homeworld, loading, error }
}
