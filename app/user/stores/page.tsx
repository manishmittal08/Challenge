"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { StoreCard } from "@/components/user/store-card"
import { Search } from "lucide-react"

// Mock store data for demonstration
const mockStores = [
  {
    id: 1,
    name: "Sunshine Grocery Market",
    address: "123 Main Street, Cityville, State 12345",
    overallRating: 4.2,
    userRating: 4,
  },
  {
    id: 2,
    name: "Tech Haven Electronics",
    address: "456 Tech Boulevard, Innovation City, State 67890",
    overallRating: 3.8,
    userRating: null,
  },
  {
    id: 3,
    name: "Fresh Farms Produce",
    address: "789 Harvest Road, Farmington, State 54321",
    overallRating: 4.5,
    userRating: 5,
  },
  {
    id: 4,
    name: "Bookworm's Paradise",
    address: "321 Reader's Lane, Literary Town, State 13579",
    overallRating: 4.7,
    userRating: null,
  },
  {
    id: 5,
    name: "Fashion Forward Boutique",
    address: "654 Style Avenue, Trendy City, State 97531",
    overallRating: 3.9,
    userRating: 3,
  },
]

export default function UserStoresPage() {
  const [stores, setStores] = useState(mockStores)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, fetch stores from your API
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/stores")
        const data = await response.json()

        if (response.ok) {
          setStores(data)
        }
      } catch (error) {
        console.error("Failed to fetch stores:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate API call with mock data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Uncomment to use real API
    // fetchStores();
  }, [])

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setStores(mockStores)
      return
    }

    const filteredStores = mockStores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setStores(filteredStores)
  }

  const handleRatingSubmit = (storeId: number, rating: number) => {
    // In a real application, send this to your API
    setStores(stores.map((store) => (store.id === storeId ? { ...store, userRating: rating } : store)))
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Browse Stores" text="View and rate stores registered on the platform" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Stores</CardTitle>
          <CardDescription>Find stores by name or address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-[200px] animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 w-3/4 bg-muted rounded mb-4"></div>
                <div className="h-3 w-full bg-muted rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-muted rounded mb-4"></div>
                <div className="h-8 w-full bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {stores.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No stores found</h3>
              <p className="text-muted-foreground">Try a different search term</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onRatingSubmit={(rating) => handleRatingSubmit(store.id, rating)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </DashboardShell>
  )
}
