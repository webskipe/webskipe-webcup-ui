import axiosInstance from "./axiosInstance"
import type { UserPage } from "../types/userPage"

type UserPagesResponse = {
  count: number
  next: string | null
  previous: string | null
  results: UserPage[]
}

export const fetchUserPages = async (filters = {}): Promise<UserPagesResponse> => {
  try {
    const response = await axiosInstance.get("/pages/", {
      params: filters,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching user pages:", error)
    return { count: 0, next: null, previous: null, results: [] }
  }
}

export const deletePage = async (slug: string) => {
  try {
    const response = await axiosInstance.delete(`/pages/${slug}/`)
    return response.data
  } catch (error) {
    console.error("Error deleting page:", error)
    throw error
  }
}

export const incrementPageViews = async (slug: string) => {
  try {
    const response = await axiosInstance.post(`/pages/${slug}/increment_view/`)
    return response.data
  } catch (error) {
    console.error("Error incrementing page views:", error)
    return null
  }
}

export const fetchOnePage = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/pages/${slug}/`)
    return response.data
  } catch (error) {
    console.error("Error fetching page:", error)
    throw error
  }
}

export const filterCommentsByPage = async (pageId: string) => {
  try {
    const response = await axiosInstance.get(`/comments/byPage/${pageId}`)
    return response.data
  } catch (error) {
    console.error("Error filtering comments by page:", error)
    return []
  }
}

export const createComment = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/comments/", formData)
    return response.data
  } catch (error) {
    console.error("Error creating comment:", error)
    throw error
  }
}

export const createPage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/pages/", formData)
    return response.data
  } catch (error) {
    console.error("Error creating page:", error)
    throw error
  }
}

export const postComment = async (pageId: string | number, content: string) => {
  try {
    const response = await axiosInstance.post("/comments/", {
      page: pageId,
      content,
    })
    return response.data
  } catch (error) {
    console.error("Error posting comment:", error)
    throw error
  }
}
