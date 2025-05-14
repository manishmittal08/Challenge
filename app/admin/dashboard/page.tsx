"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserList } from "@/components/admin/user-list"
import { StoreList } from "@/components/admin/store-list"
import { AddUserForm } from "@/components/admin/add-user-form"
import { AddStoreForm } from "@/components/admin/add-store-form"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardStats } from "@/components/admin/dashboard-stats"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  })

  useEffect(() => {
    // In a real application, fetch stats from your API
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()

        if (response.ok) {
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      }
    }

    // For demo purposes, set mock data
    setStats({
      totalUsers: 156,
      totalStores: 42,
      totalRatings: 837,
    })

    // Uncomment to use real API
    // fetchStats();
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin Dashboard" text="Manage users, stores, and view platform statistics" />

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardStats stats={stats} />
      </div>

      <Tabs defaultValue="users" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="add-user">Add User</TabsTrigger>
          <TabsTrigger value="add-store">Add Store</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users registered on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <UserList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Management</CardTitle>
              <CardDescription>View and manage all stores registered on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <StoreList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-user" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>Create a new user account with specified role</CardDescription>
            </CardHeader>
            <CardContent>
              <AddUserForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Store</CardTitle>
              <CardDescription>Register a new store on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AddStoreForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
