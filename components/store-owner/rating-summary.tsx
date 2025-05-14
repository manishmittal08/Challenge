import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

interface RatingSummaryProps {
  storeData: {
    id: number
    name: string
    address: string
    averageRating: number
    totalRatings: number
    ratingDistribution: {
      5: number
      4: number
      3: number
      2: number
      1: number
    }
  }
}

export function RatingSummary({ storeData }: RatingSummaryProps) {
  const { averageRating, totalRatings, ratingDistribution } = storeData

  // Calculate percentages for each rating
  const getPercentage = (count: number) => {
    return totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating) ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Based on {totalRatings} {totalRatings === 1 ? "rating" : "ratings"}
          </div>
        </div>

        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center w-12">
                    <span>{rating}</span>
                    <Star className="h-4 w-4 ml-1" />
                  </div>
                  <Progress value={getPercentage(ratingDistribution[rating])} className="h-2 flex-1" />
                  <div className="w-12 text-right text-sm">{getPercentage(ratingDistribution[rating])}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalRatings}</div>
              <div className="text-sm text-muted-foreground">Total Ratings</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{ratingDistribution[5] + ratingDistribution[4]}</div>
              <div className="text-sm text-muted-foreground">Positive Ratings (4-5)</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {totalRatings > 0
                  ? Math.round(((ratingDistribution[5] + ratingDistribution[4]) / totalRatings) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
