import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SearchResult {
  id: string
  type: "course" | "tutor" | "category"
  title: string
  description?: string
  image?: string
  url: string
  metadata?: Record<string, any>
}

interface SearchState {
  query: string
  results: SearchResult[]
  recentSearches: string[]
  popularSearches: string[]
  isLoading: boolean
  isOpen: boolean

  // Actions
  setQuery: (query: string) => void
  search: (query: string) => Promise<void>
  clearResults: () => void
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

// Mock data for search results
const mockCourses = [
  {
    id: "1",
    type: "course" as const,
    title: "Advanced React Development",
    description: "Master React with hooks, context, and advanced patterns",
    image: "/placeholder.svg?height=60&width=60",
    url: "/courses/advanced-react",
    metadata: { instructor: "John Doe", price: 99, rating: 4.8 },
  },
  {
    id: "2",
    type: "course" as const,
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis and machine learning",
    image: "/placeholder.svg?height=60&width=60",
    url: "/courses/python-data-science",
    metadata: { instructor: "Jane Smith", price: 129, rating: 4.9 },
  },
  {
    id: "3",
    type: "tutor" as const,
    title: "Dr. Sarah Johnson",
    description: "AI & Machine Learning Expert",
    image: "/placeholder.svg?height=60&width=60",
    url: "/tutors/sarah-johnson",
    metadata: { rating: 4.9, students: 1250, courses: 8 },
  },
]

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: "",
      results: [],
      recentSearches: [],
      popularSearches: [
        "React",
        "Python",
        "Machine Learning",
        "Web Development",
        "Data Science",
        "JavaScript",
        "AI",
        "Node.js",
      ],
      isLoading: false,
      isOpen: false,

      setQuery: (query: string) => {
        set({ query })
      },

      search: async (query: string) => {
        if (!query.trim()) {
          set({ results: [] })
          return
        }

        set({ isLoading: true, query })

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 300))

          // Filter mock data based on query
          const filteredResults = mockCourses.filter(
            (item) =>
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.description?.toLowerCase().includes(query.toLowerCase()),
          )

          set({
            results: filteredResults,
            isLoading: false,
          })

          // Add to recent searches if not empty
          if (query.trim()) {
            get().addRecentSearch(query.trim())
          }
        } catch (error) {
          set({
            results: [],
            isLoading: false,
          })
        }
      },

      clearResults: () => {
        set({
          results: [],
          query: "",
        })
      },

      addRecentSearch: (query: string) => {
        const { recentSearches } = get()
        const newRecentSearches = [query, ...recentSearches.filter((search) => search !== query)].slice(0, 10) // Keep only last 10 searches

        set({ recentSearches: newRecentSearches })
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] })
      },

      openSearch: () => {
        set({ isOpen: true })
      },

      closeSearch: () => {
        set({
          isOpen: false,
          query: "",
          results: [],
        })
      },

      toggleSearch: () => {
        const { isOpen } = get()
        if (isOpen) {
          get().closeSearch()
        } else {
          get().openSearch()
        }
      },
    }),
    {
      name: "search-storage",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
    },
  ),
)
