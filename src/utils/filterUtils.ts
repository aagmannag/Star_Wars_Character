import type { Character } from "../types/character"
import type { ActiveFilters } from "../types/filters"

export function applyFiltersAndSearch(
  characters: Character[],
  searchQuery: string,
  filters: ActiveFilters,
): Character[] {
  if (!characters || characters.length === 0) {
    return []
  }

  const normalizedQuery = searchQuery.toLowerCase().trim()

  return characters.filter((character) => {
    // Search filter with partial matching
    if (normalizedQuery) {
      if (!character.name.toLowerCase().includes(normalizedQuery)) {
        return false
      }
    }

    // Homeworld filter
    if (filters.homeworld) {
      if (character.homeworld !== filters.homeworld) {
        return false
      }
    }

    // Species filter with multiple species support
    if (filters.species) {
      if (!character.species.includes(filters.species)) {
        return false
      }
    }

    // Film filter with multiple films support
    if (filters.film) {
      if (!character.films.includes(filters.film)) {
        return false
      }
    }

    return true
  })
}

export function extractFilterOptions(characters: Character[]) {
  if (!characters || characters.length === 0) {
    return {
      homeworlds: [],
      species: [],
      films: [],
    }
  }

  const homeworlds = new Set<string>()
  const species = new Set<string>()
  const films = new Set<string>()

  characters.forEach((character) => {
    if (character.homeworld) homeworlds.add(character.homeworld)
    character.species.forEach((s) => species.add(s))
    character.films.forEach((f) => films.add(f))
  })

  return {
    homeworlds: Array.from(homeworlds).sort(),
    species: Array.from(species).sort(),
    films: Array.from(films).sort(),
  }
}
