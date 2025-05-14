"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UserRatingsList } from "@/components/store-owner/user-ratings-list"
import { RatingSummary } from "@/components/store-owner/rating-summary"
import { UpdatePasswordForm } from "@/components/update-password-form"

// Mock data for demonstration
const mockStoreData = {
  id: 1,
  name: "Tech Haven Electronics",
  address: "456 Tech Boulevard, Innovation City, State 67890",
  averageRating: 3.8,
  totalRatings: 45,
  ratingDistribution: {
    5: 15,
    4: 18,
    3: 7,
    2: 3,
    1: 2,
  },
}

const mockUserRatings = [
  {
    id: 1,
    userName: "John Anderson",
    userEmail: "john.anderson@example.com",
    rating: 5,
    date: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    userEmail: "sarah.j@example.com",
    rating: 4,
    date: "2023-05-10T14:45:00Z",
  },
  {
    id: 3,
    userName: "Michael Brown",
    userEmail: "m.brown@example.com",
    rating: 3,
    date: "2023-05-05T09:15:00Z",
  },
  {
    id: 4,
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    rating: 5,
    date: "2023-04-28T16:20:00Z",
  },
  {
    id: 5,
    userName: "Robert Wilson",
    userEmail: "r.wilson@example.com",
    rating: 2,
    date: "2023-04-22T11:10:00Z",
  },
]

export default function StoreOwnerDashboardPage() {
  const [storeData, setStoreData] = useState(mockStoreData)
  const [userRatings, setUserRatings] = useState(mockUserRatings)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, fetch store data and ratings from your API
    const fetchStoreData = async () => {
      try {
        const storeResponse = await fetch("/api/store-owner/store")
        const ratingsResponse = await fetch("/api/store-owner/ratings")

        if (storeResponse.ok && ratingsResponse.ok) {
          const storeData = await storeResponse.json()
          const ratingsData = await ratingsResponse.json()

          setStoreData(storeData)
          setUserRatings(ratingsData)
        }
      } catch (error) {
        console.error("Failed to fetch store owner data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate API call with mock data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Uncomment to use real API
    // fetchStoreData();
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`${storeData.name} Dashboard`}
        text="View your store's ratings and manage your account"
      />

      <Tabs defaultValue="summary" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Rating Summary</TabsTrigger>
          <TabsTrigger value="users">User Ratings</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Rating Summary</CardTitle>
              <CardDescription>Overview of your store's performance and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-40 bg-muted rounded"></div>
                </div>
              ) : (
                <RatingSummary storeData={storeData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Ratings</CardTitle>
              <CardDescription>View all users who have rated your store</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-muted rounded"></div>
                  ))}
                </div>
              ) : (
                <UserRatingsList ratings={userRatings} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Update Password</CardTitle>
              <CardDescription>Change your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <UpdatePasswordForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
