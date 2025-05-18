"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import ReactConfetti from "react-confetti"
import { Heart, Share2, MessageSquare, Copy, Check } from "lucide-react"
import Button from "../components/ui/Button"
import axiosInstance from "../services/axiosInstance"
import { createComment, filterCommentsByPage, incrementPageViews } from "../services/pageService"
import DramaticBackground from "../components/backgrounds/dramatic-background"
import ProfessionalBackground from "../components/backgrounds/professional-background"
import HumorousBackground from "../components/backgrounds/humorous-background"
import GratefulBackground from "../components/backgrounds/grateful-background"
import CelebratoryBackground from "../components/backgrounds/celebratory-background"
import EmotionalBackground from "../components/backgrounds/emotional-background"
import PoeticBackground from "../components/backgrounds/poetic-background"
import ReflectiveBackground from "../components/backgrounds/reflective-background"

const ViewPage = () => {
  const { id } = useParams<{ id: string }>() // id is the page slug
  const [page, setPage] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [reaction, setReaction] = useState<string | null>(null)
  const [comment, setComment] = useState<string>("")
  const [linkCopied, setLinkCopied] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [comments, setComments] = useState<any[]>([])

  const renderBackground = () => {
    switch (page?.tone) {
      case "dramatic":
        return <DramaticBackground />
      case "professional":
        return <ProfessionalBackground />
      case "humorous":
        return <HumorousBackground />
      case "grateful":
        return <GratefulBackground />
      case "celebratory":
        return <CelebratoryBackground />
      case "emotional":
        return <EmotionalBackground />
      case "poetic":
        return <PoeticBackground />
      case "reflective":
        return <ReflectiveBackground />
      default:
        return <DramaticBackground />
    }
  }

  // Fetch page data from API
  useEffect(() => {
    const fetchPage = async () => {
      if (!id) return

      setLoading(true)
      try {
        const res = await axiosInstance.get(`/pages/${id}/`)
        if (!res.data) {
          setPage(null)
        } else {
          const data = res.data
          setPage({
            id: data.id,
            slug: data.slug,
            title: data.title,
            message: data.message || "",
            tone: data.tone,
            template: data.template,
            primaryColor: data.primary_color || "#6D28D9",
            backgroundColor: data.background_color || "#f8f9fa",
            previewImage: data.preview_image || "",
            author: {
              id: data.user?.id,
              username: data.user?.username || "Anonymous",
              avatar:
                data.user?.avatar ||
                `https://ui-avatars.com/api/?name=${data.user?.username || "Anonymous"}&background=random`,
            },
            createdAt: data.created_at,
            reactions: {
              hearts: data.reactions_count ?? 0,
              likes: 0,
              claps: 0,
            },
            comments: [], // Will be filled separately
          })

          // Increment page views
          incrementPageViews(id).catch(console.error)
        }
      } catch (e) {
        console.error("Error fetching page:", e)
        setPage(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [id])

  const loadComments = async () => {
    if (!page?.id) return

    try {
      const comments = await filterCommentsByPage(page.id)
      setComments(Array.isArray(comments) ? comments : [])
    } catch (error) {
      console.error("Error loading comments:", error)
      setComments([])
    }
  }

  useEffect(() => {
    if (!page?.id) return
    loadComments()
  }, [page?.id])

  // Update window dimensions when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Stop confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Reset "copied" status after 2 seconds
  useEffect(() => {
    if (linkCopied) {
      const timer = setTimeout(() => {
        setLinkCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [linkCopied])

  // Handle reaction
  const handleReaction = (type: string) => {
    setReaction(type)
    // In a real app, send to API
  }

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim() || !page?.id) return

    try {
      const formData = new FormData()
      formData.append("page", page.id)
      formData.append("content", comment)

      await createComment(formData)
      setComment("")
      await loadComments()
    } catch (error) {
      console.error("Error creating comment:", error)
    }
  }

  // Handle copy link
  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setLinkCopied(true)
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ""

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return ""
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The farewell page you're looking for doesn't exist or has expired.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {renderBackground()}
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#6D28D9", "#EC4899", "#0D9488", "#F97316", "#10B981"]}
        />
      )}

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <img
              src={page.author.avatar || "/placeholder.svg"}
              alt={page.author.username}
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${page.author.username}&background=random`
              }}
            />
            <div>
              <p className="font-medium">{page.author.username}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(page.createdAt)}</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleCopyLink}
            icon={linkCopied ? <Check size={16} /> : <Copy size={16} />}
          >
            {linkCopied ? "Copied!" : "Copy Link"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800"
          style={{
            borderTop: `4px solid ${page.primaryColor}`,
          }}
        >
          {page.previewImage && (
            <div className="mb-6 flex justify-center">
              <img
                src={page.previewImage || "/placeholder.svg"}
                alt={page.title}
                className="max-h-80 rounded-lg object-contain shadow"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
              />
            </div>
          )}
          <h1
            className="mb-6 text-center text-4xl font-bold"
            style={{
              color: document.documentElement.classList.contains("dark") ? "#fff" : page.primaryColor,
            }}
          >
            {page.title}
          </h1>

          <div className="mb-8 whitespace-pre-line text-lg leading-relaxed">{page.message}</div>

          {/* Reactions */}
          <div className="mb-8 flex justify-center space-x-4">
            <button
              onClick={() => handleReaction("heart")}
              className={`flex items-center space-x-1 rounded-full px-4 py-2 transition-colors ${
                reaction === "heart"
                  ? "bg-accent-100 text-accent-500 dark:bg-accent-900/30"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Heart className={reaction === "heart" ? "fill-accent-500 text-accent-500" : ""} size={20} />
              <span>{page.reactions.hearts}</span>
            </button>

            <button
              onClick={() => handleReaction("share")}
              className={`flex items-center space-x-1 rounded-full px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Comments section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >
          <h2 className="mb-4 flex items-center text-xl font-semibold">
            <MessageSquare className="mr-2" size={20} />
            Messages ({comments ? comments.length : 0})
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a message..."
              className="mb-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
              rows={3}
            ></textarea>
            <Button type="submit" variant="primary" disabled={!comment.trim()}>
              Post Message
            </Button>
          </form>

          <div className="space-y-4">
            {comments &&
              comments.map((comment: any) => (
                <div key={comment.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center space-x-2">
                    <img
                      src={
                        comment.user?.avatar ||
                        `https://ui-avatars.com/api/?name=${comment.user?.username || "Anonymous"}&background=random`
                      }
                      alt={comment.user?.username || "Anonymous"}
                      className="h-8 w-8 rounded-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${comment.user?.username || "Anonymous"}&background=random`
                      }}
                    />
                    <span className="font-medium">{comment.user?.username || "Anonymous"}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(comment.created_at || "")}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}

            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-500">No messages yet. Be the first to leave a message!</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ViewPage
