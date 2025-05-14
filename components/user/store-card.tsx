"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StoreCardProps {
  store: {
    id: number
    name: string
    address: string
    overallRating: number
    userRating: number | null
  }
  onRatingSubmit: (rating: number) => void
}

export function StoreCard({ store, onRatingSubmit }: StoreCardProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleRatingSubmit = async (rating: number) => {
    setIsSubmitting(true)

    try {
      // In a real application, call your API to submit the rating
      const response = await fetch(`/api/stores/${store.id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to submit rating")
      }

      onRatingSubmit(rating)

      toast({
        title: "Rating submitted",
        description: "Your rating has been successfully submitted.",
      })
    } catch (error) {
      console.error("Rating submission error:", error)
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "There was an error submitting your rating",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{store.name}</CardTitle>
        <CardDescription>{store.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-1 mb-4">
          <span className="font-medium">Overall Rating:</span>
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="ml-1">{store.overallRating.toFixed(1)}</span>
          </div>
        </div>

        {store.userRating !== null && (
          <div className="flex items-center space-x-1 mb-4">
            <span className="font-medium">Your Rating:</span>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="ml-1">{store.userRating}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-sm font-medium">
            {store.userRating === null ? "Submit your rating:" : "Update your rating:"}
          </div>
          <div className="flex space-x-1" onMouseLeave={() => setHoveredRating(0)}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                disabled={isSubmitting}
                className="focus:outline-none"
                onClick={() => handleRatingSubmit(rating)}
                onMouseEnter={() => setHoveredRating(rating)}
              >
                <Star
                  className={`h-8 w-8 ${
                    hoveredRating >= rating || (!hoveredRating && store.userRating >= rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  } transition-colors`}
                />
                <span className="sr-only">{rating} stars</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" disabled={isSubmitting}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
