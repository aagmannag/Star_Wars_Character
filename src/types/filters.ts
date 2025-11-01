export interface FilterOptions {
    homeworlds: string[]
    species: string[]
    films: string[]
  }
  
  export interface ActiveFilters {
    homeworld: string | null
    species: string | null
    film: string | null
  }
  