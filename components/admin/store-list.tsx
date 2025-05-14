"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown, Search, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock store data for demonstration
const mockStores = [
  {
    id: 1,
    name: "Sunshine Grocery Market",
    email: "info@sunshinemarket.com",
    address: "123 Main Street, Cityville, State 12345",
    rating: 4.2,
  },
  {
    id: 2,
    name: "Tech Haven Electronics",
    email: "support@techhaven.com",
    address: "456 Tech Boulevard, Innovation City, State 67890",
    rating: 3.8,
  },
  {
    id: 3,
    name: "Fresh Farms Produce",
    email: "contact@freshfarms.com",
    address: "789 Harvest Road, Farmington, State 54321",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Bookworm's Paradise",
    email: "books@bookworm.com",
    address: "321 Reader's Lane, Literary Town, State 13579",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Fashion Forward Boutique",
    email: "style@fashionforward.com",
    address: "654 Style Avenue, Trendy City, State 97531",
    rating: 3.9,
  },
]

export function StoreList() {
  const { toast } = useToast()
  const [stores, setStores] = useState(mockStores)
  const [filteredStores, setFilteredStores] = useState(mockStores)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  } | null>(null)

  useEffect(() => {
    // In a real application, fetch stores from your API
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/admin/stores")
        const data = await response.json()

        if (response.ok) {
          setStores(data)
          setFilteredStores(data)
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
    const filtered = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setFilteredStores(filtered)
  }

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedStores = [...filteredStores].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredStores(sortedStores)
  }

  const handleDeleteStore = (storeId: number) => {
    // In a real application, call your API to delete the store
    try {
      // await fetch(`/api/admin/stores/${storeId}`, {
      //   method: "DELETE",
      // });

      // Update local state
      const updatedStores = stores.filter((store) => store.id !== storeId)
      setStores(updatedStores)
      setFilteredStores(filteredStores.filter((store) => store.id !== storeId))

      toast({
        title: "Store deleted",
        description: "The store has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete store:", error)
      toast({
        title: "Delete failed",
        description: "There was an error deleting the store. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search by name, email, or address..."
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
              <TableHead className="w-[250px]">
                <Button variant="ghost" onClick={() => requestSort("name")}>
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("email")}>
                  Email
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("rating")}>
                  Rating
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading stores...
                </TableCell>
              </TableRow>
            ) : filteredStores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No stores found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{store.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span>{store.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(store.email)
                            toast({
                              title: "Email copied",
                              description: "The email address has been copied to the clipboard.",
                            })
                          }}
                        >
                          Copy email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit store</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteStore(store.id)}
                        >
                          Delete store
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
