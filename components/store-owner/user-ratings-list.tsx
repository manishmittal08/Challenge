"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, Search, ArrowUpDown } from "lucide-react"

interface UserRating {
  id: number
  userName: string
  userEmail: string
  rating: number
  date: string
}

interface UserRatingsListProps {
  ratings: UserRating[]
}

export function UserRatingsList({ ratings: initialRatings }: UserRatingsListProps) {
  const [ratings, setRatings] = useState(initialRatings)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  } | null>(null)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setRatings(initialRatings)
      return
    }

    const filtered = initialRatings.filter(
      (rating) =>
        rating.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.userEmail.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setRatings(filtered)
  }

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedRatings = [...ratings].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setRatings(sortedRatings)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search by user name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("userName")}>
                  User Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button variant="ghost" onClick={() => requestSort("userEmail")}>
                  Email
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("rating")}>
                  Rating
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => requestSort("date")}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No ratings found.
                </TableCell>
              </TableRow>
            ) : (
              ratings.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell className="font-medium">{rating.userName}</TableCell>
                  <TableCell className="hidden md:table-cell">{rating.userEmail}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span>{rating.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{formatDate(rating.date)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
