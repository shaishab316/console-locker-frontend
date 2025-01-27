"use server"

export interface Review {
  id: string
  text: string
  rating: number
  author: {
    name: string
    title: string
    image: string
  }
  createdAt: string
}

export interface ReviewsResponse {
  reviews: Review[]
  totalPages: number
  currentPage: number
}

const REVIEWS_PER_PAGE = 6

// Simulated database of reviews
const reviewsData: Review[] = Array.from({ length: 18 }, (_, i) => ({
  id: `review-${i + 1}`,
  text: "I bought a refurbished PlayStation 5, and it looks and works like new! The delivery was super fast, and the customer support team answered all my questions. Highly recommended!",
  rating: 4,
  author: {
    name: "Wade Warren",
    title: "President of Sales",
    image: "",
  },
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}))

export async function getReviews(page = 1): Promise<ReviewsResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (page - 1) * REVIEWS_PER_PAGE
  const endIndex = startIndex + REVIEWS_PER_PAGE
  const paginatedReviews = reviewsData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(reviewsData.length / REVIEWS_PER_PAGE)

  return {
    reviews: paginatedReviews,
    totalPages,
    currentPage: page,
  }
}

