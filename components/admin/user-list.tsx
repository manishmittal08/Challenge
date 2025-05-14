"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock user data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "John Anderson",
    email: "john.anderson@example.com",
    address: "123 Main St, Anytown, USA",
    role: "user",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    role: "store_owner",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    address: "789 Pine Rd, Nowhere, USA",
    role: "admin",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    address: "321 Elm St, Anywhere, USA",
    role: "user",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    address: "654 Maple Dr, Everywhere, USA",
    role: "store_owner",
    rating: 3.8,
  },
]

export function UserList() {
  const { toast } = useToast()
  const [users, setUsers] = useState(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  } | null>(null)

  useEffect(() => {
    // In a real application, fetch users from your API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users")
        const data = await response.json()

        if (response.ok) {
          setUsers(data)
          setFilteredUsers(data)
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate API call with mock data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Uncomment to use real API
    // fetchUsers();
  }, [])

  const handleSearch = () => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setFilteredUsers(filtered)
  }

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredUsers(sortedUsers)
  }

  const handleDeleteUser = (userId: number) => {
    // In a real application, call your API to delete the user
    try {
      // await fetch(`/api/admin/users/${userId}`, {
      //   method: "DELETE",
      // });

      // Update local state
      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId))

      toast({
        title: "User deleted",
        description: "The user has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete user:", error)
      toast({
        title: "Delete failed",
        description: "There was an error deleting the user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "store_owner":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search by name, email, address, or role..."
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
                <Button variant="ghost" onClick={() => requestSort("role")}>
                  Role
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
                  Loading users...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.address}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role === "store_owner" ? "Store Owner" : user.role === "admin" ? "Admin" : "User"}
                    </Badge>
                    {user.role === "store_owner" && user.rating && (
                      <span className="ml-2 text-sm text-muted-foreground">Rating: {user.rating}</span>
                    )}
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
                            navigator.clipboard.writeText(user.email)
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
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete user
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
