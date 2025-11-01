import type { CharactersResponse } from "../types/character"
import type { Homeworld } from "../types/homeworld"

const SWAPI_BASE_URL = "https://swapi.dev/api"

export async function fetchCharacters(page: number): Promise<CharactersResponse> {
  const response = await fetch(`${SWAPI_BASE_URL}/people/?page=${page}`)

  if (!response.ok) {
    throw new Error("Failed to fetch characters from SWAPI")
  }

  return response.json()
}

export async function fetchHomeworld(url: string): Promise<Homeworld> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch homeworld information")
  }

  return response.json()
}

export function getRandomCharacterImage(characterId: string): string {
  return `https://picsum.photos/300/200?random=${characterId}`
}

export function getCharacterDetailImage(characterId: string): string {
  return `https://picsum.photos/300/400?random=${characterId}`
}
