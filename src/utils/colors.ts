export function getSpeciesColor(species: string[]): string {
  if (!species || species.length === 0) {
    return "from-[#d16014] to-[#a84b0f]"
  }

  const speciesMap: Record<string, string> = {
    human: "from-[#d16014] to-[#a84b0f]",
    droid: "from-[#e87722] to-[#d16014]",
    wookiee: "from-[#1a1a1a] to-[#333333]", // replaced black/dark variations
    rodian: "from-[#a84b0f] to-[#d16014]",
    ewok: "from-[#d16014] to-[#8b5a0a]",
  }

  const speciesName = species[0]?.toLowerCase() || "default"
  return speciesMap[speciesName] || "from-[#d16014] to-[#a84b0f]"
}
