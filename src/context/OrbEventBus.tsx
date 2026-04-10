import { create } from 'zustand'

interface OrbStore {
  activeSection: string | null
  hoveredOrb: string | null
  setActiveSection: (section: string | null) => void
  setHoveredOrb: (orb: string | null) => void
}

export const useOrbStore = create<OrbStore>((set) => ({
  activeSection: null,
  hoveredOrb: null,
  setActiveSection: (section) => set({ activeSection: section }),
  setHoveredOrb: (orb) => set({ hoveredOrb: orb }),
}))
