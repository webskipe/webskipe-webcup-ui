"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, Clock, Search } from "lucide-react"
import { fetchUserPages } from "../services/pageService"
import type { UserPage } from "../types/userPage"

const toneFilters = [
  { value: "", label: "All Tones" },
  { value: "grateful", label: "Grateful" },
  { value: "nostalgic", label: "Nostalgic" },
  { value: "celebratory", label: "Celebratory" },
  { value: "humorous", label: "Humorous" },
  { value: "emotional", label: "Emotional" },
  { value: "professional", label: "Professional" },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [pages, setPages] = useState<UserPage[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return ""
    }
  }

  useEffect(() => {
    const loadPages = async () => {
      try {
        const data = await fetchUserPages()
        console.log("Pages received:", data.results)
        setPages(Array.isArray(data.results) ? data.results : [])
      } catch (error) {
        console.error("Failed to fetch pages:", error)
        setPages([])
      } finally {
        setLoading(false)
      }
    }
    loadPages()
  }, [])

  // Handle image error
  const handleImageError = (pageId: string) => {
    setImageErrors((prev) => ({ ...prev, [pageId]: true }))
  }

  // Filter pages based on search query and tone
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      searchQuery === "" ||
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    // If you have tone in UserPage, otherwise remove this filter
    const matchesTone = selectedTone === "" || (page as any).tone === selectedTone

    // Only show published and public pages
    const isVisible = page.status === "published" && page.privacy === "public"

    return matchesSearch && matchesTone && isVisible
  })

  // Sort pages based on sort option
  const sortedPages = [...filteredPages].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "popular":
        return b.views - a.views
      default:
        return 0
    }
  })

  if (loading)
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <p className="text-xl">Loading pages...</p>
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Farewell Gallery</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Explore how others have said their goodbyes and get inspired for your own farewell page.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 flex flex-col space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farewell pages..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {toneFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gallery grid */}
      {sortedPages.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={`/view/${page.slug}`}
                className="group block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* Fallback image if original fails */}
                  {imageErrors[page.id] ? (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Image not available</span>
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <img
                        src={
                          page.previewImage ||
                          `https://ui-avatars.com/api/?name=${page.title}&size=384&background=random`
                        }
                        alt={page.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => handleImageError(page.id)}
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="mb-1 text-lg font-semibold text-white">{page.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">{page.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye size={16} className="mr-1" />
                        {page.views}
                      </span>
                      {/* If you have tone, display it here */}
                      {(page as any).tone && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
                          {(page as any).tone}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {formatDate(page.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium">No results found</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
